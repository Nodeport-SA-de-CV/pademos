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
            overlaySquares:[]
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
            data:tree,
            overlaySquares:[]
        })
    }

    static getDerivedStateFromProps(props, state) {

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.data.length !== this.props.data.length){
            const tree = this.buildTree(this.props.data);
            this.setState({
                data:tree
            }, () =>{
                this.drawChart(this.state.w,this.state.h);
            })
        }
    }

    calculateContributionWeight(c) {
        // const a = Object.keys(c.topic_keywords).map((k) => k.trim());
        // const b = Object.keys(c.document_keywords[0]).map((k) => k.trim());
        return 1; //+ _.intersection(a,b).length;
    }

    buildTree(groups) {
        const tree = {
            children: groups.sort((g,g1) => g1.contributions.length - g.contributions.length).map((g) => {
                return {
                    data: g,
                    name: g.name,
                    group: '',
                    colName: '',
                    children: g.contributions.map((c) => {
                        return {
                            data: c,
                            name: '',
                            group: '',
                            value: this.calculateContributionWeight(c),
                            colName: '',
                            children: []
                        }
                    }).sort((a, b) => b.value - a.value)
                }
            })
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
                const self         = d3.select(this);
                const contribution = self.data()[0].data.data;
                leafsArray.push({x: d.x0, d: d, contribution: contribution});
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
            .style("stroke", "white")
            .style("fill", function (d, i) {
                try{
                    leafsArray[i].color = d.parent.data.data.color;
                    return "transparent";
                }catch (e) {
                    return "transparent";

                }
            })
        this.setState({leafsArray: leafsArray});

        //Get groups
        const groups       = _.groupBy(leafsArray, ((l) => {
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
                contributionCount: groups[k].length,
            });
        });

        this.setState({overlaySquares: overlaySquares});
        // this.props.onSetGroups(overlaySquares);

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
            .paddingInner(2)      // Padding between each rectangle
            //.paddingOuter(6)
            //.padding(20)
            .round(true)
            .tile(d3.treemapResquarify);
        this.treemap(root)

        this.updateTreeMap(root);
    }
    onHideGroup(group){
        let groups = this.props.hiddenGroups;
        if(! groups.includes(group)){
            groups.push(group);
            this.props.onHideGroup(groups);
        }
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
                {
                    overlaySquares.map((square,i) => {
                        return <OverlaySquares key={square.name}
                                               group={square}
                                               index={i+1}
                                               hidden={true}
                                               onHide={(s) => this.onHideGroup(s)}
                        />
                    })
                }
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
    onSetGroups: PropTypes.func,
    hiddenGroups: PropTypes.array,
    onHideGroup: PropTypes.func
};

ScientistTreeMap.defaultProps = {
    data: [

    ],
    isLoading: false,
    onContributionSelected: () => {
    },
    selectedTopic: null,
    onTopicsLoaded: () => {
    },
    searchKeyWord: '',
    searchDocumentType: '',
    onShowContributionsDetails: () => {
    },
    onSetGroups: () => {
    },
    hiddenGroups: [],
    onHideGroup: () => {
    }
};

export default ScientistTreeMap;



