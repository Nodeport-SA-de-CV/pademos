import React from 'react';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import {AuthContext} from "./lib/AuthContext";
import PADEMOS from "./lib/api/API";

//style
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css'

//Views
import MainView from "./views/MainView";
import PlotView from "./views/plots/PlotView";
import RegisterView from "./views/auth/RegisterView";
import LoginView from "./views/auth/LoginView";
import NoMatchView from "./views/auth/NoMatchView";
import AdminView from "./views/admin/AdminView";
import ScientistView from "./views/ScientistView";

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
                last_name:'',
                email:'',
                roles:[],
                uid:'',
                _id:'',
                is_disabled:false
            }
            this.setState({isLoggedIn:false,user:user});
        }

        this.state = {
            isLoggedIn: false,
            user: {
                name:'',
                last_name:'',
                email:'',
                roles:[],
                uid:'',
                _id:'',
                is_disabled:false
            },
            login: login,
            logout: logout
        }
    }

    componentDidMount() {
        PADEMOS.getMe().then(res => {
            if(res.success){
                this.setState({isLoggedIn: true, user: res.user});
            }
        })
    }

    render() {
        return (
            <AuthContext.Provider value={this.state}>
                <Router>
                    <Switch>
                        <Route path='/scientist'>
                            { this.state.isLoggedIn ? <ScientistView /> : <LoginView/> }
                        </Route>
                        <Route exact path='/'>
                            {this.state.isLoggedIn ? <MainView /> : <Redirect to="/login"/>}
                        </Route>
                        <Route path='/login'>
                            {this.state.isLoggedIn ? <Redirect to="/" /> : <LoginView />}
                        </Route>
                        <Route path='/register'>
                            {this.state.isLoggedIn ? <Redirect to="/" /> : <RegisterView />}
                        </Route>
                        <Route path='/plot'>
                            <PlotView></PlotView>
                        </Route>
                        <Route path='/admin'>
                            <AdminView></AdminView>
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
