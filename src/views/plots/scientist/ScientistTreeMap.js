import React from "react";
import PropTypes from "prop-types";
import ReactResizeDetector from "react-resize-detector";
import NPIf from "np-if";
import {Spinner} from "react-bootstrap";
import * as d3 from "d3";
import OverlaySquares from "../../../components/plots/OverlaySquares";
import RecreatedTreemap from "../../../components/RecreatedTreemap";
import RecreatedScientistTreemap from "../../../components/scientist/RecreatedScientistTreemap";

const _ = require('underscore');

class ScientistTreeMap extends React.Component {

    constructor(props) {
        super(props);
        this.state             = {
            overlaySquares: []
        }
        this.spinnerColors     = [
            '#1A87D7',
            '#339F34',
            '#FD7F28',
            '#A44CE9',
            '#E17AC1',
            '#C0BA2D',
            '#976E32',
            '#2BBFCF',
            '#08FF14',
            '#58FFFF',
            '#0ED173',
            '#E8FC01',
            '#FD8080',
            '#A5F5A0',
            '#7989E7',
            '#F6CDB0',
            '#F0D0F5',
            '#F6F3AE',
            '#F4B616'
        ]
        this.currentColorIndex = 0;
    }

    componentDidMount() {
        this.changeColors();
        const tree = this.buildTree(this.props.data);
        this.setState({
            data: tree,
            overlaySquares: []
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.data.length !== this.props.data.length) {
            const tree = this.buildTree(this.props.data);
            this.setState({
                data: tree
            }, () => {
                this.drawChart(this.state.w, this.state.h);
            })
        }
    }

    calculateContributionWeight(c) {
        // const a = Object.keys(c.topic_keywords).map((k) => k.trim());
        // const b = Object.keys(c.document_keywords[0]).map((k) => k.trim());
        return 1; //+ _.intersection(a,b).length;
    }

    buildTree(groups) {
        if(this.props.level === 'perspective') {
            let children = groups.contributions.map((g) => {
                return {
                    data: g,
                    name: g.document_title_response,
                    group: g.topic_label,
                    children: [],
                    value:1
                }
            });
            const tree = {
                children: children
            }
            return tree;
        }else if(this.props.level === 'contribution'){
            let children = groups.map((g) => {
                return {
                    data: g,
                    name: g.perspective,
                    group: g.topic,
                    children: [],
                    value:1
                }
            });
            const tree = {
                children: children
            }
            return tree;
        }
        let children = groups.sort((g, g1) => g1.children.length - g.children.length).map((g) => {
            const children = [...[g], ...g.children];
            return {
                data: g,
                name: g.topic,
                group: g.topic,
                children: children.map((c) => {
                    let contributions = c.contributions ? c.contributions : [];
                    contributions = contributions.map((c) => {
                        c.children = [];
                        return c;
                    });
                    return {
                        data: c,
                        name: c.perspective,
                        group: c.topic,
                        value: this.calculateContributionWeight(c),
                        contributions: c.contributions,
                        contributionsTreeMap:this.buildTree(contributions)
                    }
                }).sort((a, b) => b.value - a.value)
            }
        });
        if (children.length > 0 && this.props.topicIndex !== -1) {
            children = [children[this.props.topicIndex]];
        }
        const tree = {
            children: children
        }
        return tree;
    }

    changeColors() {
        this.colorsInterval = setInterval(() => {
            this.currentColorIndex = this.currentColorIndex + 1;
            this.currentColorIndex = this.currentColorIndex >= this.spinnerColors.length ? 0 : this.currentColorIndex;
            this.setState({
                spinnerColor: this.spinnerColors[this.currentColorIndex]
            })
        }, 500)
    }

    updateTreeMap(root, mouseOverId = null) {
        const leafsArray = [];
        const _this      = this;
        // Give the data to this cluster layout:
        root.sum(function (d) {
            if (d.hasOwnProperty('data')) {
                if (d.data.hasOwnProperty('_id')) {
                    if (d.data._id === mouseOverId) {
                        return 10;
                    }
                }
            }
            return d.value;
        }) // Here the size of each leave is given in the 'value' field in input data

        this.treemap(root);
        var leaves = this.svg.selectAll('.leaf')
            .data(root.leaves(), function (d) {
                return d.data.data._id
            });

        const group = leaves.enter()
            .append("g")
            .attr('x', function (d) {
                return d.x0;
            })
            .attr('y', function (d) {
                return d.y0;
            })
            .attr('width', function (d) {
                return d.x1 - d.x0;
            })
            .attr('height', function (d) {
                return d.y1 - d.y0;
            })


        group.append("rect")
            .classed('leaf', true)
            .attr('x', function (d, i) {
                const self     = d3.select(this);
                const tileData = self.data()[0].data.data;
                leafsArray.push({x: d.x0, d: d, tileData: tileData});
                return d.x0;
            })
            .attr('y', function (d, i) {
                leafsArray[i].y = d.y0;
                return d.y0;
            })
            .attr('width', function (d, i) {
                leafsArray[i].width = d.x1 - d.x0;
                return d.x1 - d.x0;
            })
            .attr('height', function (d, i) {
                leafsArray[i].height = d.y1 - d.y0;
                return d.y1 - d.y0;
            })
            .style("stroke", function (d,i){
                return 'white'
            })
            .style("fill", function (d, i) {
                try {
                    if(_this.props.level === 'perspective' || 'contribution'){
                        leafsArray[i].color = d.data.data.color;
                    }
                    leafsArray[i].color = d.parent.data.data.color;

                    return "transparent";
                } catch (e) {
                    return "transparent";
                }
            })
        this.setState({leafsArray: leafsArray});
        if(this.props.level === 'scientist'){
            //Get groups
            const groups = _.groupBy(leafsArray, ((l) => {
                return l.d.parent.data.data.topic
            }));
            let overlaySquares = [];
            Object.keys(groups).forEach((k) => {

                overlaySquares.push({
                    color: groups[k][0].color,
                    name: groups[k][0].d.parent.data.name,
                    x0: groups[k][0].d.parent.x0,
                    y0: groups[k][0].d.parent.y0,
                    x1: groups[k][0].d.parent.x1,
                    y1: groups[k][0].d.parent.y1,
                    perspectiveCount: groups[k].length,
                    icon: groups[k][0].d.data.data.icon,
                    topic_labels:groups[k][0].d.data.data.topic_labels,
                    topic:groups[k][0].d.data.data
                });
            });
            this.setState({overlaySquares: overlaySquares});

        }


    }

    onResize(w, h) {
        this.drawChart(w, h);
    }

    drawChart(w, h) {
        this.setState({
            w,
            h,
            leafsArray: []
        })
        const data = this.state.data;
        if (data.children.length === 0) {
            return null;
        }
        d3.select("#treemap").selectAll("*").remove()

        // append the svg object to the body of the page

        // set the dimensions and margins of the graph
        var margin = {top: 0, right: 0, bottom: 0, left: 0},
            width  = w - margin.left - margin.right,
            height = h - margin.top - margin.bottom;

        // append the svg object to the body of the page
        this.svg = d3.select("#treemap")
            .append("svg")
            .attr("xmlns", "http://www.w3.org/2000/svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");
        var root = d3.hierarchy(data).sum(function (d) {
            return d.value
        }) // Here the size of each leave is given in the 'value' field in input data
        // Then d3.treemap computes the position of each element of the hierarchy
        this.treemap = d3.treemap()
            .size([width, height])
            .paddingTop(2)
            .paddingRight(2)
            .paddingBottom(2)
            .paddingLeft(2)
            .paddingInner(0)      // Padding between each rectangle
            //.paddingOuter(6)
            //.padding(20)
            .round(true)
            .tile(d3.treemapResquarify);
        this.treemap(root)

        this.updateTreeMap(root);
    }

    onHideGroup(group) {
        let groups = this.props.hiddenGroups;
        if (!groups.includes(group)) {
            groups.push(group);
            this.props.onHideGroup(groups);
        }
    }

    isSquareHidden(group) {
        return this.props.hiddenGroups.includes(group.name);
    }

    render() {
        const overlaySquares = this.state.overlaySquares;
        return (
            <div className={'h-100 d-flex treemap-wrapper'} style={{justifyContent: 'center'}}>
                <div id={"treemap"} ref={(ref) => this.treeMapDiv = ref}>

                </div>
                <RecreatedScientistTreemap data={this.state.leafsArray}
                                           widthTreemap={this.props.w}
                                           heightTreemap={this.props.h}
                                           onClickTile={(tile,index) => {
                                               this.props.onClickTile(tile,index)
                                           }}
                                           level={this.props.level}
                                           selectedGroups={this.props.selectedGroups}
                                           filterLinks={this.props.filterLinks}
                                           filterFinancing={this.props.filterFinancing}
                                           selectedTheme={this.props.selectedTheme}

                />
                <NPIf condition={this.props.isLoading}>
                    <Spinner className={'spinner_scientist'} animation={'grow'}
                             style={{backgroundColor: this.state.spinnerColor}}>
                        Wird geladen...
                    </Spinner>
                </NPIf>
                <ReactResizeDetector handleWidth handleHeight
                                     onResize={(w, h) => this.onResize(w, h)}>
                </ReactResizeDetector>
                <NPIf condition={this.props.level === 'scientist'}>
                    {
                        overlaySquares.map((square, i) => {
                            const intersection = _.intersection(this.props.selectedGroups.map((s) => s.name),square.topic_labels);
                            const isSelected  = intersection.length > 0;
                            const borderColor = isSelected ? this.props.selectedGroups.find((g) => g.name === intersection[0]).color : ''
                            return <OverlaySquares key={square.name}
                                                   group={square}
                                                   hidden={this.isSquareHidden(square)}
                                                   onHide={(s) => this.onHideGroup(s)}
                                                   onClickZoom={(topic) => this.props.onClickZoom(topic)}
                                                   isScientistTreeMap={true}
                                                   index={i}
                                                   gutterHeight ={3}
                                                   gutterWidth ={3}
                                                   isSelected={isSelected}
                                                   borderColor={borderColor}
                                                   filterLinks={this.props.filterLinks}
                                                   filterFinancing={this.props.filterFinancing}
                            />
                        })
                    }

                </NPIf>

            </div>
        )

    }
}

ScientistTreeMap.propTypes = {
    data: PropTypes.any,
    isLoading: PropTypes.bool,
    onContributionSelected: PropTypes.func,
    selectedTopic: PropTypes.object,
    onTopicsLoaded: PropTypes.func,
    searchKeyWord: PropTypes.string,
    searchDocumentType: PropTypes.string,
    onShowContributionsDetails: PropTypes.func,
    hiddenGroups: PropTypes.array,
    onHideGroup: PropTypes.func,
    topicIndex: PropTypes.number,
    level: PropTypes.string,
    onClickZoom:PropTypes.func,
    onClickTile: PropTypes.func,
    selectedGroups:PropTypes.array,
    filterLinks:PropTypes.bool,
    filterFinancing:PropTypes.bool,
    selectedTheme:PropTypes.object
};

ScientistTreeMap.defaultProps = {
    data: [],
    isLoading: false,
    onContributionSelected: () => {},
    selectedTopic: null,
    onTopicsLoaded: () => {},
    searchKeyWord: '',
    searchDocumentType: '',
    onShowContributionsDetails: () => {},
    hiddenGroups: [],
    onHideGroup: () => {},
    topicIndex: -1,
    level: 'scientist',
    onClickZoom: () => {},
    onClickTile: () => {},
    selectedGroups: [],
    filterLinks:false,
    filterFinancing:false,
    selectedTheme:{}
};

export default ScientistTreeMap;



