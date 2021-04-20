import React from "react";
import PropTypes from "prop-types";
import API from "../../lib/api/API";



class ContributionTile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.onClickShowDetails = this.onClickShowDetails.bind(this);
    }

    onClickShowDetails(contribution){
        contribution.isSelected = this.props.isSelected;
        this.props.onClickContributionDetails(contribution);
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

    render(){
        let showConnections = false;
        // if(this.props.selectedTopic){
        //     const conversationThreadIds = this.props.selectedTopic.contributions.map((c) => c.conversation_thread_id);
        //     if(conversationThreadIds.includes(this.props.contribution.conversation_thread_id)){
        //         showConnections = true;
        //     }
        // }
        const styleTile = {
            // backgroundColor: this.props.contribution.isDisabled ? 'gray' : this.props.contribution.color,
            backgroundColor: this.props.contribution.color,
            border: showConnections ? `5px solid ${this.props.selectedTopic.color}` : '',
            boxShadow: showConnections ? `0px 0px 4px 2px ${this.props.selectedTopic.color}ab` : '',
            // color: this.props.contribution.isDisabled ? 'rgb(66, 66, 66)' : '#01080D',
            color: '#01080D'
        }
        let contribution = this.props.contribution;

        const icons = this.props.contribution.icons ? this.props.contribution.icons : [];
        const type = this.props.contribution.document_type ? this.props.contribution.document_type : '1';

        return (
            <div className={`contribution-tile`}
                 style={styleTile}>
                {/*<div className={'rt-header'}>*/}
                    <div className={'ct-title'}>{contribution.document_title_response}</div>
                {/*</div>*/}

                {/*<div className={'rt-content'} ref={ (rtContent) => { this.rtContent = rtContent } }>*/}
                {/*    <div className={'rt-show-all-btn'}>{this.renderDocumentType(type)}</div>*/}

                {/*    <div className={'rt-title-content'}>{contribution.document_title_response}</div>*/}

                {/*    <div className={'rt-description'}>*/}
                {/*        {contribution.document_what_response}*/}
                {/*    </div>*/}
                {/*</div>*/}
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
ContributionTile.propTypes = {
    contribution: PropTypes.object,
    isSelected: PropTypes.bool,
    onClickContributionDetails: PropTypes.func,
    onContributionSelected: PropTypes.func,
};

ContributionTile.defaultProps = {
    contribution:{},
    isSelected: false,
    onClickContributionDetails: () => {},
    onContributionSelected: () => {},
};
export default ContributionTile;


