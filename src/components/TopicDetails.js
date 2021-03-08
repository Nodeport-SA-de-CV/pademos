import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NPIf from "np-if";



class TopicDetails extends React.Component{
    render(){
        const topic = this.props.topic
        return(
            <div className={`topic-details ${this.props.className}`} style={{backgroundColor:topic.color}}>
                <FontAwesomeIcon className={'tp-close-btn txt-right'} icon={'times'} onClick={() => this.props.onClickHide()}/>
                <div className={'tp-title'}>
                    <b>{topic.title}</b>
                    <NPIf condition={topic.icon !== ''}>
                        <FontAwesomeIcon className={`icon-${topic.color}`} icon={topic.icon}/>
                    </NPIf>
                </div>
                <div className={'mt-2 mb-2'}>Beispielverbindungen, die Wissenschaftler:innen angelegt haben</div>
                <div className={'perspective'}>
                    <div>Perspective 1 --> Connection 1</div>
                    <div className={'mt-1 mb-1'}>This relates to the research on AI in HCI .. </div>
                    <div className={'btn btn-tiny'} onClick={() => this.props.onClickShowAll()}>alles anzeigen</div>
                </div>
                <div className={'mt-auto'}>Sie können weitere Verbindungen in der Ansicht für Wissenschaftler*innen sehen oder hier eine neue Verbindung anlegen..</div>
            </div>
        )
    }
}

export default TopicDetails;

TopicDetails.propTypes = {
    className: PropTypes.string,
    onClickHide: PropTypes.func,
    topic:PropTypes.object,
    onClickShowAll: PropTypes.func,

};

TopicDetails.defaultProps = {
    className: '',
    onClickHide: () => {},
    topic:{
        title: '',
        icon: '',
        color:'burgundy',
    },
    onClickShowAll: () => {},

};
