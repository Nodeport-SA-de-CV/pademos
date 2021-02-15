
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import MainView from "./views/MainView";

// init icons
library.add(fab,far,fas);

class App extends React.Component{
  render(){
    return(
        <Router>
            <Switch>
                <Route path='/'>
                    <MainView></MainView>
                </Route>
            </Switch>
        </Router>
        )

  }
}

export default App;
