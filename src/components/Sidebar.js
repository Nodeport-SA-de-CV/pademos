import React from 'react';
import PropTypes from 'prop-types';
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Topic from "./Topic";
import NPIf from "np-if";
import NPElse from "np-if/src/NPElse";
import ConnectionForm from "./ConnectionForm";
import TopicDetails from "./TopicDetails";

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
            }
        }
        this.onClickHelp        = this.onClickHelp.bind(this);
        this.showTopicDetails   = this.showTopicDetails.bind(this);
        this.hideTopicDetails   = this.hideTopicDetails.bind(this);

    }

    onClickHelp(){
        console.log('help clicked');
    }

    showTopicDetails(topic){
        this.setState({showTopicDetails:true,topicSelected:topic});
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
    }

    render(){
        return(
            <NPIf condition={!this.state.showConnectionForm}>
                <div className={'sidebar'}>
                    <h4>Forschungsthemen</h4>
                    <div className={'btn btn-tiny txt-right'}>Anweisungen <FontAwesomeIcon icon={'caret-down'}/></div>
                    <div className={'sidebar-header'}>
                        <h2>12</h2>
                        <div className={'sidebar-header-row'}>
                            <div>definierte Verbindungen</div>
                            <div className={'sidebar-icon-link'}
                                 onClick={() => this.setState({showConnectionForm:true})}>
                                <FontAwesomeIcon icon={'link'}/>
                            </div>
                        </div>
                        <div className={'txt-right'}>neue Verbindung zum Forschungsthema definieren</div>
                    </div>

                    <NPIf condition={! this.state.showTopicDetails}>
                        {/*render sidebar content and form*/}
                        <div className={'sidebar-content'}>
                            <Topic title={'Diversity ...'}
                                   color={'burgundy'}
                                   icon={'arrow-up'}
                                   onClick={() => this.showTopicDetails(topic)}/>
                            <Topic title={'Explainability of ...'} color={'military'} icon={'chalkboard'}/>
                            <Topic title={'Privacy ...'} color={'dark-gray'} icon={'lock'}/>
                            <Topic title={'Topic 4'} />
                            <Topic title={'Topic 5'} />
                            <Topic title={'Topic 6'} />
                            <Topic title={'Topic 7'} />
                        </div>
                        <Form>
                            <Form.Check id="sidebar-checkbox"
                                        type="checkbox"
                                        label="alle definierten Verbindungen von Beiträgen zu Forschungsthemen anzeigen" />
                        </Form>

                        {/*/render topic details*/}
                        <NPElse>
                            <TopicDetails topic={this.state.topicSelected} onClickHide={() => this.hideTopicDetails()}/>
                        </NPElse>
                    </NPIf>
                </div>
                <NPElse>
                    <ConnectionForm  onFormSaved={() => this.setState({showConnectionForm:false})}
                                     onCancel={() => this.setState({showConnectionForm:false})}/>
                </NPElse>
            </NPIf>

        )
    }
}

export default Sidebar;

Sidebar.propTypes = {

};

Sidebar.defaultProps = {

};
