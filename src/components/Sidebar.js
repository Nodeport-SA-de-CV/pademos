import React from 'react';
import PropTypes from 'prop-types';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/cjs/NavDropdown";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {AuthContext} from "../lib/AuthContext";
import {Link} from "react-router-dom";



class Sidebar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        }
        this.onClickHelp = this.onClickHelp.bind(this);
    }

    static contextType = AuthContext;


    onClickHelp(){
        console.log('help clicked');
    }

    render(){
        return(
            <div className={'sidebar'}>
                <h4>Forschungsthemen</h4>
                <div className={'btn btn-tiny txt-right'}>Anweisungen <FontAwesomeIcon icon={'caret-down'}/></div>
                <div className={'sidebar-header'}>
                    <h2>12</h2>
                    <div className={'sidebar-header-row'}>
                        <div>definierte Verbindungen</div>
                        <div className={'sidebar-icon-link'}><FontAwesomeIcon icon={'link'}/></div>
                    </div>
                    <div className={'txt-right'}>neue Verbindung zum Forschungsthema definieren</div>
                </div>
                <div className={'sidebar-content'}>
                    <div className={'topic'}>topic</div>
                </div>
                <Form>
                    <Form.Check id="sidebar-checkbox"
                                type="checkbox"
                                label="alle definierten Verbindungen von Beiträgen zu Forschungsthemen anzeigen" />
                </Form>
            </div>
        )
    }
}

export default Sidebar;

Sidebar.propTypes = {

};

Sidebar.defaultProps = {

};
