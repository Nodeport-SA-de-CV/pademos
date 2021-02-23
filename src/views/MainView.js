import React from 'react';
import {AuthContext} from "../lib/AuthContext";
import NPIf from "np-if";
import NPElse from "np-if/src/NPElse";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";

class MainView extends React.Component{
    static contextType = AuthContext;

    render(){
        return(
            <NPIf condition={this.context.isLoggedIn}>
                <NavBar />
                <Sidebar />

            </NPIf>
        )
    }
}

export default MainView;
