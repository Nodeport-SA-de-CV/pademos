import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import TreeMapHtml from "../../components/plots/TreeMapHtml";
import PropTypes from "prop-types";
import ScrollContainer from 'react-indiana-drag-scroll'
import TreeMap from "../../components/plots/TreeMap";
import ReactResizeDetector from "react-resize-detector";
import RecreatedTreemap from "../../components/RecreatedTreemap";

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
        this.treeMap.search(value);
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
        this.treeMap.loadData();
    }
    onResize(w,h){
        this.setState({
            w:w,
            h:h
        })
        this.treeMap.drawChart(w,h);
    }
    render() {
        return (
            <div className={'h-100 d-flex'}
            >
                <ReactResizeDetector handleWidth handleHeight onResize={(w, h) => this.onResize(w, h)}>
                </ReactResizeDetector>
                <TreeMap ref={(ref) => this.treeMap = ref} w={this.state.w} h={this.state.h}
                         searchDocumentType={this.props.searchDocumentType}
                         onTopicsLoaded={(topics) => this.props.onTopicsLoaded(topics)}
                         searchKeyWord={this.props.searchKeyWord}
                         selectedTopic={this.props.selectedTopic}
                         onContributionSelected={(contributions) => this.props.onContributionSelected(contributions)}
                >

                </TreeMap>
            </div>

        )
    }
};

PlotView.propTypes = {
    onContributionSelected : PropTypes.func,
    selectedTopic          : PropTypes.object,
    onClickedContribution  : PropTypes.func,
    onTopicsLoaded         : PropTypes.func,
    searchKeyWord          : PropTypes.string,
    searchDocumentType     : PropTypes.string
};

PlotView.defaultProps = {
    onContributionSelected : () => {},
    selectedTopic          : null,
    onClickedContribution  : () => {},
    onTopicsLoaded         : () => {},
    searchKeyWord          : '',
    searchDocumentType     : ''
};

export default PlotView;


