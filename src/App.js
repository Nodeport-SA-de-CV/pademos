import React from 'react';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import {AuthContext} from "./lib/AuthContext";
//style
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css'

//Views
import MainView from "./views/MainView";
import LoginView from "./views/auth/LoginView";
import NoMatchView from "./views/auth/NoMatchView";
import RegisterView from "./views/auth/RegisterView";
// init icons
library.add(fab, far, fas);

class App extends React.Component {
    constructor(props) {
        super(props);

        const login = (user) => {
            this.setState({isLoggedIn:true,user:user});
        }
        const logout = () => {
            const user = {
                name:'',
                lastName:'',
                email:''
            }
            this.setState({isLoggedIn:false,user:user});
        }

        this.state = {
            isLoggedIn: false,
            user: {
                name:'',
                lastName:'',
                email:''
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
                            <MainView/>
                        </Route>
                        <Route path='/login'>
                            {this.state.isLoggedIn ? <Redirect to="/" /> : <LoginView />}
                        </Route>
                        <Route path='/register'>
                            {this.state.isLoggedIn ? <Redirect to="/" /> : <RegisterView />}
                        </Route>
                        <Route>
                            <NoMatchView />
                        </Route>
                    </Switch>
                </Router>
            </AuthContext.Provider>
        )
    }
}

export default App;
