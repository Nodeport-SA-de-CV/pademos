import React from 'react';
import {AuthContext} from "../lib/AuthContext";
import NPIf from "np-if";
import NPElse from "np-if/src/NPElse";

class MainView extends React.Component{
    static contextType = AuthContext;

    render(){
        return(
            <NPIf condition={this.context.isLoggedIn}>
                <div>MainView Protected</div>
                <div style={{backgroundColor: 'plum'}} onClick={() => this.context.logout()}>Logout</div>
                <NPElse>
                    <div style={{backgroundColor: 'pink'}} onClick={() => this.context.login()}>Login</div>
                </NPElse>
            </NPIf>
        )
    }
}

export default MainView;
