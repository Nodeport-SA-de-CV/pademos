import React from "react";
import PropTypes from 'prop-types';
import API from "../../lib/api/API";

//components
import GroupTitle from "./GroupTitle";

class GroupList extends React.Component {

    constructor(props) {
        super(props);
        this.state       = {
            data: [],
            selectedItems: []
        }
        this.loadData    = this.loadData.bind(this);
        this.onItemClick = this.onItemClick.bind(this);

    }

    componentDidMount() {
        this.loadData();
        window.addEventListener('perspectivesChanged', (ev) => {
            const groups = ev.detail;

            // unselect all
            this.props.onSelectedItems([])
            this.setState({selectedItems: []})
            // select matching items
            // groups.forEach((group) =>{
            let _groups = groups.map((group) => {
                return this.state.data.find((g) => {
                    return g.name === group
                })
            })

            this.props.onSelectedItems(_groups)
            this.setState({selectedItems: _groups})
        })
    }

    loadData() {
        API.getContributions().then((res) => {
            if (res.success) {
                const data = res.topics.sort((g, g1) => g1.contributions.length - g.contributions.length);
                this.setState({data});
                this.props.onLoadedGroups(data);
            }
        })
    }

    render() {
        const data = this.state.data;
        return (
            <div className={'group-list'}>
                {data.map(group => {
                    return (
                        <GroupTitle
                            group={group}
                            key={group._id}
                            onClick={(group) => this.onItemClick(group)}
                            isSelected={this.isSelected(group)}
                        />
                    )
                })}
            </div>
        )
    }

    isSelected(group) {
        let selectedItems = this.state.selectedItems;
        const found       = selectedItems.find((g) => {
            return g.name === group.name
        });

        return found;
    }

    onItemClick(group) {
        let selectedItems = this.state.selectedItems;
        const found       = selectedItems.find((g) => {
            return g.name === group.name
        });

        if (found) {
            selectedItems = selectedItems.filter((g) => g.name !== group.name);
        } else {
            selectedItems.push(group)
        }
        this.setState({
            selectedItems: selectedItems
        })
        this.props.onSelectedItems(selectedItems);

    }
}

GroupList.propTypes = {
    onLoadedGroups: PropTypes.func,
    onSelectedItems: PropTypes.func,

};

GroupList.defaultProps = {
    onLoadedGroups: () => {
    },
    onSelectedItems: () => {

    }

};
export default GroupList;

