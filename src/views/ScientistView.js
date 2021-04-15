import React from 'react';
import {AuthContext} from "../lib/AuthContext";
import NPIf from "np-if";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import PlotView from "./plots/PlotView";
import GroupList from "../components/plots/GroupList";
import API from "../lib/api/API";
import SidebarScientist from "../components/SidebarScientist";
import Form from "react-bootstrap/Form";
import ScientistTreeMap from "./plots/scientist/ScientistTreeMap";
const _ = require('underscore');

class ScientistView extends React.Component {
    static contextType = AuthContext;

    constructor() {
        super();
        this.state = {
            topics: [

            ],
        }

    }

    componentDidMount() {
        API.getTopics().then((topics) =>{
            this.setState({
                topics:topics.topics
            })
        })
    }

    onChange(data){
        console.log(data);
    }

    render() {
        return (
            <NPIf condition={this.context.isLoggedIn}>
                <div className={'h-100'}>
                    <NavBar/>
                    <div className={'wrapper-content'}>
                        <div className={'content'}>
                            <Header title={'Forschungsthemen'}
                                    subtitle={''}
                                    showActions={false}
                                    contributions={this.state.topics.length}
                                    subContributions={'definierte Verbindungen'}
                            />
                            <div className={'header-row align-items-start pt-3 pb-3'}>
                                Übersicht
                                <div className={'header-select-wrapper ml-4'} style={{fontSize:'0.8rem'}}>
                                    <label>Geöffnete Themen mit zugeordneten Perspektiven:  </label>
                                    <select style={{height: '37.2px'}}
                                            onChange={(e) => this.onChange(e.target.value)}>
                                        <option value={''}>KEINE</option>
                                    </select>
                                </div>
                            </div>
                            <div className={'d-flex mb-auto'}></div>
                            <ScientistTreeMap data={this.state.topics}></ScientistTreeMap>
                            {/*<PlotView ref={(ref) => this.plotView = ref}*/}
                            {/*          selectedTopic={this.state.selectedTopic}*/}
                            {/*          onTopicsLoaded={(topics) => this.onTopicsLoaded(topics)}*/}
                            {/*          searchKeyWord={this.state.searchKeyWord}*/}
                            {/*          searchDocumentType={this.state.searchDocumentType}*/}
                            {/*          selectedContributions={this.state.selectedContributions}*/}
                            {/*          onContributionSelected={(contribution) => {*/}
                            {/*              this.onContributionSelected(contribution)*/}
                            {/*          }}*/}
                            {/*          onShowContributionsDetails={(show) => this.setState({isActionsDisabled: show})}*/}
                            {/*/>*/}

                            <div className={'header-row align-items-center pt-3 pb-3'} style={{fontSize:'0.8rem'}}>
                                <strong className={'mr-auto'}>Verbindungen markieren, die</strong>
                                <Form className={'mr-auto'} >
                                    <Form.Check
                                                id="links"
                                                type="checkbox"
                                                label="Links zu Forschungsressourcen" />
                                </Form>
                                <Form>
                                    <Form.Check
                                                id="financing"
                                                type="checkbox"
                                                label="Finanzierungsvorschläge enthalten" />
                                </Form>
                            </div>
                            <div className={'header-row align-items-start justify-content-end pt-3 pb-3'} style={{fontSize:'0.8rem'}}>
                                Um eine neue Verbindung anzulegen, wechseln Sie bitte in die Ansicht "Bürger:innen".<br/>
                                Dort können Sie die zu verbindenden Beiträge auswählen und markieren.
                            </div>

                        </div>
                        <SidebarScientist/>
                    </div>
                </div>
            </NPIf>
        )
    }

}

export default ScientistView;
