import React from 'react';
import {AuthContext} from "../lib/AuthContext";
import NPIf from "np-if";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import PlotView from "./plots/PlotView";
import GroupList from "../components/plots/GroupList";
import API from "../lib/api/API";
const _ = require('underscore');

class ScientistView extends React.Component {
    static contextType = AuthContext;

    constructor() {
        super();
        this.state = {
            isActionsDisabled: false,
            selectedContributions: [],
            selectedTopic: null,
            topics: [],
            contributionsCount: 0,
            keywords: [],
            searchKeyWord: '',
            searchBoxValue: ''
        }
        this.onKeyWordChange = this.onKeyWordChange.bind(this);
        this.onSearchBoxChange = this.onSearchBoxChange.bind(this);
        this.onTopicsLoaded = this.onTopicsLoaded.bind(this);
    }

    onSearchBoxChange(value) {
        this.setState({
            searchBoxValue: value
        })
        this.plotView.search(value);
    }

    onKeyWordChange(value) {
        this.setState({
            searchKeyWord: value
        }, () => {
            this.plotView.search(this.state.searchBoxValue)
        })
    }

    onDocumentTypeChange(documentType) {
        console.log(documentType)
        this.setState({
            searchDocumentType: documentType
        }, () => {
            this.plotView.search(this.state.searchBoxValue)
        })
    }

    onTopicSelected(topic) {
        this.setState({
            selectedTopic: topic
        })
    }

    onTopicsLoaded(topics) {

        let keywords = {};
        let ktopics = topics.map((t) => t.contributions.map((c) => c.document_keywords[0]));
        ktopics = [].concat.apply([], ktopics);
        ktopics.forEach((t) => {
            Object.keys(t).forEach((k) => {
                keywords[k] = keywords.hasOwnProperty(k) ? keywords[k] + parseInt(t[k]) : parseInt(t[k])
            })
        })
        let keywordsArray = Object.keys(keywords).map((k) => {
            return {[k]: keywords[k]}
        })
        keywordsArray = keywordsArray.sort((a, b) => {
            const _a = a[Object.keys(a)[0]];
            const _b = b[Object.keys(b)[0]];
            if (_a < _b) {
                return 1;
            } else if (_a > _b) {
                return -1;
            } else {
                return 0;
            }
        });
        keywordsArray = keywordsArray.map((k) => Object.keys(k)[0])

        this.setState({
            topics: topics,
            contributionsCount: topics.map((t) => t.contributions.length).reduce((a, v) => a + v, 0),
            keywords: keywordsArray
        })
        this.loadSideBarLists();
    }

    loadSideBarLists() {
        API.getTopics().then((r) => {
            if (r.success) {
                let topicsList = _.uniq(r.topics.map((t) => t.topic));
                let perspectivesList = _.uniq(r.topics.map((t) => t.perspective));
                this.setState({
                    topicsList: topicsList,
                    perspectivesList: perspectivesList
                })
            }
        })


    }

    onContributionSelected(contribution) {
        let newContributions = this.state.selectedContributions;

        if (newContributions.find((c) => c._id === contribution._id)) {
            newContributions = newContributions.filter((c) => c._id !== contribution._id);
        } else {
            newContributions.push(contribution)
        }
        this.setState({
            selectedContributions: newContributions
        });
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
                                    contributions={this.state.contributionsCount}
                                    subContributions={'definierte Verbindungen'}
                            />
                            <div className={'header-row align-items-start pt-3 pb-3'}>
                                Übersicht
                            </div>
                            {/*Get the legends of the treemap*/}
                            <GroupList/>
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
                        </div>
                        <Sidebar selectedContributions={this.state.selectedContributions}
                                 onFormSaved={() => this.onTopicSaved()}
                                 topicsList={this.state.topicsList}
                                 perspectivesList={this.state.perspectivesList}

                        />
                    </div>
                </div>
            </NPIf>
        )
    }

}

export default ScientistView;