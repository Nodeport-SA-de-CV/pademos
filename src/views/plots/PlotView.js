import React from "react";
import TreeMap from "../../components/plots/TreeMap";
import {Col, Container, Row} from "react-bootstrap";

class PlotView extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <Container className={'h-100'}>
                <Row className={'h-100 align-items-center justify-content-center'}>
                    <Col className={'d-flex align-items-center justify-content-center'}>
                <TreeMap></TreeMap>
                    </Col>
                </Row>
            </Container>
        )
    }
};
export default PlotView;
