import React from "react";
import ReactDOM from "react-dom";
import * as d3 from "d3";
import {Spinner} from "react-bootstrap";
import API from "../../lib/api/API";
import RecreatedTreemap from "../RecreatedTreemap";
import NPIf from "np-if";
import PropTypes from "prop-types";
import RecreatedTile from "./RecreatedTile";
import OverlaySquares from "./OverlaySquares"
import CitizenBreadCrumbs from "../citizen/CitizenBreadCrumbs";
const _ = require('underscore');


class TreeMap extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            d3: '',
            overlayX:100,
            overlayY:100,
            overlayWidth:100,
            overlayHeight:100,
            leafsArray: [],
            overlaySquares:[],
            groupsHidden: [],
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
        this.currentColorIndex          = 0;
        this.updateTreeMap              = this.updateTreeMap.bind(this);
        this.search                     = this.search.bind(this);
        this.hideGroupsFromContribution = this.hideGroupsFromContribution.bind(this)
    }

    componentDidMount() {
        this.loadData();
    }
    calculateContributionWeight(c){
        const a = Object.keys(c.topic_keywords).map((k) => k.trim());
        const b = Object.keys(c.document_keywords[0]).map((k) => k.trim());
        return 1 + _.intersection(a,b).length;
    }
    buildTree(groups){
        const area = this.treeMapDiv.clientWidth * this.treeMapDiv.clientHeight;
        const tree = {
            children:groups.sort((g,g1) => g1.contributions.length - g.contributions.length).map((g) =>{
                const groupWeight = (g.contributions.length * area) / 100;
                return{
                    data:g,
                    name:g.name,
                    group:'',
                    colName:'',
                    children:g.contributions.map((c) =>{
                        return{
                            data:c,
                            name:'',
                            group:'',
                            value: this.calculateContributionWeight(c),
                            colName:'',
                            children:[]
                        }
                    }).sort((a,b) => b.value - a.value)
                }
            })
        }
        return tree;
    }
    loadData(i = null) {
        this.setState({
            isLoading: true,
            leafsArray:[],
            overlaySquares:[]
        })
        this.changeColors();
        API.getContributions().then((res) => {
            const topics = i === null ? res.topics : [res.topics[i]];
            if (res.success) {
                this.props.onTopicsLoaded(res.topics);
                this.setState({
                    data: this.buildTree(topics),
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
                leafsArray.push({x: d.x0,d:d,contribution:contribution});
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

        //Get groups
        const groups = _.groupBy(leafsArray,((l) => l.d.parent.data.name));
        let overlaySquares = [];
        Object.keys(groups).forEach((k) =>{
            overlaySquares.push({
                color:groups[k][0].color,
                name:groups[k][0].d.parent.data.name,
                x0:groups[k][0].d.parent.x0,
                y0:groups[k][0].d.parent.y0,
                x1:groups[k][0].d.parent.x1,
                y1:groups[k][0].d.parent.y1,
                contributionCount: groups[k].length,
            });
        });

        this.setState({overlaySquares:overlaySquares});
        this.props.onSetGroups(overlaySquares);

    }
    drawChart(w, h) {
        const _this = this;
        // w = 500;
        // h = 500;
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
    search(value) {
        var search = new RegExp(value, 'i');
        // console.log(this.state.data)
        const data = this.state.topics.filter((t) => {
            // search in all contributions
            t = t.contributions.map((contribution) => {
                contribution.isDisabled = !(
                    (value ? search.test(contribution.document_what_response) : true)
                    && (this.props.searchKeyWord ? Object.keys(contribution.document_keywords[0]).includes(this.props.searchKeyWord) : true)
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
            this.hideGroupsFromContribution(value);
        })
    }

    setGroupsEnable(){
        let overlaySquares = this.state.overlaySquares;
        overlaySquares = overlaySquares.map((os) =>{
            os.disabled = false;
            return os;
        });
        this.setState({overlaySquares:overlaySquares});
    }

    hideGroupsFromContribution(value){
        //show all groups
        if(value === '' && this.props.searchDocumentType === '' && this.props.searchKeyWord === ''){
            return this.props.onHideGroup( [] );
        }

        const contributions = this.state.leafsArray.filter(l => ! l.contribution.isDisabled);
        let groups = contributions.map(c => c.contribution.topic_label);
        groups = _.uniq(groups);

        //disabled the other groups
        let overlaySquares = this.state.overlaySquares;
        overlaySquares = overlaySquares.map((os) =>{
            os.disabled = !groups.includes(os.name);
            return os;
        })
        this.setState({overlaySquares:overlaySquares});

        this.props.onHideGroup( groups );
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

    isSquareHidden(group){
        return this.props.hiddenGroups.includes(group.name);
    }

    onHideGroup(group){
        let groups = this.props.hiddenGroups;
        if(! groups.includes(group)){
            groups.push(group);
            this.props.onHideGroup(groups);
        }
    }
    render() {
        const disabledClass = this.props.disabledCursorEvents ? 'disabled' : '';
        const overlaySquares = this.state.overlaySquares;

        return (
            <div className={`treemap-wrapper ${disabledClass}` }>
                <NPIf condition={this.state.data === null || this.state.isLoading}>
                    <Spinner className={'spinner'} animation={'grow'} style={{backgroundColor:this.state.spinnerColor}}>
                        Wird geladen...
                    </Spinner>
                </NPIf>
                <div id={"treemap"} ref={(ref) => this.treeMapDiv = ref}>

                </div>
                <RecreatedTreemap data={this.state.leafsArray}
                                  selectedTopic={this.props.selectedTopic}
                                  onContributionSelected={(selectedContributions) =>
                                      this.props.onContributionSelected(selectedContributions)}
                                  onClickContributionDetails={(c) => this.props.onClickContributionDetails(c)}
                                  selectedContributions={this.props.selectedContributions}
                                  widthTreemap={this.props.w}
                                  heightTreemap={this.props.h}
                />
                {
                    overlaySquares.map((square,i) => {
                        return <OverlaySquares key={square.name}
                                               group={square}
                                               index={i+1}
                                               onClickZoom={(i) => {
                                                   this.setState({
                                                       leafsArray:[],
                                                       overlaySquares:[]
                                                   })
                                                   this.props.onClickZoom(i,square.name);
                                               }}
                                               hidden={this.isSquareHidden(square)}
                                               onHide={(s) => this.onHideGroup(s)}
                                               level={this.props.level}
                        />
                    })
                }

            </div>
        )
    }
};

TreeMap.propTypes = {
    onContributionSelected    : PropTypes.func,
    selectedTopic             : PropTypes.object,
    onClickContributionDetails: PropTypes.func,
    onTopicsLoaded            : PropTypes.func,
    searchKeyword             : PropTypes.string,
    searchDocumentType        : PropTypes.string,
    zoom                      : PropTypes.number,
    disabledCursorEvents      : PropTypes.bool,
    onSetGroups               : PropTypes.func,
    hiddenGroups              : PropTypes.array,
    onHideGroup               : PropTypes.func,
    onClickZoom               : PropTypes.func,
    level                     : PropTypes.string
};

TreeMap.defaultProps = {
    onContributionSelected    : () => {},
    selectedTopic             : null,
    onClickContributionDetails: () => {},
    onTopicsLoaded            : () => {},
    searchKeyword             : 'idee',
    searchDocumentType        : '',
    zoom                      : 1,
    disabledCursorEvents      : false,
    onSetGroups               : () => {},
    hiddenGroups              : [],
    onHideGroup               : () => {},
    onClickZoom               : () => {},
    level                     : 'citizen'

};
export default TreeMap;
