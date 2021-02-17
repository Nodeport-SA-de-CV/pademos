import React from 'react';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {AuthContext} from "./lib/AuthContext";
//style
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css'

//Views
import MainView from "./views/MainView";
import LoginView from "./views/LoginView";
import NoMatchView from "./views/NoMatchView";
import PlotView from "./views/plots/PlotView";

// init icons
library.add(fab, far, fas);

class App extends React.Component {
    constructor(props) {
        super(props);

        const login = () => {
            const user = {name:'america',lastName: 'mendoza'}
            this.setState({isLoggedIn:true,user:user});
        }
        const logout = () => {
            const user = {name:'',lastName: ''}
            this.setState({isLoggedIn:false});
        }

        this.state = {
            isLoggedIn: false,
            user: {
                name:'',
                lastName:''
            },
            login: login,
            logout: logout
        }
    }

    render() {
        return (
            <AuthContext.Provider value={this.state}>
                <Router>
                    <Switch>
                        <Route exact path='/'>
                            <MainView></MainView>
                        </Route>
                        <Route path='/login'>
                            <LoginView></LoginView>
                        </Route>
                        <Route path='/plot'>
                            <PlotView></PlotView>
                        </Route>
                        <Route>
                            <NoMatchView></NoMatchView>
                        </Route>
                    </Switch>
                </Router>
            </AuthContext.Provider>
        )
    }
}

export default App;
