import React from 'react';
import {AuthContext} from "../lib/AuthContext";
import NPIf from "np-if";
import NPElse from "np-if/src/NPElse";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

class MainView extends React.Component{
    static contextType = AuthContext;

    render(){
        return(
            <NPIf condition={this.context.isLoggedIn}>
                <div className={'h-100'}>
                    <NavBar />
                    <div className={'wrapper-content'}>
                        <Sidebar />
                        <div className={'content'}>
                            <Header />
                        </div>
                    </div>
                </div>
            </NPIf>
        )
    }
}

export default MainView;
