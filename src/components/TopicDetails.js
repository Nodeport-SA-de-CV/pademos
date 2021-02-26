import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NPIf from "np-if";



class TopicDetails extends React.Component{
    render(){
        const topic = this.props.topic
        return(
            <div className={`topic-details ${this.props.color} ${this.props.className}`}>
                {topic.title}
                <NPIf condition={topic.icon !== ''}>
                    <FontAwesomeIcon className={`icon-${topic.color}`} icon={topic.icon}/>
                </NPIf>
            </div>
        )
    }
}

export default TopicDetails;

TopicDetails.propTypes = {
    className: PropTypes.string,
    onClickHide: PropTypes.func,
    topic:PropTypes.object
};

TopicDetails.defaultProps = {
    className: '',
    onClickHide: () => {},
    topic:{
        title: '',
        icon: '',
        color:'burgundy',
    }
};
