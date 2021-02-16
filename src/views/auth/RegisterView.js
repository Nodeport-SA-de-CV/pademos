import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";
import {AuthContext} from "../../lib/AuthContext";

//components
import NPInput from "../../components/NPInput";

class RegisterView extends React.Component{
    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            name:'',
            lastName:'',
            email: '',
            pwd: '',
            pwdConfirm: '',
        };

        this.onChange = this.onChange.bind(this);
        this.onClickRegister = this.onClickRegister.bind(this);
    }

    onChange(e){
        this.setState({[e.target.id]:e.target.value});
    }

    onClickRegister(){
        const user = {name:this.state.name,lastName:this.state.lastName}
        this.context.login(user);
    //validate form and call to api
    }

    render(){
        return(
            <Container className={"h-100"}>
                <Row className="h-100 align-items-center">
                    <Col>
                        <Card className={'card-shadow'}>
                            <Card.Body>
                                <Card.Title>PADEMOS</Card.Title>
                                <NPInput id={'name'}
                                         label={'Name'}
                                         placeholder={'Name'}
                                         wrapperClass={'form-group mt-4'}
                                         inputClass={'form-control'}
                                         onChange={(e) => this.onChange(e)}
                                         value={this.state.name}
                                />
                                <NPInput id={'lastName'}
                                         label={'Last name'}
                                         placeholder={'Last name'}
                                         wrapperClass={'form-group mt-4'}
                                         inputClass={'form-control'}
                                         onChange={(e) => this.onChange(e)}
                                         value={this.state.lastName}
                                />
                                <NPInput id={'email'}
                                         label={'Email'}
                                         placeholder={'email@email.com'}
                                         wrapperClass={'form-group mt-4'}
                                         inputClass={'form-control'}
                                         onChange={(e) => this.onChange(e)}
                                         value={this.state.email}
                                />
                                <NPInput id={'pwd'}
                                         label={'Password'}
                                         type={'password'}
                                         placeholder={'Password'}
                                         wrapperClass={'form-group'}
                                         inputClass={'form-control'}
                                         onChange={(e) => this.onChange(e)}
                                         value={this.state.pwd}
                                />
                                <NPInput id={'pwdConfirm'}
                                         label={'Confirm password'}
                                         type={'password'}
                                         placeholder={'Confirm password'}
                                         wrapperClass={'form-group'}
                                         inputClass={'form-control'}
                                         onChange={(e) => this.onChange(e)}
                                         value={this.state.pwdConfirm}
                                />
                                <Button className={'mt-4'} block onClick={() => this.onClickRegister()}>Register</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default RegisterView;
