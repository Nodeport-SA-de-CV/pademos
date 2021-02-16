import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

//style
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css'

//Views
import MainView from "./views/MainView";
import LoginView from "./views/LoginView";


// init icons
library.add(fab,far,fas);

class App extends React.Component{
  render(){
    return(
        <Router>
            <Switch>
                <Route exact path='/'>
                    <MainView></MainView>
                </Route>
                <Route path='/login'>
                    <LoginView></LoginView>
                </Route>
            </Switch>
        </Router>
        )

  }
}

export default App;
