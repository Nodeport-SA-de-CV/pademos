import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NPIf from "np-if";
import { withRouter } from "react-router-dom";
import API from "../lib/api/API";

const Swal = require('sweetalert2');

const CustomSwal = Swal.mixin({
    customClass: {
        popup: 'popup-custom',
        confirmButton: 'confirm-custom',
        cancelButton: 'cancel-custom',
        content:'title-custom',
        icon: 'icon-custom'
    },
});

class TopicDetails extends React.Component{
    constructor(props) {
        super(props);
        this.confirmSwal = this.confirmSwal.bind(this);
    }

    confirmSwal(){
        CustomSwal.fire({
            icon:'warning',
            iconHtml:'',
            text:'Hiermit verlassen Sie die Ansicht für Bürger:innen. Bitte bestätigen Sie.',
            showCancelButton: true,
            showConfirmButton:true,
            confirmButtonText: 'BESTÄTIGEN',
            cancelButtonText: 'ABBRECHEN',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                this.props.history.push('/scientist');
            }
        });
    }

    render(){
        const topic = this.props.topic;
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
                {
                    topic.children.map((perspective,index) =>{
                        return (
                            <div className={'perspective mb-2'} key={index}>
                                <div>{perspective.perspective} --> Connection { index + 1 }</div>
                                <div className={'mt-1 mb-1'}>{perspective.connection_explanation}</div>
                                <div className={'btn btn-tiny'} onClick={() => this.confirmSwal()}>alles anzeigen</div>
                            </div>
                        )
                    })
                }

                <div className={'mt-auto'}>Sie können weitere Verbindungen in der Ansicht für Wissenschaftler*innen sehen oder hier eine neue Verbindung anlegen..</div>
            </div>
        )
    }
}

export default withRouter (TopicDetails);

TopicDetails.propTypes = {
    className: PropTypes.string,
    onClickHide: PropTypes.func,
    topic:PropTypes.object,
};

TopicDetails.defaultProps = {
    className: '',
    onClickHide: () => {},
    topic:{
        title: '',
        icon: '',
        color:'burgundy',
    },
};
