import React from 'react';
import PropTypes from 'prop-types';
import API from "../lib/api/API";

const _ = require('underscore');


class Topic extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        }
        this.onClickHelp = this.onClickHelp.bind(this);
        this.hideGroups  = this.hideGroups.bind(this);
    }

    onClickHelp(){
        console.log('help clicked');
    }

    hideGroups(contributions){
        let groups = contributions.map(c => c.topic_label);
        groups = _.uniq(groups);
        this.props.onHideGroup( groups );
        this.props.onClick()
    }

    render(){
        return(
            <div className={`topic ${this.props.className}`} style={{backgroundColor:this.props.color}}
                 onClick={() => {
                     this.hideGroups(this.props.topic.contributions)
                 }}>
                {this.props.title}
                <img src={`${API.API_URL}/icons/${this.props.icon}`} height={20}></img>
            </div>
        )
    }
}

export default Topic;

Topic.propTypes = {
    topic      : PropTypes.object,
    title      : PropTypes.string,
    icon       : PropTypes.string,
    color      : PropTypes.string,
    className  : PropTypes.string,
    onClick    : PropTypes.func,
    onHideGroup: PropTypes.func
};

Topic.defaultProps = {
    topic      : {},
    title      : '',
    icon       : '',
    color      : 'burgundy',
    className  : '',
    onClick    : () => {},
    onHideGroup: () => {}
};
