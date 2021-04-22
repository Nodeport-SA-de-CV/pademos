import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NPIf from "np-if";
import API from "../lib/api/API";


class TopicDetails extends React.Component{

    render(){
        const topic = this.props.topic;
        let t = {...topic};
        delete t.children;
        t = [t];

        const list = [...t,...topic.children]
        return(
            <div className={`topic-details ${this.props.className}`} style={{backgroundColor:topic.color}}>
                <FontAwesomeIcon className={'tp-close-btn txt-right'} icon={'times'} onClick={() => this.props.onClickHide()}/>
                <div className={'tp-title'}>
                    <b>{topic.topic}</b>
                    <NPIf condition={topic.icon !== ''}>
                        <img className={`tp-icon`} src={`${API.API_URL}/icons/${topic.icon}`}/>
                    </NPIf>
                </div>
                <div className={'mt-2 mb-2'}>Beispielverbindungen, die Wissenschaftler:innen angelegt haben</div>
                <div className={'perspective-wrapper mb-2'}>
                    {
                        list.map((perspective,index) =>{
                            return (
                                <div className={'perspective mb-2'} key={index}>
                                    <div>Verbindung { index + 1 }, Perspektive:<br/>{perspective.perspective}</div>
                                    <div className={'perspective-ex mt-2 mb-1'}>{perspective.connection_explanation}</div>
                                    <div className={'btn btn-tiny'}
                                         onClick={() => {
                                             // debugger;
                                             this.props.onSetConnectionDetails(topic)
                                         }}>alles anzeigen</div>
                                </div>
                            )
                        })
                    }
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
    onSetConnectionDetails: PropTypes.func
};

TopicDetails.defaultProps = {
    className: '',
    onClickHide: () => {},
    topic:{
        title: '',
        icon: '',
        color:'burgundy',
    },
    onSetConnectionDetails: () => {}
};
