import React from "react";
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import UIQuestion from "./../plots/ui/UIQuestion";
import API from "../../lib/api/API";


class ConnectionDetails extends React.Component {

    render() {
        const bgColor = this.props.connection.color ? this.props.connection.color : '#1A87D7';

        return (
            <div className={'connection-details'}
                 style={{backgroundColor: bgColor}}>
                <div className={'contribution-details-header mt-2'}>
                    <img className={'cd-icon'} src={`${API.API_URL}/icons/${this.props.connection.icon}`} />

                    <div className={'cd-wrapper-title mr-auto'}>
                        <div className={'cd-title'}><b>Verbindung {this.props.index+1}</b></div>
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
    index:        PropTypes.number
};

ConnectionDetails.defaultProps = {
    connection: {},
    onClickClose: () => {},
    index       : ''
};
export default ConnectionDetails;
