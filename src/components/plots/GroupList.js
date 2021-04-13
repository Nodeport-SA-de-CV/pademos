import React from "react";
import PropTypes from 'prop-types';
import API from "../../lib/api/API";

//components
import GroupTitle from "./GroupTitle";

class GroupList extends React.Component {

    constructor(props) {
        super(props);
        this.state     = {
            data:[],
        }
        this.loadData       = this.loadData.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    loadData(){
        API.getContributions().then((res) => {
            if (res.success) {
                const data = res.topics.sort((g,g1) => g1.contributions.length - g.contributions.length);
                this.setState({data});
                this.props.onLoadedGroups(data);
            }
        })
    }

    render(){
        const data = this.state.data;
        return(
            <div className={'group-list'}>
                { data.map( group => {
                  return(
                      <GroupTitle group={group} key={group._id}/>
                  )
                })}
            </div>
        )
    }
}
GroupList.propTypes = {
    onLoadedGroups: PropTypes.func,
};

GroupList.defaultProps = {
    onLoadedGroups: () => {}

};
export default GroupList;

