import React from "react";
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import UISelector from "./ui/UISelector";
import NPIf from "np-if";
import UIQuestion from "./ui/UIQuestion";
import API from "../../lib/api/API";


class ContributionDetails extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedContributions: [],
        }
        this.onContributionSelected = this.onContributionSelected.bind(this)
    }

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

    //Todo: remove all the renderQuestions
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

    onContributionSelected(contribution) {
        contribution.isSelected = ! contribution.isSelected;

        this.props.onContributionSelected(contribution);
    }

    render() {
        const bgColor = this.props.contribution.color ? this.props.contribution.color : '#1A87D7';
        const keywords = this.props.contribution.document_keywords ? Object.keys(this.props.contribution.document_keywords[0]) : [];
        const type = this.props.contribution.document_type ? this.props.contribution.document_type : '1';
        const icons = this.props.contribution.iconsWithName ? this.props.contribution.iconsWithName : [];
        debugger;
        const maxWidth = this.props.scientistView ? this.props.w : this.props.w - 50;
        const maxHeight = this.props.scientistView ? this.props.h : this.props.h - 50;


        return (
            <div className={'contribution-details'}
                 style={{backgroundColor: bgColor,maxWidth:maxWidth,maxHeight:maxHeight}}>
                <div className={'contribution-details-header'}>
                    <NPIf condition={! this.props.scientistView}>
                        <UISelector isSelected={this.props.isSelected}
                                    onClick={(isSelected) => this.onContributionSelected(this.props.contribution)}/>
                    </NPIf>
                    <div className={'cd-wrapper-title mr-auto'}>
                        <div className={'cd-title'}><b>{this.props.contribution.document_title_response}</b></div>
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
                    <UIQuestion question={`${this.props.contribution.document_what_question}?`}
                                answer={this.props.contribution.document_what_response}
                                className={'mb-4'}/>
                    <UIQuestion question={`${this.props.contribution.document_why_question}?`}
                                answer={this.props.contribution.document_why_response}
                                className={'mb-4'}/>
                    <UIQuestion question={`${this.props.contribution.document_for_whom_question}?`}
                                answer={this.props.contribution.document_for_whom_response}
                                className={'mb-4'}/>
                    <UIQuestion question={`${this.props.contribution.document_effect_question}?`}
                                answer={this.props.contribution.document_effect_response}/>
                </div>
                <div className={'cd-footer-with-names'}>
                    <div className={'mr-auto'}>Wissenschaftsthemen zu denen der Beitrag zugeordnet wurde:</div>
                    {
                        icons.map((i,index) =>{
                            return(
                                <div className={'m-t-10'} >
                                    <img key={index} className={'c-icon'} src={`${API.API_URL}/icons/${i.icon}`}></img>
                                    <span>{i.name}</span>
                                </div>
                            )
                        })
                    }
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
    h: PropTypes.number,
    w: PropTypes.number,
    scientistView: PropTypes.bool
};

ContributionDetails.defaultProps = {
    contribution: {},
    onContributionSelected : () => {},
    isSelected: false,
    onClickClose: () => {},
    h: 550,
    w: 550,
    scientistView: false
};
export default ContributionDetails;
