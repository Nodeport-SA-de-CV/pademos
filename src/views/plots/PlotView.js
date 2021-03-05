import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import TreeMapHtml from "../../components/plots/TreeMapHtml";
import PropTypes from "prop-types";
import ScrollContainer from 'react-indiana-drag-scroll'

class PlotView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            zoom: 1
        }
    }

    componentDidMount() {
    }

    search(value) {
        this.treeMapHtml.search(value);
    }

    onWheel(v) {
        let zoom = this.state.zoom + Math.round(0.3 * v.deltaY  * -1) * .05;
        if (zoom >= 2) {
            zoom = 2;
        } else if (zoom <= 0) {
            zoom = 0.5;
        }
        this.setState({
            zoom: zoom
        })
    }

    render() {
        return (
            <div className={'h-100 d-flex'} onWheel={(v) => this.onWheel(v)}>
                <ScrollContainer vertical={true} horizontal={true} className={'h-100 w-100 d-flex'}>
                    <TreeMapHtml ref={(ref) => this.treeMapHtml = ref}
                                 selectedTopic={this.props.selectedTopic}
                                 onContributionSelected={(contributions) => this.props.onContributionSelected(contributions)}
                                 onTopicsLoaded={(contributions) => this.props.onTopicsLoaded(contributions)}
                                 searchKeyWord={this.props.searchKeyWord}
                                 searchDocumentType={this.props.searchDocumentType}
                                 zoom={this.state.zoom}
                                 onClickContributionDetails={(contribution) => this.props.onClickContributionDetails(contribution)}

                    >
                    </TreeMapHtml>
                </ScrollContainer>
            </div>

        )
    }
};

PlotView.propTypes = {
    onContributionSelected : PropTypes.func,
    selectedTopic          : PropTypes.object,
    onClickedContribution  : PropTypes.func,
    onTopicsLoaded         : PropTypes.func,
    searchKeyWord          : PropTypes.string
};

PlotView.defaultProps = {
    onContributionSelected : () => {},
    selectedTopic          : null,
    onClickedContribution  : () => {},
    onTopicsLoaded         : () => {},
    searchKeyWord          : ''
};

export default PlotView;


