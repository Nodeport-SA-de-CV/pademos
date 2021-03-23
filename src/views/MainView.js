import React from 'react';
import {AuthContext} from "../lib/AuthContext";
import NPIf from "np-if";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import PlotView from "./plots/PlotView";
import GroupList from "../components/plots/GroupList";


class MainView extends React.Component{
    static contextType = AuthContext;
    constructor() {
        super();
        this.state = {
            isActionsDisabled:false,
            selectedContributions: [],
            selectedTopic: null,
            topics: [],
            contributionsCount:0,
            keywords:[],
            searchKeyWord:'',
            searchBoxValue:''
        }
        this.onKeyWordChange   = this.onKeyWordChange.bind(this);
        this.onSearchBoxChange = this.onSearchBoxChange.bind(this);
        this.onTopicsLoaded    = this.onTopicsLoaded.bind(this);
    }
    onSearchBoxChange(value){
        this.setState({
            searchBoxValue:value
        })
        this.plotView.search(value);
    }
    onKeyWordChange(value){
        this.setState({
            searchKeyWord:value
        }, () =>{
            this.plotView.search(this.state.searchBoxValue)
        })
    }

    onDocumentTypeChange(documentType){
        console.log(documentType)
        this.setState({
            searchDocumentType:documentType
        }, () =>{
            this.plotView.search(this.state.searchBoxValue)
        })
    }
    onTopicSelected(topic){
        this.setState({
            selectedTopic:topic
        })
    }

    onTopicsLoaded(topics){
        this.setState({
            topics : topics,
            contributionsCount : topics.map((t) => t.contributions.length).reduce((a,v) => a+v,0),
            keywords: [].concat.apply([],topics.map((t) => t.contributions[0].topic_keywords))
        });
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

    render(){
        return(
            <NPIf condition={this.context.isLoggedIn}>
                <div className={'h-100'}>
                    <NavBar />
                    <div className={'wrapper-content'}>
                        <div className={'content'}>
                            <Header onSearchBoxChange={(value) => this.onSearchBoxChange(value)}
                                    onKeyWordChange={(keyword) => this.onKeyWordChange(keyword)}
                                    onDocumentTypeChange={(documentType) => this.onDocumentTypeChange(documentType)}
                                    keywords={this.state.keywords}
                                    contributions={this.state.contributionsCount}
                                    isActionsDisabled={this.state.isActionsDisabled}
                            />
                            {/*Get the legends of the treemap*/}
                            <GroupList />
                            <PlotView ref={(ref) => this.plotView = ref}
                                      selectedTopic={this.state.selectedTopic}
                                      onTopicsLoaded={(topics) => this.onTopicsLoaded(topics)}
                                      searchKeyWord={this.state.searchKeyWord}
                                      searchDocumentType={this.state.searchDocumentType}
                                      selectedContributions={this.state.selectedContributions}
                                      onContributionSelected={(contribution) =>{
                                          this.onContributionSelected(contribution)
                                      }}
                                      onShowContributionsDetails={(show) => this.setState({isActionsDisabled:show})}
                            />
                        </div>
                        <Sidebar selectedContributions={this.state.selectedContributions}
                                 onTopicSelected={(topic) =>{this.onTopicSelected(topic)}}
                                 onFormSaved={() => this.plotView.loadData()}
                        />
                    </div>
                </div>
            </NPIf>
        )
    }
}

export default MainView;
