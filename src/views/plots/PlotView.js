import React from "react";
import TreePlot from "../../components/plots/TreePlot";
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
                <TreePlot></TreePlot>
                    </Col>
                </Row>
            </Container>
        )
    }
};
export default PlotView;
