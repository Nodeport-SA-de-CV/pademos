import React from "react";
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Icon1 from '../../img/icon1.png';
import Icon2 from '../../img/icon2.png';
import UISelector from "./ui/UISelector";
import NPIf from "np-if";
import API from "../../lib/api/API";

class Contribution extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isMouseOver: false,
        }
        this.onClickShowDetails = this.onClickShowDetails.bind(this);
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

    onClickShowDetails(){
        const contribution = this.props.contribution;
        contribution.color = this.props.bgColor;
        this.props.onClickContributionDetails(contribution);
    }


    render() {
        const bgColor = this.props.contribution.isDisabled ? 'gray' : this.props.bgColor;
        const keywords = this.props.contribution.document_keywords ? this.props.contribution.document_keywords : [];

        let showConnections = false;
        if(this.props.topic){
            const contributionIds = this.props.topic.contributions.map((c) => c._id);
            if(contributionIds.includes(this.props.contribution._id)){
                showConnections = true;
            }
        }

        return (
            <div className={`contribution ${this.props.index}`}
                 style={{
                     backgroundColor: showConnections ? `${bgColor}8a` : bgColor,
                     border: showConnections ? `4px solid ${this.props.topic.color}` : '',
                     boxShadow: showConnections ? `0px 0px 3px ${this.props.topic.color}` : '',
                     zIndex: showConnections ? 5 : ''
                 }}
                 ref={(ref) => this.contribution = ref}>

                <div className={this.state.isMouseOver ? 'c-header-row' : 'c-header-column'}>
                    <NPIf condition={this.state.isMouseOver || this.props.isSelected}>
                        <UISelector isSelected={this.props.isSelected}
                                    onClick={(isSelected) => this.props.onContributionSelected(this.props.contribution)} />
                    </NPIf>
                    <div className={'c-title'}>{this.props.contribution.document_title}</div>
                </div>

                <NPIf condition={this.state.isMouseOver}>
                    <div className={'c-content'}>
                        <div className={'c-description'}>
                            {this.props.contribution.document_what}
                        </div>
                        <div className={'c-show-all-btn'}
                             onClick={(c) => this.onClickShowDetails()}>... alles anzeigen
                        </div>
                        <div className={'c-keywords'}>
                            {
                                keywords.slice(0,3).map((keyword,index) => {
                                    return(
                                        <div key={index}>{keyword}</div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </NPIf>

                <div className={'c-wrapper-icons'}>
                    {/*<img className={'c-icon'} src={Icon1}/>*/}
                    {/*<img className={'c-icon'} src={Icon2}/>*/}
                    {
                        this.props.contribution.icons.map((i,index) =>{
                            return(
                                <img key={index} className={'c-icon'} src={`${API.API_URL}/icons/${i}`}></img>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

Contribution.propTypes = {
    contribution: PropTypes.object,
    bgColor: PropTypes.string,
    onContributionSelected: PropTypes.func,
    isSelected: PropTypes.bool,
    onClickContributionDetails: PropTypes.func
};

Contribution.defaultProps = {
    contribution: {},
    bgColor: '#1A87D7',
    onContributionSelected : () => {},
    isSelected: false,
    onClickContributionDetails: () => {}
};
export default Contribution;
