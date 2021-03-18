import React from "react";
import PropTypes from "prop-types";
import NPIf from "np-if";
import API from "../../lib/api/API";
import UISelector from "./ui/UISelector";

class RecreatedTile extends React.Component {
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
        const keywords = this.props.contribution.document_keywords ? this.props.contribution.document_keywords : [];

        return (
            <div className={'recreated-tile'} style={styleTile}>
                <div className={'rt-header'}>
                    <UISelector isSelected={this.props.isSelected}
                                onClick={(isSelected) => this.props.onContributionSelected(this.props.contribution)} />
                    <div className={'rt-title'}>{this.props.contribution.document_title}</div>
                </div>

                <div className={'rt-content'}>
                    <div className={'rt-keywords'}>
                        {
                            keywords.map((keyword,index) => {
                                return(
                                    <div key={index}>{keyword}</div>
                                )
                            })
                        }
                    </div>
                    <div className={'rt-description'}>
                        {this.props.contribution.document_what}
                    </div>
                    <div className={'rt-show-all-btn'}
                         onClick={(c) => {}}>... alles anzeigen
                    </div>
                </div>

                <div className={'rt-footer'}>
                    {
                        this.props.contribution.icons.map((i,index) =>{
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
    selectedContributions: PropTypes.array,
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
    selectedContributions: [],
    onContributionSelected: () => {},
    selectedTopic: {},


};
export default RecreatedTile;


