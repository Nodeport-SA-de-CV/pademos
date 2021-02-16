import React from 'react';
import {AuthContext} from "../lib/AuthContext";
import NPIf from "np-if";

class MainView extends React.Component{
    static contextType = AuthContext;

    render(){
        return(
            <div>
                <NPIf condition={this.context.isLoggedIn}>
                    <div>MainView Protected</div>
                    <div style={{backgroundColor: 'plum'}} onClick={() => this.context.logout()}>Logout</div>
                </NPIf>

                <div style={{backgroundColor: 'pink'}} onClick={() => this.context.login()}>Login</div>
            </div>
        )
    }
}

export default MainView;
