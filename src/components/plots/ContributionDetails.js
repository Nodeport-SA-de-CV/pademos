import React from "react";
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Icon1 from '../../img/icon1.png';
import Icon2 from '../../img/icon2.png';
import UISelector from "./ui/UISelector";
import NPIf from "np-if";

class ContributionDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isMouseOver: false,
        }
    }

    componentDidMount() {
        const _this = this;
        this.contribution.addEventListener('mouseover', function (ev) {
            _this.setState({isMouseOver: true})
        }, false)
        this.contribution.addEventListener('mouseleave', function (ev) {
            _this.setState({isMouseOver: false})
        }, false)
    }

    render() {
        const bgColor = this.props.contribution.isDisabled ? 'gray' : this.props.bgColor;
        let showConnections = false;
        if(this.props.topic){
            const contributionIds = this.props.topic.contributions.map((c) => c._id);
            console.log(contributionIds)
            if(contributionIds.includes(this.props.contribution._id)){
                showConnections = true;
            }
        }
        return (
            <div className={`contribution-details ${this.props.index}`}
                 style={{
                     backgroundColor: bgColor,
                     border: showConnections ? `4px solid ${this.props.topic.color}` : ''
                 }} ref={(ref) => this.contribution = ref}>
                <NPIf condition={this.state.isMouseOver || this.props.isSelected}>
                    <UISelector isSelected={this.props.isSelected}
                                onClick={(isSelected) => this.props.onContributionSelected(this.props.contribution)}/>
                </NPIf>
                <div className={'c-title mb-auto mt-auto'}>{this.props.contribution.document_what}</div>
                <div className={'c-wrapper-icons'}>
                    <img className={'c-icon'} src={Icon1}/>
                    <img className={'c-icon'} src={Icon2}/>

                </div>
            </div>
        )
    }
}

ContributionDetails.propTypes = {
    contribution: PropTypes.object,
    bgColor: PropTypes.string,
    onContributionSelected: PropTypes.func,
    isSelected: PropTypes.bool
};

ContributionDetails.defaultProps = {
    contribution: {},
    bgColor: '#1A87D7',
    onContributionSelected : () => {},
    isSelected: false
};
export default ContributionDetails;
