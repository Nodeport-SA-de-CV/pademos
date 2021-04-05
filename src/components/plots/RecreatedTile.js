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
        this.calcRtContentHeight = this.calcRtContentHeight.bind(this);
    }

    componentDidMount() {
        this.calcRtContentHeight();
    }
    
    onClickShowDetails(contribution){
        contribution.isSelected = this.props.isSelected;
        this.props.onClickContributionDetails(contribution);
    }

    calcRtContentHeight(){
        const spaceKeywords = Math.floor(this.rtContent.clientHeight / 28.8);
        this.setState({spaceKeywords});
    }

    renderKeywords(){
        const keywords = this.props.contribution.document_keywords ? Object.keys(this.props.contribution.document_keywords[0]) : [];
        const spaceKeywords = this.state.spaceKeywords;
        if(spaceKeywords <= 0 ){
            return [];
        }

        return  keywords.slice(0,3);
    }

    hoverPositionClass(width,height,left,top){
        const wTreeMap = Math.round(this.props.widthTreemap);
        const hTreeMap = Math.round(this.props.heightTreemap);
        if(left+width+4 === wTreeMap){
            return 'tile-right'
        }
        if(top+height === hTreeMap){
            return 'tile-bottom'
        }
        return '';
    }

    isPortrait(width,height){
        if(width < height){
            return 'portrait';
        }
        return '';
    }

    render(){
        let showConnections = false;
        if(this.props.selectedTopic){
            const conversationThreadIds = this.props.selectedTopic.contributions.map((c) => c.conversation_thread_id);
            if(conversationThreadIds.includes(this.props.contribution.conversation_thread_id)){
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
        let contribution = this.props.contribution;
            contribution.color = this.props.color;
        const icons = this.props.contribution.icons ? this.props.contribution.icons : [];
        const renderKeywords = this.renderKeywords();
        const hoverPositionClass = this.hoverPositionClass(this.props.width,this.props.height,this.props.left,this.props.top);
        const isPortrait = this.isPortrait(this.props.width,this.props.height);

        return (
            <div className={`recreated-tile ${hoverPositionClass} ${isPortrait}`} style={styleTile}>
                <div className={'rt-header'}>
                    <UISelector isSelected={this.props.isSelected}
                                onClick={(isSelected) => {
                                    this.calcRtContentHeight();
                                    this.props.onContributionSelected(contribution);
                                }} />
                    <div className={'rt-title'}>{contribution.document_title_response}</div>
                </div>

                <div className={'rt-content'} ref={ (rtContent) => { this.rtContent = rtContent } }>
                    {contribution.document_title_response}
                    {/*<div className={'rt-keywords'}>*/}
                    {/*    {*/}
                    {/*        renderKeywords.map((keyword,index) => {*/}
                    {/*            return(*/}
                    {/*                <div key={index}>{keyword}</div>*/}
                    {/*            )*/}
                    {/*        })*/}
                    {/*    }*/}
                    {/*</div>*/}
                    <div className={'rt-description'}>
                        {contribution.document_what_response}
                    </div>
                    <div className={'rt-show-all-btn'}
                         onClick={(c) => this.onClickShowDetails(contribution)}>... alles anzeigen
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
    selectedTopic: PropTypes.object,
    widthTreemap: PropTypes.number,
    heightTreemap: PropTypes.number,
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


