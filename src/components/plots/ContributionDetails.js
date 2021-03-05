import React from "react";
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Icon1 from '../../img/icon1.png';
import Icon2 from '../../img/icon2.png';
import UISelector from "./ui/UISelector";
import NPIf from "np-if";
import UIQuestion from "./ui/UIQuestion";


class ContributionDetails extends React.Component {
    renderDocumentType(type){
        let typeLabel = '';
        switch (type){
            case '1':
                typeLabel = 'Frage';
                break;
            case '2':
                typeLabel = 'Problem';
                break;
            case '3':
                typeLabel = 'Zukunftsvision';
                break;
            default:
                typeLabel = '';
        }
        return typeLabel;
    }

    renderQuestion1(type){
        let question = '';
        switch (type){
            case '1':
                question = 'Frage an Wissenschaftler: innen';
                break;
            case '2':
                question = 'Ein Problem das in der Nutzung KI auftreten könnte';
                break;
            case '3':
                question = 'Bewertung der zukünftigen Folgen der Nutzung von KI';
                break;
            default:
                question = '';
        }
        return question;
    }

    renderQuestion2(type){
        let question = '';
        switch (type){
            case '1':
                question = 'Wichtigkeit der Frage';
                break;
            case '2':
                question = 'Wichtigkeit des Problems';
                break;
            case '3':
                question = 'Zukunftsnutzung von KI beschreiben';
                break;
            default:
                question = '';
        }
        return question;
    }

    renderQuestion3(type){
        let question = '';
        switch (type){
            case '1':
                question = 'Gesellschaftsgruppen für die die Frage wichtig sein könnte';
                break;
            case '2':
                question = 'Gesellschaftsgruppen für die das Problem existiert';
                break;
            case '3':
                question = 'Gesellschaftsgruppen für die Zukunftsnutzung positiv/negativ sein kann';
                break;
            default:
                question = '';
        }
        return question;
    }

    renderQuestion4(type){
        let question = '';
        switch (type){
            case '1':
                question = 'Gesellschaftliche Folgen der Frage';
                break;
            case '2':
                question = 'Gesellschaftliche Folgen des Problems (falls ungelöst)';
                break;
            case '3':
                question = 'Gesellschaftliche Folgen der Zukunftsnutzung';
                break;
            default:
                question = '';
        }
        return question;
    }

    render() {
        const bgColor = this.props.contribution.color ? this.props.contribution.color : '#1A87D7';
        const keywords = this.props.contribution.document_keywords ? this.props.contribution.document_keywords : [];
        const type = this.props.contribution.document_type ? this.props.contribution.document_type : '1';


        let showConnections = false;
        // if(this.props.topic){
        //     const contributionIds = this.props.topic.contributions.map((c) => c._id);
        //     if(contributionIds.includes(this.props.contribution._id)){
        //         showConnections = true;
        //     }
        // }
        return (
            <div className={'contribution-details'}
                 style={{backgroundColor: bgColor}}>
                <div className={'contribution-details-header'}>
                    <NPIf condition={true}>
                        <UISelector isSelected={this.props.isSelected}
                                    onClick={(isSelected) => this.props.onContributionSelected(this.props.contribution)}/>
                    </NPIf>
                    <div className={'cd-wrapper-title mr-auto'}>
                        <div className={'cd-title'}><b>{this.props.contribution.document_title}</b></div>
                        <div>Beitragsart: {this.renderDocumentType(type)}</div>
                    </div>
                    <FontAwesomeIcon className={'cd-close-btn'}
                                     icon={'times'}
                                     onClick={() => this.props.onClickClose()}/>
                </div>
                <div className={'cd-content'}>
                    <div className={'cd-keywords'}>
                        {keywords.map((keyword,index) => {
                            return <div key={index}>{keyword}</div>
                        })}
                    </div>
                    <UIQuestion question={this.renderQuestion1(type)}
                                answer={'text of the answer'}
                                className={'mb-4'}/>
                    <UIQuestion question={this.renderQuestion2(type)}
                                answer={'text of the answer'}
                                className={'mb-4'}/>
                    <UIQuestion question={this.renderQuestion3(type)}
                                answer={'text of the answer'}
                                className={'mb-4'}/>
                    <UIQuestion question={this.renderQuestion4(type)}
                                answer={'text of the answer'}/>
                </div>
                <div className={'cd-footer'}>
                    <span className={'mr-auto'}>Wissenschaftsthemen zu denen der Beitrag zugeordnet wurde:</span>
                    <img className={'c-icon'} src={Icon1}/>
                    <img className={'c-icon'} src={Icon2}/>
                </div>
            </div>
        )
    }
}

ContributionDetails.propTypes = {
    contribution: PropTypes.object,
    onContributionSelected: PropTypes.func,
    isSelected: PropTypes.bool,
    onClickClose: PropTypes.func,
};

ContributionDetails.defaultProps = {
    contribution: {},
    onContributionSelected : () => {},
    isSelected: false,
    onClickClose: () => {}
};
export default ContributionDetails;
