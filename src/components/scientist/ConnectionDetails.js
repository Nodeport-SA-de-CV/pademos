import React from "react";
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import UIQuestion from "./../plots/ui/UIQuestion";
import API from "../../lib/api/API";


class ConnectionDetails extends React.Component {

    render() {
        const bgColor = this.props.connection.color ? this.props.connection.color : '#1A87D7';
        const w = this.props.w !== 0 ? this.props.w : 'auto';
        const h = this.props.h !== 0 ? this.props.h : 'auto';

        return (
            <div className={`connection-details ${this.props.className}`}
                 style={{backgroundColor: bgColor, width:w, height:h}}>
                <div className={'contribution-details-header mt-2'}>
                    <img className={'cd-icon'} style={{alignSelf:'center'}} src={`${API.API_URL}/icons/${this.props.connection.icon}`} />

                    <div className={'cd-wrapper-title mr-auto'}>
                        <div className={'cd-title'}><b>Verbindung {this.props.index+1}</b></div>
                        <div className={'cd-subtitle'}><b>Zugehöriges Thema: {this.props.connection.topic}</b></div>
                        <div className={'cd-subtitle'}><b>Zugehörige Perspektive: {this.props.connection.perspective}</b></div>
                        {/*Verwandte Verbindung 1*/}
                        {/* name of topic*/}
                        {/* name of perspective*/}
                    </div>
                    <FontAwesomeIcon className={'cd-close-btn'}
                                     icon={'times'}
                                     onClick={() => this.props.onClickClose()}/>
                </div>
                <div className={'cd-content'}>
                    <UIQuestion question={'Erklärung der Verbindung des Beitrags zum Forschungsthema' }
                                answer={this.props.connection.connection_explanation}
                                cleanQuestion={false}
                                className={'answer-white mb-4'}/>
                    <UIQuestion question={'Links zu bestehenden Forschungsarbeiten zum Thema'}
                                answer={this.props.connection.links}
                                cleanQuestion={false}
                                className={'answer-white mb-4'}/>
                    <UIQuestion question={'Vorschläge für Fördermöglichkeiten'}
                                answer={this.props.connection.proposed_topics}
                                cleanQuestion={false}
                                className={'answer-white mb-4'}/>
                </div>
            </div>
        )
    }
}

ConnectionDetails.propTypes = {
    connection: PropTypes.object,
    onClickClose: PropTypes.func,
    index:        PropTypes.number,
    className: PropTypes.string,
    w: PropTypes.number,
    h: PropTypes.number

};

ConnectionDetails.defaultProps = {
    connection: {},
    onClickClose: () => {},
    index       : 0,
    className: '',
    w: 0,
    h: 0

};
export default ConnectionDetails;
