import React from "react";
import PropTypes from "prop-types";
import TreeMap from "../../components/plots/TreeMap";
import ReactResizeDetector from "react-resize-detector";
import ContributionDetails from "../../components/plots/ContributionDetails";
import NPIf from "np-if";
import ConnectionDetails from "../../components/scientist/ConnectionDetails";
import CitizenBreadCrumbs from "../../components/citizen/CitizenBreadCrumbs";

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
            rectY:0,
            showContributionsDetails: false,
            clickedContribution:{},
            level:'citizen',
            group:''
        }
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
    onClickZoom(index,group){
        this.setState({
            level:'group',
            group:group
        })
        this.treeMap.loadData(index - 1);
    }
    reset(){
        this.setState({
            level:'citizen'
        })
        this.treeMap.loadData();
    }
    render() {
        return (
            <div className={'h-100 d-flex'} style={{flexDirection:'column'}}>
                <ReactResizeDetector handleWidth handleHeight
                                     onResize={(w, h) => this.onResize(w, h-100)}>
                </ReactResizeDetector>
                <CitizenBreadCrumbs level={this.state.level} group={this.state.group} onCitizenClicked={() => this.reset()}></CitizenBreadCrumbs>
                <TreeMap ref={(ref) => this.treeMap = ref} w={this.state.w} h={this.state.h}
                         searchDocumentType={this.props.searchDocumentType}
                         onTopicsLoaded={(topics) => this.props.onTopicsLoaded(topics)}
                         searchKeyWord={this.props.searchKeyWord}
                         selectedTopic={this.props.selectedTopic}
                         onContributionSelected={(contributions) => this.props.onContributionSelected(contributions)}
                         onClickContributionDetails={(contribution) => {
                             this.setState({clickedContribution:contribution, showContributionDetails:true});
                             this.props.onShowContributionsDetails(true)
                         }}
                         selectedContributions={this.props.selectedContributions}
                         disabledCursorEvents={this.state.showContributionDetails}
                         onSetGroups={(g) => this.props.onSetGroups(g)}
                         hiddenGroups={this.props.hiddenGroups}
                         onHideGroup={(h) => this.props.onHideGroup(h)}
                         onClickZoom={(i,group) => this.onClickZoom(i,group)}
                         level={this.state.level}
                />
                <NPIf condition={this.state.showContributionDetails}>
                    <ContributionDetails w={this.state.w} h={this.state.h}
                                         contribution={this.state.clickedContribution}
                                         isSelected={this.state.clickedContribution.isSelected}
                                         onClickClose={() => {
                                             this.setState({showContributionDetails:false, clickedContribution: {}});
                                             this.props.onShowContributionsDetails(false)
                                         }}
                                         onContributionSelected={(contribution) =>{
                                             this.setState({
                                                 clickedContribution: contribution
                                             });
                                             this.props.onContributionSelected(contribution)
                                         }}
                    />
                </NPIf>
                <NPIf condition={this.props.showConnectionDetails}>
                    <ConnectionDetails w={this.state.w}
                                       h={this.state.h}
                                       className={'citizen'}
                                       connection={this.props.connectionData}
                                       onClickClose={() => this.props.onSetConnectionDetails(false,{})}
                                       index={this.props.connectionData.index}
                    />
                </NPIf>
            </div>

        )
    }
};

PlotView.propTypes = {
    onContributionSelected    : PropTypes.func,
    selectedTopic             : PropTypes.object,
    onTopicsLoaded            : PropTypes.func,
    searchKeyWord             : PropTypes.string,
    searchDocumentType        : PropTypes.string,
    onShowContributionsDetails: PropTypes.func,
    onSetGroups               : PropTypes.func,
    hiddenGroups              : PropTypes.array,
    onHideGroup               : PropTypes.func,
    showConnectionDetails     : PropTypes.bool,
    connectionData            : PropTypes.object,
    onSetConnectionDetails    : PropTypes.func,
};

PlotView.defaultProps = {
    onContributionSelected    : () => {},
    selectedTopic             : null,
    onTopicsLoaded            : () => {},
    searchKeyWord             : '',
    searchDocumentType        : '',
    onShowContributionsDetails: () => {},
    onSetGroups               : () => {},
    hiddenGroups              : [],
    onHideGroup               : () => {},
    showConnectionDetails     : false,
    connectionData            : {index:0},
    onSetConnectionDetails    : () => {}
};

export default PlotView;


