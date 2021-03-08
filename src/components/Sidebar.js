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

const topic = {id:'div',title:'Diversity',icon: 'arrow-up',color:'burgundy'};

class Sidebar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            showConnectionForm:false,
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
        this.props.onTopicSelected(null);
    }
    loadTopics(){
        API.getTopics().then((topics) =>{
            this.setState({
                topics:topics.topics
            })
        })
    }
    render(){
        return(
            <NPIf condition={!this.state.showConnectionForm}>
                <div className={'sidebar'}>
                    <h4>Forschungsthemen</h4>
                    <div className={'btn btn-tiny txt-right'}>Was können Sie hier tun? <FontAwesomeIcon icon={'caret-down'}/></div>
                    <div className={'sidebar-header'}>
                        <h2>{this.state.topics.length}</h2>
                        <div className={'sidebar-header-row'}>
                            <div>angelegte Verbindungen</div>
                            <div className={'sidebar-icon-link'}
                                 onClick={() => this.setState({showConnectionForm:true})}>
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
                                        <Topic title={topic.connection_explanation}
                                               color={topic.color} icon={topic.icon}
                                               topic={topic}
                                               onClick={() => this.showTopicDetails(topic)}>
                                        </Topic>
                                    )
                                })
                            }
                            {/*<Topic title={'Diversity ...'}*/}
                            {/*       color={'burgundy'}*/}
                            {/*       icon={'arrow-up'}*/}
                            {/*       onClick={() => this.showTopicDetails(topic)}/>*/}
                            {/*<Topic title={'Explainability of ...'} color={'military'} icon={'chalkboard'}/>*/}
                            {/*<Topic title={'Privacy ...'} color={'dark-gray'} icon={'lock'}/>*/}
                            {/*<Topic title={'Topic 4'} />*/}
                            {/*<Topic title={'Topic 5'} />*/}
                            {/*<Topic title={'Topic 6'} />*/}
                            {/*<Topic title={'Topic 7'} />*/}
                        </div>
                        <Form>
                            <Form.Check id="sidebar-checkbox"
                                        type="checkbox"
                                        label="Alle angelegten Verbindungen von Bürgerbeiträgen zu Forschungsthemen anzeigen" />
                        </Form>

                        {/*/render topic details*/}
                        <NPElse>
                            <TopicDetails topic={this.state.topicSelected} onClickHide={() => this.hideTopicDetails()}/>
                        </NPElse>
                    </NPIf>
                </div>
                <NPElse>
                    <ConnectionForm  onFormSaved={() => this.setState({showConnectionForm:false})}
                                     onCancel={() => this.setState({showConnectionForm:false})}
                                     selectedContributions={this.props.selectedContributions}
                    />
                </NPElse>
            </NPIf>

        )
    }
}

export default Sidebar;

Sidebar.propTypes = {
    selectedContributions : PropTypes.array,
    onTopicSelected       : PropTypes.func
};

Sidebar.defaultProps = {
    selectedContributions : [],
    onTopicSelected       : () => {}
};
