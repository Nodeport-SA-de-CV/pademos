import React from 'react';
import {AuthContext} from "../lib/AuthContext";
import NPIf from "np-if";
import NPElse from "np-if/src/NPElse";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

class MainView extends React.Component{
    static contextType = AuthContext;

    render(){
        return(
            <NPIf condition={this.context.isLoggedIn}>
                <Header />
                <Sidebar />

            </NPIf>
        )
    }
}

export default MainView;
