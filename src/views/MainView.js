import React from 'react';
import {AuthContext} from "../lib/AuthContext";
import NPIf from "np-if";
import NPElse from "np-if/src/NPElse";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import PlotView from "./plots/PlotView";

class MainView extends React.Component{
    static contextType = AuthContext;

    onSearchBoxChange(value){
        this.plotView.search(value);
    }
    render(){
        return(
            <NPIf condition={this.context.isLoggedIn}>
                <div className={'h-100'}>
                    <NavBar />
                    <div className={'wrapper-content'}>
                        <div className={'content'}>
                            <Header onSearchBoxChange={(value) => this.onSearchBoxChange(value)}/>
                            <PlotView ref={(ref) => this.plotView = ref}></PlotView>
                        </div>
                        <Sidebar />
                    </div>
                </div>
            </NPIf>
        )
    }
}

export default MainView;
