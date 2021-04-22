import React from 'react';
import PropTypes from 'prop-types';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/cjs/NavDropdown";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {AuthContext} from "../lib/AuthContext";
import {Link, withRouter} from "react-router-dom";



class NavBar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            enabledWissenschaftler: false,
        }
        this.onClickHelp = this.onClickHelp.bind(this);
        this.onChange = this.onChange.bind(this);

    }

    static contextType = AuthContext;


    onClickHelp(){
    }
    onChange(event){
        const val = event.target.value;
        console.log(val)
        if(val === 'Wissenschaftler'){
            this.props.history.push('/scientist');
        }else{
            this.props.history.push('/');

        }
    }
    render(){
        return(
            <Navbar bg="dark" variant="dark" expand="lg">

                <Link to="/"><Navbar.Brand>Visualisierung der Beiträge VON:</Navbar.Brand></Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Form inline className={'mr-auto ml-auto'}>
                        <Form.Control as="select" custom id="custom-select"
                                      onChange={(event => this.onChange(event))}
                                      value={this.props.pickerValue}
                        >
                            <option value={'bürger'}>Bürger:innen</option>
                            <option value={'Wissenschaftler'}>Wissenschaftler:innen</option>
                        </Form.Control>
                    </Form>
                    <Nav>
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
export default withRouter (NavBar);

NavBar.propTypes = {
    pickerValue:PropTypes.string
};

NavBar.defaultProps = {
    pickerValue:'bürger'

};
