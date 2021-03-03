import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import TreeMapHtml from "../../components/plots/TreeMapHtml";

class PlotView extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className={'h-100 d-flex'}>
                <TreeMapHtml></TreeMapHtml>
            </div>
        )
    }
};
export default PlotView;
