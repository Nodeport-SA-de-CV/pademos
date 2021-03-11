import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import TreeMapHtml from "../../components/plots/TreeMapHtml";
import PropTypes from "prop-types";
import ScrollContainer from 'react-indiana-drag-scroll'
import TreeMap from "../../components/plots/TreeMap";

class PlotView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            zoom: 1,
            isDragging:false,
            X:0,
            Y:0,
            startDraggingX:0,
            startDraggingY:0,
            translateX:0,
            translateY:0,
            translateXAtStartDragging:0,
            translateYAtStartDragging:0,
            rectX:0,
            rectY:0
        }
    }

    componentDidMount() {
    }

    search(value) {
        this.treeMapHtml.search(value);
    }

    onWheel(v) {
        let zoom = this.state.zoom + Math.round(0.3 * v.deltaY  * -1) * .07;
        if (zoom >= 2) {
            zoom = 2;
        } else if (zoom <= 0.5) {
            zoom = 0.5;
        }
        this.setState({
            zoom: zoom
        })
    }
    onMouseDown(e){
        this.setState({
            isDragging:true,
            startDraggingX:e.nativeEvent.pageX,
            startDraggingY:e.nativeEvent.pageY,
            translateXAtStartDragging:this.state.translateX,
            translateYAtStartDragging:this.state.translateY
        })
    }
    onMouseUp(e){
        this.setState({
            isDragging:false
        })
    }
    onMouseMove(e){
        if(this.state.isDragging){
            const offSetX = this.state.startDraggingX - e.nativeEvent.pageX;
            const offSetY = this.state.startDraggingY - e.nativeEvent.pageY;
            const translateX = this.state.translateXAtStartDragging - offSetX
            const translateY = this.state.translateYAtStartDragging - offSetY
            this.setState({
                X:e.nativeEvent.pageX,
                Y:e.nativeEvent.pageY,
                translateX: translateX,
                translateY: translateY
            })
        }

    }
    onMouseLeave(e){
        this.setState({
            isDragging:false
        })
    }
    loadData(){
        this.treeMapHtml.loadData();
    }
    render() {
        return (
            <div className={'h-100 d-flex'}
            >
                <TreeMap>

                </TreeMap>
                    {/*<TreeMapHtml ref={(ref) => this.treeMapHtml = ref}*/}
                    {/*             selectedTopic={this.props.selectedTopic}*/}
                    {/*             onContributionSelected={(contributions) => this.props.onContributionSelected(contributions)}*/}
                    {/*             onTopicsLoaded={(contributions) => this.props.onTopicsLoaded(contributions)}*/}
                    {/*             searchKeyWord={this.props.searchKeyWord}*/}
                    {/*             searchDocumentType={this.props.searchDocumentType}*/}
                    {/*             onClickContributionDetails={(contribution) => this.props.onClickContributionDetails(contribution)}*/}
                    {/*             zoom={this.state.zoom}*/}
                    {/*             translateX={this.state.translateX}*/}
                    {/*             translateY={this.state.translateY}*/}
                    {/*             isDragging={this.state.isDragging}*/}
                    {/*             load*/}
                    {/*>*/}
                    {/*</TreeMapHtml>*/}
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


