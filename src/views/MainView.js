import React from 'react';
import {AuthContext} from "../lib/AuthContext";
import NPIf from "np-if";
import NPElse from "np-if/src/NPElse";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import PlotView from "./plots/PlotView";
import PropTypes from "prop-types";

class MainView extends React.Component{
    static contextType = AuthContext;
    constructor() {
        super();
        this.state = {
            selectedContributions:[],
            selectedTopic:null,
            clickedContribution:{}
        }
    }
    onSearchBoxChange(value){
        this.plotView.search(value);
    }
    onTopicSelected(topic){
        this.setState({
            selectedTopic:topic
        })
    }

    render(){
        return(
            <NPIf condition={this.context.isLoggedIn}>
                <div className={'h-100'}>
                    <NavBar />
                    <div className={'wrapper-content'}>
                        <div className={'content'}>
                            <Header onSearchBoxChange={(value) => this.onSearchBoxChange(value)}/>
                            <PlotView ref={(ref) => this.plotView = ref}
                                      selectedTopic={this.state.selectedTopic}
                                      onContributionSelected={(contributions) =>{
                                          this.setState({
                                              selectedContributions:contributions
                                          })
                                      }}
                                      onClickContributionDetails={
                                          (contribution) => this.setState({clickedContribution:contribution})
                                      }
                        />
                        </div>
                        <Sidebar selectedContributions={this.state.selectedContributions}
                                 onTopicSelected={(topic) =>{this.onTopicSelected(topic)}}
                        />
                    </div>
                </div>
            </NPIf>
        )
    }
}

export default MainView;
