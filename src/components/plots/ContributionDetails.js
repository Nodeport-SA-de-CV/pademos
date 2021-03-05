import React from "react";
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Icon1 from '../../img/icon1.png';
import Icon2 from '../../img/icon2.png';
import UISelector from "./ui/UISelector";
import NPIf from "np-if";


class ContributionDetails extends React.Component {
    renderDocumentType(type){
        let typeLabel = '';
        switch (type){
            case '1':
                typeLabel = 'Frage';
                break;
            case '2':
                typeLabel = 'Problem';
            case '3':
                typeLabel = 'Vision';
            default:
                typeLabel = '';
        }

        return typeLabel;
    }

    render() {
        const bgColor = this.props.contribution.color ? this.props.contribution.color : '#1A87D7';
        const keywords = this.props.contribution.document_keywords ? this.props.contribution.document_keywords : [];

        let showConnections = false;
        // if(this.props.topic){
        //     const contributionIds = this.props.topic.contributions.map((c) => c._id);
        //     console.log(contributionIds)
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
                        <div>Beitragsart: {this.renderDocumentType(this.props.contribution.document_type)}</div>
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
                    <div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
                <div className={'c-wrapper-icons'}>
                    Wissenschaftsthemen zu denen der Beitrag zugeordnet wurde:
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
