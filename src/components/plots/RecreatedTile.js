import React from "react";
import PropTypes from "prop-types";
import NPIf from "np-if";
import API from "../../lib/api/API";
import UISelector from "./ui/UISelector";

class RecreatedTile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            spaceKeywords: 0,

        }
        this.onClickShowDetails = this.onClickShowDetails.bind(this);
    }

    componentDidMount() {
        const spaceKeywords = Math.floor(this.rtContent.clientHeight / 18);
        this.setState({spaceKeywords});
    }
    
    onClickShowDetails(){
        const contribution = this.props.contribution;
        contribution.color = this.props.color;
        contribution.isSelected = this.props.isSelected;
        this.props.onClickContributionDetails(contribution);
    }

    renderKeywords(){
        const keywords = this.props.contribution.document_title_keywords ? this.props.contribution.document_title_keywords : [];
        const spaceKeywords = this.state.spaceKeywords;
        if(spaceKeywords <= 0 ){
            return [];
        }

        return spaceKeywords < keywords.length ? keywords.slice(spaceKeywords) : keywords;
    }


    render(){
        let showConnections = false;
        if(this.props.selectedTopic){
            const contributionIds = this.props.selectedTopic.contributions.map((c) => c._id);
            if(contributionIds.includes(this.props.contribution._id)){
                showConnections = true;
            }
        }
        const styleTile = {
            width:this.props.width,
            height:this.props.height,
            left: this.props.left,
            top:this.props.top,
            backgroundColor: this.props.contribution.isDisabled ? 'gray' : this.props.color,
            border: showConnections ? `4px solid ${this.props.selectedTopic.color}` : ''
        }
        const icons = this.props.contribution.icons ? this.props.contribution.icons : [];
        const renderKeywords = this.renderKeywords();

        return (
            <div className={'recreated-tile'} style={styleTile}>
                <div className={'rt-header'}>
                    <UISelector isSelected={this.props.isSelected}
                                onClick={(isSelected) => this.props.onContributionSelected(this.props.contribution)} />
                    <div className={'rt-title'}>{this.props.contribution.document_title_response}</div>
                </div>

                <div className={'rt-content'} ref={ (rtContent) => { this.rtContent = rtContent } }>
                    <div className={'rt-keywords'}>
                        {
                            renderKeywords.map((keyword,index) => {
                                return(
                                    <div key={index}>{keyword}</div>
                                )
                            })
                        }
                    </div>
                    <div className={'rt-description'}>
                        {this.props.contribution.document_what_response}
                    </div>
                    <div className={'rt-show-all-btn'}
                         onClick={(c) => this.onClickShowDetails()}>... alles anzeigen
                    </div>
                </div>

                <div className={'rt-footer'}>
                    {
                        icons.map((i,index) =>{
                            return(
                                <img key={index} className={'rt-icon'} src={`${API.API_URL}/icons/${i}`} />
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}
RecreatedTile.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    left: PropTypes.number,
    top: PropTypes.number,
    contribution: PropTypes.object,
    isSelected: PropTypes.bool,
    onClickContributionDetails: PropTypes.func,
    onContributionSelected: PropTypes.func,
    selectedTopic: PropTypes.object
};

RecreatedTile.defaultProps = {
    width: 0,
    height: 0,
    left: 0,
    top: 0,
    contribution:{},
    isSelected: false,
    onClickContributionDetails: () => {},
    onContributionSelected: () => {},
    selectedTopic: {},


};
export default RecreatedTile;


