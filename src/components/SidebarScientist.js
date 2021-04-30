import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import GroupList from "./plots/GroupList";


class SidebarScientist extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            showTopicDetails:false,
            groups:[]

        }
        this.showTopicDetails   = this.showTopicDetails.bind(this);
    }

    onClickHelp(){
    }

    showTopicDetails(topic){
        this.setState({showTopicDetails:true,topicSelected:topic});
    }
    countContributions(){
        return this.state.groups.map((g) => g.contributions.length).reduce((a,b) =>  a+b, 0)
    }

    render(){
        return(
            <div className={'sidebar'}>
                <h4>Bürgerbeiträge</h4>
                <div style={{visibility:'hidden'}}
                     className={'btn btn-tiny txt-right'}>
                    Was können Sie hier tun? <FontAwesomeIcon icon={'caret-down'}/></div>
                <div className={'sidebar-header'}>
                    <h2>{this.countContributions()}</h2>
                    <div className={'sidebar-header-row'}>
                        <div>verbundene Bürgerbeiträge</div>
                    </div>
                </div>

                {/*render sidebar content and form*/}
                <div className={'sidebar-content'}>
                    <GroupList
                        onLoadedGroups={(d) => this.setState({groups: d})}
                        onSelectedItems={(selectedItems) => this.props.onSelectedItems(selectedItems)}/>
                </div>
                <div className={'sidebar-footer'}>
                    Klicken Sie auf eine Gruppe, um zu sehen, in welchen wissenschaftlichen
                    Themen die Beiträge von Bürger:innen aus diesen Gruppen zu finden sind
                </div>
            </div>

        )
    }
}

export default SidebarScientist;

SidebarScientist.propTypes = {
    selectedContributions : PropTypes.array,
    onTopicSelected       : PropTypes.func,
    onFormSaved           : PropTypes.func,
    onRemoveContribution  : PropTypes.func,
    onHideGroup           : PropTypes.func,
    onSelectedItems       : PropTypes.func,

};

SidebarScientist.defaultProps = {
    selectedContributions : [],
    onTopicSelected       : () => {},
    onFormSaved           : () => {},
    onRemoveContribution  : () => {},
    onHideGroup           : () => {},
    onSelectedItems       : () => {}
};
