import React from 'react';
import {AuthContext} from "../lib/AuthContext";
import NPIf from "np-if";
import NavBar from "../components/NavBar";
import Header from "../components/Header";
import API from "../lib/api/API";
import SidebarScientist from "../components/SidebarScientist";
import Form from "react-bootstrap/Form";
import ScientistTreeMap from "./plots/scientist/ScientistTreeMap";
import Select from 'react-select'
import MapWrapper from "../components/scientist/MapWrapper";
import BreadCrumbs from "../components/scientist/BreadCrumbs";
import ContributionDetails from "../components/plots/ContributionDetails";
import NPElse from "np-if/src/NPElse";

const _ = require('underscore');

class ScientistView extends React.Component {
    static contextType = AuthContext;

    constructor() {
        super();
        this.state = {
            topics: [],
            groupsOptions: [],
            hiddenGroups: [],
            level: 'scientist', // scientist, theme, perspective,contribution, connection
            selectedIndex: -1,
            selectedTheme: {},
            perspectiveData:null,
            perspectiveTreeMap:null,
            contributionData:null,
            connections:[],
            showContributionDetails:false,
        }

        this.setGroupsOptions          = this.setGroupsOptions.bind(this);
        this.onSelectGroup             = this.onSelectGroup.bind(this);
        this.getValue                  = this.getValue.bind(this);
    }

    componentDidMount() {
        API.getTopics().then((topics) =>{
            this.setGroupsOptions(topics.topics);
            this.setState({
                topics:topics.topics
            });
        })
    }

    setGroupsOptions(topics){
        let options = topics.map(g => {
            return(
                {value:g.topic, label:g.topic}
            )
        });
        options.unshift({value:'Alle',label:'Alle'});
        this.setState({groupsOptions:options});
    }


    onSelectGroup(groups){
        let hiddenGroups = [];
        if(groups.length > 0){
            if(groups[groups.length - 1].value === 'Alle'){
                hiddenGroups = this.state.groupsOptions.filter(g => g.value !== 'Alle').map( g => g.value);
            }else{
                hiddenGroups = groups.map(g => g.value);
            }
        }
        this.setState({hiddenGroups})
    }

    getValue(groups){
        return groups.map(g => {
            return (
                {value:g, label:g}
            )
        });
    }

    onClickZoom(index){
        this.setState({
            level:'theme',
            selectedIndex:index,
            selectedTheme:this.state.topics[index]
        })
    }

    onClickClosed(){
        this.setState({
            level:'scientist',
            selectedIndex:-1
        })
    }

    onClickTile(tile){
        // const children = tile.tileData.children;
        // const contributions = tile.d.data.contributions;
        this.setState({
            level:'perspective',
            perspectiveData:tile.d.data,
            selectedTheme:{
                topic:tile.d.data.group
            },
            selectedPerspective:{
                name:tile.d.data.name
            }

        })
    }

    onClickContributionTile(tile){
        // const children = tile.tileData.children;
        // const contributions = tile.d.data.contributions;
        const contributionId = tile.d.data.data._id;

        API.findConnections(contributionId).then((r) =>{
            if(r.success){
                // debugger;
                this.setState({
                    connections:r.connections
                })
            }
        })
        this.setState({
            level:'contribution',
            contributionData:tile.d.data.data
            // selectedTheme:{
            //     topic:tile.d.data.group
            // },
            // selectedPerspective:{
            //     name:tile.d.data.name
            // }
        })
    }
    renderContent(){
        switch (this.state.level){
            case "scientist":
                return <ScientistTreeMap data={this.state.topics}
                                         hiddenGroups={this.state.hiddenGroups}
                                         level={this.state.level}
                                         onHideGroup={(h) => this.setState({hiddenGroups:h})}
                                         onClickZoom={(i) => this.onClickZoom(i)}
                                         onClickTile={(tile) => this.onClickTile(tile)}
                />
                break;
            case "theme":
                const topic = this.state.topics.length > 0 ? this.state.topics[this.state.selectedIndex] : {color:'transparent'};
                return (
                    <MapWrapper data={topic}  level={this.state.level} color={topic.color} onClickClose={(c) => this.onClickClosed()}>
                        <ScientistTreeMap
                            data={this.state.topics}
                            topicIndex={this.state.selectedIndex}
                            level={this.state.level}
                            onClickTile={(tile) => this.onClickTile(tile)}
                        />
                    </MapWrapper>
                )
                break;
            case "perspective":
                // const perspective = this.state.topics.length > 0 ? this.state.topics[this.state.selectedIndex] : {color:'transparent'};
                return (
                    <MapWrapper data={this.state.perspectiveData}  level={this.state.level} color={this.state.perspectiveData.data.color} onClickClose={(c) => this.onClickClosed()}>
                        <ScientistTreeMap
                            data={this.state.perspectiveData}
                            topicIndex={this.state.selectedIndex}
                            level={this.state.level}
                            onClickTile={(tile) => this.onClickContributionTile(tile)}
                        />
                    </MapWrapper>
                )
                break;
            case "contribution":
                // const contribution = this.state.topics.length > 0 ? this.state.topics[this.state.selectedIndex] : {color:'transparent'};
                // const perspective = this.state.topics[this.state.selectedIndex].children;
                return (
                    <NPIf condition={! this.state.showContributionDetails}>
                        <MapWrapper data={this.state.contributionData}  level={this.state.level} color={this.state.contributionData.color} onClickClose={(c) => this.onClickClosed()}>
                            <ScientistTreeMap
                                data={this.state.connections}
                                topicIndex={this.state.selectedIndex}
                                level={this.state.level}
                                onClickTile={(tile) => this.onClickContributionTile(tile)}
                            />
                        </MapWrapper>
                        <NPElse>
                            <div className={'h-100 d-flex'}>
                                <ContributionDetails contribution={this.state.contributionData}></ContributionDetails>
                            </div>
                        </NPElse>
                    </NPIf>
                )
                break;
            case "connection":
                return (
                    <MapWrapper>
                        <div>connection</div>
                    </MapWrapper>
                )
                break;
            default:
                return null;
        }
    }

    render() {
        const hiddenGroups = this.getValue(this.state.hiddenGroups);

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
                            <NPIf condition={this.state.level === 'scientist'}>
                            <div className={'header-row align-items-start pt-3 pb-3'}>
                                Übersicht
                                <div className={'header-select-wrapper ml-4'} style={{fontSize:'0.8rem'}}>
                                    <label>Geöffnete Themen mit zugeordneten Perspektiven:  </label>
                                    <Select className={'multi-select'}
                                            isMulti={true}
                                            options={this.state.groupsOptions}
                                            placeholder={'KEINE '}
                                            onChange={(e) => this.onSelectGroup(e)}
                                            value={hiddenGroups}
                                            theme={theme => ({
                                                ...theme,
                                                borderRadius:0,
                                                colors: {
                                                    ...theme.colors,
                                                    neutral0: '#f1f1f1',
                                                },
                                            })}
                                    />
                                </div>
                            </div>
                            </NPIf>
                            <div className={'d-flex mb-auto'}></div>
                            <BreadCrumbs level={this.state.level}
                                         onScientistClicked={() => this.setState({'level':'scientist'})}
                                         theme={this.state.selectedTheme} perspective={this.state.selectedPerspective}
                            > </BreadCrumbs>
                            {this.renderContent()}
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
