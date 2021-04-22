import React from 'react';
import PropTypes from 'prop-types';
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Topic from "./Topic";
import NPIf from "np-if";
import NPElse from "np-if/src/NPElse";
import ConnectionForm from "./ConnectionForm";
import TopicDetails from "./TopicDetails";
import API from "../lib/api/API";


class Sidebar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            showTopicDetails:false,
            topicSelected:{
                id:'',
                title:'',
                icon: '',
                color:''
            },
            topics:[]

        }
        this.onClickHelp        = this.onClickHelp.bind(this);
        this.showTopicDetails   = this.showTopicDetails.bind(this);
        this.hideTopicDetails   = this.hideTopicDetails.bind(this);

    }
    componentDidMount() {
        this.loadTopics();
    }

    onClickHelp(){
        console.log('help clicked');
    }

    showTopicDetails(topic){
        this.setState({showTopicDetails:true,topicSelected:topic});
        this.props.onTopicSelected(topic);
    }

    hideTopicDetails(){
        this.setState({
            showTopicDetails:false,
            topicSelected:{
                id:'',
                title:'',
                icon: '',
                color:''
            }
        });
        this.props.onHideGroup([]);
        this.props.onTopicSelected(null);
    }
    loadTopics(){
        API.getTopics().then((topics) =>{
            this.setState({
                topics:topics.topics
            })
        })
    }

    onFormSaved(){
        this.props.setOpenConnectionForm(false);
        this.loadTopics();
        this.props.onFormSaved();
    }

    onChange(e){
        const value = e.target.value;
        if(value !== ''){
            window.open(value,"_blank");
        }
    }

    render(){
        return(
            <NPIf condition={!this.props.showConnectionForm}>
                <div className={'sidebar'}>
                    <h4>Forschungsthemen</h4>
                    <div style={{visibility:'hidden'}} className={'btn btn-tiny txt-right'}>Was können Sie hier tun? <FontAwesomeIcon icon={'caret-down'}/></div>
                    <div className={'sidebar-header'}>
                        <h2>{this.state.topics.length}</h2>
                        <div className={'sidebar-header-row'}>
                            <div>angelegte Verbindungen</div>
                            <div className={'sidebar-icon-link'}
                                 onClick={() => this.props.setOpenConnectionForm(true)}>
                                <FontAwesomeIcon icon={'link'}/>
                            </div>
                        </div>
                        <div className={'txt-right'}>Neue Verbindung zu einem Forschungsthema anlegen</div>
                    </div>

                    <NPIf condition={! this.state.showTopicDetails}>
                        {/*render sidebar content and form*/}
                        <div className={'sidebar-content'}>
                            {
                                this.state.topics.map((topic) =>{
                                    return(
                                        <Topic title={topic.topic}
                                               color={topic.color} icon={topic.icon}
                                               topic={topic}
                                               onClick={() => this.showTopicDetails(topic)}
                                               onHideGroup={(hg) => this.props.onHideGroup(hg)}>
                                        </Topic>
                                    )
                                })
                            }
                        </div>
                        <Form>
                            <Form.Check style={{visibility:'hidden'}}
                                        id="sidebar-checkbox"
                                        type="checkbox"
                                        label="Alle angelegten Verbindungen von Bürgerbeiträgen zu Forschungsthemen anzeigen" />
                        </Form>
                        <div className={'sidebar-journalist-section'}>
                            <label>Erlärungen der Journalist:innen</label>
                            <select style={{width:'100%'}} onChange={(e) => this.onChange(e)}>
                                <option value={''}> </option>
                                <option value={'https://tiny.url/123'}>Max Mustermanns Tour durch die Karte</option>
                                <option value={'https://tiny.url/456'}>Hans Herbert erklärt die Wissenskarte</option>
                            </select>
                        </div>
                        {/*/render topic details*/}
                        <NPElse>
                            <TopicDetails topic={this.state.topicSelected}
                                          onClickHide={() => this.hideTopicDetails()}/>
                        </NPElse>
                    </NPIf>
                </div>
                <NPElse>
                    <ConnectionForm  onFormSaved={() => this.onFormSaved()}
                                     onCancel={() => {
                                         this.props.onCancelForm();
                                         this.props.setOpenConnectionForm(false)
                                     }}
                                     selectedContributions={this.props.selectedContributions}
                                     topicsList={this.props.topicsList}
                                     perspectivesList={this.props.perspectivesList}
                                     onRemoveContribution={(c) => this.props.onRemoveContribution(c)}
                    />
                </NPElse>
            </NPIf>

        )
    }
}

export default Sidebar;

Sidebar.propTypes = {
    selectedContributions : PropTypes.array,
    onTopicSelected       : PropTypes.func,
    onFormSaved           : PropTypes.func,
    onRemoveContribution  : PropTypes.func,
    onHideGroup           : PropTypes.func,
    showConnectionForm    : PropTypes.bool,
    setOpenConnectionForm : PropTypes.func,
    onCancelForm          : PropTypes.func
};

Sidebar.defaultProps = {
    selectedContributions : [],
    onTopicSelected       : () => {},
    onFormSaved           : () => {},
    onRemoveContribution  : () => {},
    onHideGroup           : () => {},
    showConnectionForm    : false,
    setOpenConnectionForm : () => {},
    onCancelForm          : () => {}

};
