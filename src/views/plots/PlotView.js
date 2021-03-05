import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import TreeMapHtml from "../../components/plots/TreeMapHtml";
import PropTypes from "prop-types";

class PlotView extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }
    search(value){
        this.treeMapHtml.search(value);
    }

    render() {
        return (
            <div className={'h-100 d-flex'}>
                <TreeMapHtml ref={(ref) => this.treeMapHtml = ref} selectedTopic={this.props.selectedTopic}
                             onContributionSelected={(contributions) => this.props.onContributionSelected(contributions)}
                             onTopicsLoaded={(contributions) => this.props.onTopicsLoaded(contributions)}
                             searchKeyWord={this.props.searchKeyWord}
                             searchDocumentType={this.props.searchDocumentType}
                >

                </TreeMapHtml>
            </div>
        )
    }
};
PlotView.propTypes = {
    onContributionSelected : PropTypes.func,
    selectedTopic          : PropTypes.object,
    onTopicsLoaded         : PropTypes.func,
    searchKeyWord          : PropTypes.string
};

PlotView.defaultProps = {
    onContributionSelected : () => {},
    selectedTopic          : null,
    onTopicsLoaded         : () => {},
    searchKeyWord          : ''
};
export default PlotView;


