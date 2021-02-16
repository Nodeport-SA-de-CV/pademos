import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";

//components
import NPInput from "../../components/NPInput";

class LoginView extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            pwd: '',
        };

        this.onChange = this.onChange.bind(this);
        this.onClickLogin = this.onClickLogin.bind(this);
    }

    onChange(e){
        this.setState({[e.target.id]:e.target.value});
    }

    onClickLogin(){
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
                                <Button className={'mt-4'} block onClick={() => this.onClickLogin()}>LOGIN</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default LoginView;
