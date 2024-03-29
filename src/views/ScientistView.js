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
import ReactResizeDetector from "react-resize-detector";
import ConnectionDetails from "../components/scientist/ConnectionDetails";
import {withRouter} from "react-router-dom";
import OverlaySquares from "../components/plots/OverlaySquares";
import RecreatedScientistTreemap from "../components/scientist/RecreatedScientistTreemap";

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
            perspectiveData: null,
            perspectiveTreeMap: null,
            contributionData: null,
            connections: [],
            showContributionsDetails: false,
            w: null,
            h: null,
            connectionData: null,
            filterLinks:false,
            filterFinancing:false,
            perspectiveGroups:[]
        }

        this.setGroupsOptions = this.setGroupsOptions.bind(this);
        this.onSelectGroup    = this.onSelectGroup.bind(this);
        this.getValue         = this.getValue.bind(this);
    }

    componentDidMount() {
        const location = this.props.location;
        if (location.state) {
            if (location.state.topic) {
                const topic = location.state.topic;
                this.setState({
                    connectionData: topic,
                    level: 'connection'
                })
            }
        }
        API.getTopics().then((topics) => {
            this.setGroupsOptions(topics.topics);
            this.setState({
                topics: topics.topics
            });
        })
    }

    setGroupsOptions(topics) {
        let options = topics.map(g => {
            return (
                {value: g.topic, label: g.topic}
            )
        });
        options.unshift({value: 'Alle', label: 'Alle'});
        this.setState({groupsOptions: options});
    }


    onSelectGroup(groups) {
        let hiddenGroups = [];
        if (groups.length > 0) {
            if (groups[groups.length - 1].value === 'Alle') {
                hiddenGroups = this.state.groupsOptions.filter(g => g.value !== 'Alle').map(g => g.value);
            } else {
                hiddenGroups = groups.map(g => g.value);
            }
        }
        this.setState({hiddenGroups})
    }

    getValue(groups) {
        return groups.map(g => {
            return (
                {value: g, label: g}
            )
        });
    }

    onClickZoom(index) {
        this.setState({
            level: 'theme',
            selectedIndex: index,
            selectedTheme: this.state.topics[index]
        })
    }

    onClickClosed() {
        this.setState({
            level: 'scientist',
            selectedIndex: -1
        })
    }

    onClickTile(tile) {
        // Load Theme level as well
        const selectedIndex = this.state.topics.findIndex((t) => t.topic === tile.d.data.group);
        this.setState({
            selectedIndex: selectedIndex,
            selectedTheme: this.state.topics[selectedIndex]
        })

        const parentData = tile.d.parent.data;
        const pdata      = tile.d.data;
        //override icon and color
        pdata.data.icon  = parentData.data.icon;
        pdata.data.color = parentData.data.color;

        // get groups
        const groups = tile.tileData.contributions.map((c) => c.topic_label);
        // emit event
        const event  = new CustomEvent('perspectivesChanged', {detail: groups});
        window.dispatchEvent(event);
        this.setState({
            level: 'perspective',
            perspectiveData: pdata,
            selectedTheme: {
                topic: tile.d.data.group
            },
            selectedPerspective: {
                name: tile.d.data.name
            },
            perspectiveGroups:groups

        })
    }

    onClickContributionTile(tile, index) {
        const conversation_thread_id = tile.d.data.data.conversation_thread_id;
        // get groups
        const group = tile.d.data.group;
        // emit event
        const event  = new CustomEvent('perspectivesChanged', {detail: [group]});
        window.dispatchEvent(event);
        API.findConnections(conversation_thread_id).then((r) => {
            if (r.success) {
                let orderedConnections = r.connections.sort((a,b) =>{
                    if(a.topic.trim() === this.state.selectedTheme.topic.trim() && b.topic.trim() !== this.state.selectedTheme.topic.trim()){
                        return -1;
                    }
                    if(b.topic.trim() === this.state.selectedTheme.topic.trim() && a.topic.trim() !== this.state.selectedTheme.topic.trim()){
                        return 1;
                    }
                    return 0;
                })
                this.setState({
                    connections: orderedConnections

                })
            }
        })
        this.setState({
            level: 'contribution',
            contributionData: tile.d.data.data,
            contributionIndex: index + 1,
            contributionGroups:[group]
        })
    }

    onClickConnectionTile(tile, index) {
        // emit event
        const event  = new CustomEvent('perspectivesChanged', {detail: []});
        window.dispatchEvent(event);
        this.setState({
            level: 'connection',
            connectionData: tile.d.data.data,
            connectionIndex: index + 1

        })
    }

    renderContent() {
        switch (this.state.level) {
            case "scientist":
                return <ScientistTreeMap data={this.state.topics}
                                         hiddenGroups={this.state.hiddenGroups}
                                         level={this.state.level}
                                         onHideGroup={(h) => this.setState({hiddenGroups: h})}
                                         onClickZoom={(i) => this.onClickZoom(i)}
                                         onClickTile={(tile, index) => this.onClickTile(tile, index)}
                                         selectedGroups={this.state.selectedGroups}
                                         filterLinks={this.state.filterLinks}
                                         filterFinancing={this.state.filterFinancing}
                                         selectedTheme={this.state.selectedTheme}
                />
                break;
            case "theme":
                const topic = this.state.topics.length > 0 ? this.state.topics[this.state.selectedIndex] : {color: 'transparent'};
                return (
                    <MapWrapper data={topic} level={this.state.level} color={topic.color}
                                onClickClose={(c) => {
                                    this.setState({'level': 'scientist'})
                                    // emit event
                                    const event  = new CustomEvent('perspectivesChanged', {detail: []});
                                    window.dispatchEvent(event);
                                }}>
                        <ScientistTreeMap
                            data={this.state.topics}
                            topicIndex={this.state.selectedIndex}
                            level={this.state.level}
                            onClickTile={(tile) => this.onClickTile(tile)}
                            filterLinks={this.state.filterLinks}
                            filterFinancing={this.state.filterFinancing}
                            selectedTheme={this.state.selectedTheme}
                        />
                    </MapWrapper>
                )
                break;
            case "perspective":
                return (
                    <MapWrapper data={this.state.perspectiveData} level={this.state.level}
                                color={this.state.perspectiveData.data.color}
                                onClickClose={(c) => {
                                    const event  = new CustomEvent('perspectivesChanged', {detail: []});
                                    window.dispatchEvent(event);
                                    this.setState({'level': 'theme'})
                                }}>
                        <ScientistTreeMap
                            data={this.state.perspectiveData}
                            topicIndex={this.state.selectedIndex}
                            level={this.state.level}
                            onClickTile={(tile, index) => this.onClickContributionTile(tile, index)}
                            selectedTheme={this.state.selectedTheme}
                        />
                    </MapWrapper>
                )
                break;
            case "contribution":
                return (
                    <NPIf condition={!this.state.showContributionsDetails}>
                        <MapWrapper data={this.state.contributionData}
                                    level={this.state.level}
                                    color={this.state.contributionData.color}
                                    onClickClose={(c) => {
                                        const event  = new CustomEvent('perspectivesChanged', {detail: this.state.perspectiveGroups});
                                        window.dispatchEvent(event);
                                        this.setState({
                                            'level': 'perspective',
                                            connections:[]
                                        })
                                    }}
                                    onClickNavigation={() => {
                                        this.setState({showContributionsDetails: true})
                                    }}
                                    classNameHeaderTitle={'d-flex flex-column w-100'}
                        >
                            <ScientistTreeMap
                                data={this.state.connections}
                                topicIndex={this.state.selectedIndex}
                                level={this.state.level}
                                onClickTile={(tile, index) => this.onClickConnectionTile(tile, index)}
                                selectedTheme={this.state.selectedTheme}
                            />
                        </MapWrapper>
                        <NPElse>
                            <div className={'h-100 d-flex'}>
                                <ReactResizeDetector handleWidth handleHeight
                                                     onResize={(w, h) => this.setState({w: w, h: h})}>
                                </ReactResizeDetector>
                                <ContributionDetails contribution={this.state.contributionData}
                                                     h={this.state.h}
                                                     w={this.state.w}
                                                     scientistView={true}
                                                     onClickClose={() => this.setState({showContributionsDetails: false})}

                                />
                            </div>
                        </NPElse>
                    </NPIf>
                )
                break;
            case "connection":
                return (
                    <div className={'h-100 d-flex'}>
                        <ConnectionDetails connection={this.state.connectionData} index={this.state.connectionIndex - 1} onClickClose={() => {
                            const event  = new CustomEvent('perspectivesChanged', {detail: this.state.contributionGroups});
                            window.dispatchEvent(event);
                            if (this.state.contributionData) {
                                this.setState({level: 'contribution'})
                            } else {
                                this.setState({level: 'scientist'})
                            }
                        }}
                                           selectedTheme={this.state.selectedTheme}
                        />
                    </div>
                )
                break;
            default:
                return null;
        }
    }
    onScientistClicked(){
        this.setState({
            'level': 'scientist',
            connections:[]
        });
        // emit event
        const event  = new CustomEvent('perspectivesChanged', {detail: []});
        window.dispatchEvent(event);
    }
    getConnectionsLength(){
        const childLength = this.state.topics.map((t) => t.children.length).reduce((a,b) => a+b,0);
        const length = this.state.topics.length + childLength;
        return length;
    }
    render() {
        const hiddenGroups = this.getValue(this.state.hiddenGroups);

        return (
            <NPIf condition={this.context.isLoggedIn}>
                <div className={'h-100'}>
                    <NavBar pickerValue={'Wissenschaftler'}/>
                    <div className={'wrapper-content'}>
                        <div className={'content'}>
                            <Header title={'Forschungsthemen'}
                                    subtitle={''}
                                    showActions={false}
                                    contributions={this.getConnectionsLength()}
                                    subContributions={'angelegte Verbindungen'}
                            />
                            <NPIf condition={this.state.level === 'scientist'}>
                                <div className={'header-row align-items-start pt-3 pb-3'}>
                                    Übersicht
                                    <div className={'header-select-wrapper ml-4'} style={{fontSize: '0.8rem'}}>
                                        <label>Geöffnete Themen mit zugeordneten Perspektiven: </label>
                                        <Select className={'multi-select'}
                                                isMulti={true}
                                                options={this.state.groupsOptions}
                                                placeholder={'KEINE '}
                                                onChange={(e) => this.onSelectGroup(e)}
                                                value={hiddenGroups}
                                                theme={theme => ({
                                                    ...theme,
                                                    borderRadius: 0,
                                                    colors: {
                                                        ...theme.colors,
                                                        neutral0: '#f1f1f1',
                                                    },
                                                })}
                                        />
                                    </div>
                                </div>
                                <NPElse>
                                    <BreadCrumbs level={this.state.level}
                                                 onScientistClicked={() => this.onScientistClicked()}
                                                 onThemeClicked={() => {
                                                     const event  = new CustomEvent('perspectivesChanged', {detail: []});
                                                     window.dispatchEvent(event);
                                                     this.setState({
                                                         'level': 'theme',
                                                         connections:[]
                                                     })
                                                 }}
                                                 onPerspectiveClicked={() => {
                                                     // emit event
                                                     const event  = new CustomEvent('perspectivesChanged', {detail: this.state.perspectiveGroups});
                                                     window.dispatchEvent(event);
                                                     this.setState({
                                                         'level': 'perspective',
                                                         connections:[]
                                                     })}}
                                                 onContributionClicked={() => {
                                                     const event  = new CustomEvent('perspectivesChanged', {detail: this.state.contributionGroups});
                                                     window.dispatchEvent(event);
                                                     this.setState({'level': 'contribution'})
                                                 }}
                                                 contributionIndex={this.state.contributionIndex}
                                                 connectionIndex={this.state.connectionIndex}
                                                 theme={this.state.selectedTheme}
                                                 perspective={this.state.selectedPerspective}
                                    />
                                </NPElse>
                            </NPIf>


                            {this.renderContent()}

                            <div className={'header-row align-items-center pt-3 pb-3'} style={{fontSize: '0.8rem'}}>
                                <strong className={'mr-auto'}>Verbindungen markieren, die</strong>
                                <Form className={'mr-auto'}>
                                    <Form.Check
                                        id="links"
                                        type="checkbox"
                                        name={'filterLinks'}
                                        value={this.state.filterLinks}
                                        onChange={(ev) => this.onFilterChange(ev)}
                                        label="Forschungshinweise"/>
                                </Form>
                                <Form>
                                    <Form.Check
                                        id="financing"
                                        type="checkbox"
                                        name={'filterFinancing'}
                                        value={this.state.filterFinancing}
                                        onChange={(ev) => this.onFilterChange(ev)}
                                        label="Vorschläge für Förderschwerpunkte"/>
                                </Form>
                            </div>
                            <div className={'header-row align-items-start justify-content-end pt-3 pb-3'}
                                 style={{fontSize: '0.8rem'}}>
                                Um eine neue Verbindung anzulegen, wechseln Sie bitte in die Ansicht
                                "Bürger:innen".<br/>
                                Dort können Sie die zu verbindenden Beiträge auswählen und markieren.
                            </div>

                        </div>
                        <SidebarScientist onSelectedItems={(selectedItems) => {
                            this.setState({
                                selectedGroups: selectedItems
                            })
                        }}/>
                    </div>
                </div>
            </NPIf>
        )
    }

    onFilterChange(ev) {
        this.setState({
            [ev.target.name]:ev.target.checked
        })

    }
}

export default withRouter(ScientistView);
