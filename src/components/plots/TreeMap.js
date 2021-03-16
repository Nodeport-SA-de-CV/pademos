import React from "react";
import ReactDOM from "react-dom";
import * as d3 from "d3";
import {Col, Row, Container, Spinner} from "react-bootstrap";
import ReactResizeDetector from 'react-resize-detector';
import {text} from "@fortawesome/fontawesome-svg-core";
import API from "../../lib/api/API";
import GroupTitle from "./GroupTitle";
import MyLabel from "./ui/MyLabel";
import RecreatedTreemap from "../RecreatedTreemap";
import NPIf from "np-if";
import PropTypes from "prop-types";
import TreeMapHtml from "./TreeMapHtml";

class TreeMap extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            d3: '',
            overlayX:100,
            overlayY:100,
            overlayWidth:100,
            overlayHeight:100,
            leafsArray: []
        }
        this.svg = null;
        this.drawChart = this.drawChart.bind(this);
        this.search = this.search.bind(this);
        this.spinnerColors        = [
            '#1A87D7',
            '#339F34',
            '#FD7F28',
            '#A44CE9',
            '#E17AC1',
            '#C0BA2D',
            '#976E32',
            '#2BBFCF',
            '#08FF14',
            '#0D08F9',
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
        this.updateTreeMap = this.updateTreeMap.bind(this);
        this.search        = this.search.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }
    buildTree(groups){
        const area = this.treeMapDiv.clientWidth * this.treeMapDiv.clientHeight;
        const tree = {
            children:groups.sort((g,g1) => g1.contributions.length - g.contributions.length).map((g) =>{
                const groupWeight = (g.contributions.length * area) / 100;
                return{
                    data:g,
                    name:'',
                    group:'',
                    colName:'',
                    children:g.contributions.map((c) =>{
                        return{
                            data:c,
                            name:'',
                            group:'',
                            value: 1,
                            colName:'',
                            children:[]
                        }
                    })
                }
            })
        }
        return tree;
    }
    loadData() {
        this.setState({isLoading: true})
        this.changeColors();
        API.getContributions().then((res) => {
            if (res.success) {
                this.props.onTopicsLoaded(res.topics);
                this.setState({
                    data: this.buildTree(res.topics),
                    topics: res.topics,
                    isLoading: false
                }, () => {
                    this.drawChart(this.props.w,this.props.h);
                });
                clearInterval(this.colorsInterval);
            }
        })
    }
    onResize(w, h) {
        this.drawChart(w, h);
    }
    updateTreeMap(root,mouseOverId = null){
        const leafsArray = [];
        const _this = this;
        // Give the data to this cluster layout:
        root.sum(function(d){
            if(d.hasOwnProperty('data')){
                if(d.data.hasOwnProperty('_id')){
                    if(d.data._id === mouseOverId){
                        return 10;
                    }
                }
            }
            return d.value;
        }) // Here the size of each leave is given in the 'value' field in input data
        // var root =  d3.hierarchy(data)
        // .sum(function(d) { return  d.value})
        this.treemap(root);
        var leaves = this.svg.selectAll('.leaf')
            .data(root.leaves(),function(d) {
                return d.data.data._id
            });

        // use this information to add rectangles:
        // this.svg
        //     .selectAll("rect")
        //     .data(root.leaves())
        //     .enter()
        const group =         leaves.enter()
            .append("g")
            .attr('x', function (d) { return d.x0; })
            .attr('y', function (d) { return d.y0; })
            .attr('width', function (d) { return d.x1 - d.x0; })
            .attr('height', function (d) { return d.y1 - d.y0; })


        group.append("rect")
            .classed('leaf',true)
            .attr('x', function (d,i) {
                const self = d3.select(this);
                const contribution = self.data()[0].data.data;
                leafsArray.push({x: d.x0,contribution:contribution});
                return d.x0;
            })
            .attr('y', function (d,i) {
                leafsArray[i].y = d.y0;
                return d.y0;
            })
            .attr('width', function (d,i) {
                leafsArray[i].width = d.x1 - d.x0;
                return d.x1 - d.x0;
            })
            .attr('height', function (d,i) {
                leafsArray[i].height = d.y1 - d.y0;
                return d.y1 - d.y0;
            })
            .style("stroke", "transparent")
            .style("fill", function(d,i){
                leafsArray[i].color = d.parent.data.data.color;
                return "transparent"
            } )
            this.setState({leafsArray:leafsArray});
        // leaves
        //     .transition()
        //     .duration(1000)
        //     .attr('x', function(d) { return d.x0})
        //     .attr('y', function(d) { return d.y0})
        //     .attr('width', function(d) { return d.x1 - d.x0})
        //     .attr('height', function(d) { return d.y1 - d.y0})

    }
    drawChart(w, h) {
        const _this = this;
        // w = 500;
        // h = 500;
        console.log(w,h)
        this.setState({
            w,
            h,
            leafsArray:[]
        })
        const data = this.state.data;
        if(!data){
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
            .attr("xmlns","http://www.w3.org/2000/svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");
        var root = d3.hierarchy(data).sum(function(d){
            return d.value
        }) // Here the size of each leave is given in the 'value' field in input data
        // Then d3.treemap computes the position of each element of the hierarchy
        this.treemap = d3.treemap()
            .size([width, height])
            .paddingTop(1)
            .paddingRight(1)
            .paddingInner(1)      // Padding between each rectangle
            //.paddingOuter(6)
            //.padding(20)
            .round(true)
            .tile(d3.treemapResquarify);
        this.treemap(root)

        this.updateTreeMap(root);
    }
    search(value) {
        var search = new RegExp(value, 'i');
        // console.log(this.state.data)
        const data = this.state.topics.filter((t) => {
            // search in all contributions
            t = t.contributions.map((contribution) => {
                contribution.isDisabled = !(
                    (value ? search.test(contribution.document_what) : true)
                    && (this.props.searchKeyWord ? contribution.topic_keywords.includes(this.props.searchKeyWord) : true)
                    && (this.props.searchDocumentType ? contribution.document_type === this.props.searchDocumentType : true)
                );
                return contribution;
            })

            return t;
        })
        const treeData = this.buildTree(data);
        this.setState({
            data: treeData
        },() =>{
            var root = d3.hierarchy(treeData).sum(function(d){
                return d.value
            })
            // this.treemap(root)
            // console.log(treeData)
            // this.updateTreeMap(root);
            this.drawChart(this.props.w,this.props.h);

        })

    }
    changeColors(){
        this.colorsInterval = setInterval(() => {
            this.currentColorIndex = this.currentColorIndex + 1;
            this.currentColorIndex = this.currentColorIndex >= this.spinnerColors.length ? 0 : this.currentColorIndex;
            this.setState({
                spinnerColor: this.spinnerColors[this.currentColorIndex]
            })
        },500)
    }
    render() {
        return (
            <div style={{flex:1,display:'flex',position:'relative'}}>
                <NPIf condition={this.state.data === null || this.state.isLoading}>
                    <Spinner animation={'grow'} style={{width:200,height:200,backgroundColor:this.state.spinnerColor}}></Spinner>
                </NPIf>
                    <div id={"treemap"} ref={(ref) => this.treeMapDiv = ref}>

                    </div>
                <RecreatedTreemap data={this.state.leafsArray}></RecreatedTreemap>
            </div>

        )
    }
};

TreeMap.propTypes = {
    onContributionSelected: PropTypes.func,
    selectedTopic: PropTypes.object,
    onClickContributionDetails: PropTypes.func,
    onTopicsLoaded: PropTypes.func,
    searchKeyword: PropTypes.string,
    searchDocumentType: PropTypes.string,
    zoom: PropTypes.number
};

TreeMap.defaultProps = {
    onContributionSelected: () => {
    },
    selectedTopic: null,
    onClickContributionDetails: () => {
    },
    onTopicsLoaded: () => {
    },
    searchKeyword: 'idee',
    searchDocumentType: '',
    zoom: 1
};
export default TreeMap;
