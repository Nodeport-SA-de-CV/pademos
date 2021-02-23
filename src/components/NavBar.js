import React from 'react';
import PropTypes from 'prop-types';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/cjs/NavDropdown";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {AuthContext} from "../lib/AuthContext";
import {Link} from "react-router-dom";



class NavBar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            enabledWissenschaftler: false,
        }
        this.onClickHelp = this.onClickHelp.bind(this);
    }

    static contextType = AuthContext;


    onClickHelp(){
        console.log('help clicked');
    }

    render(){
        return(
            <Navbar bg="dark" variant="dark" expand="lg">

                <Link to="/"><Navbar.Brand>Visualizierung der Bürger- und Forschungsthemen</Navbar.Brand></Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Form inline>
                        <Form.Label className={'mr-2'} htmlFor={'custom-switch'}>Bürger </Form.Label>
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            label="Wissenschaftler"
                            checked={this.state.enabledWissenschaftler}
                            onChange={() => this.setState({enabledWissenschaftler: !this.state.enabledWissenschaftler})}
                        />
                    </Form>
                    <Nav>
                        <Nav.Link href={"/"}>Journalists stories</Nav.Link>
                        <Nav.Link onClick={() => this.onClickHelp()}><FontAwesomeIcon icon="question" /></Nav.Link>
                        <NavDropdown id="basic-nav-dropdown" title={<FontAwesomeIcon icon={'user'}/>}>
                            <NavDropdown.Item >{this.context.user.name}</NavDropdown.Item>
                            {/*<NavDropdown.Divider />*/}
                            <NavDropdown.Item onClick={() => this.context.logout()}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default NavBar;

NavBar.propTypes = {

};

NavBar.defaultProps = {

};
