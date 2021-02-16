import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';


class LoginView extends React.Component{
    render(){
        return(
            <Container className={"h-100"}>
                <Row className="h-100 align-items-center">
                    <Col>
                        <Card className={'card-shadow'}>
                            <Card.Body>
                                <Card.Title>PADEMOS</Card.Title>
                                <input />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default LoginView;
