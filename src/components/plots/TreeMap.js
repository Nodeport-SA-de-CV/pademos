import React from "react";
import * as d3 from "d3";
import {Col, Row, Container} from "react-bootstrap";
import ReactResizeDetector from 'react-resize-detector';
const data =
          {"children":[{"name":"topic 1","children":[{"name":"mister_a","group":"A","value":28,"colname":"level3"},{"name":"mister_b","group":"A","value":19,"colname":"level3"},{"name":"mister_c","group":"C","value":18,"colname":"level3"},{"name":"mister_d","group":"C","value":19,"colname":"level3"}],"colname":"level2"},{"name":"topic 2","children":[{"name":"mister_e","group":"C","value":14,"colname":"level3"},{"name":"mister_f","group":"A","value":11,"colname":"level3"},{"name":"mister_g","group":"B","value":15,"colname":"level3"},{"name":"mister_h","group":"B","value":16,"colname":"level3"}],"colname":"level2"},{"name":"topic 3","children":[{"name":"mister_i","group":"B","value":10,"colname":"level3"},{"name":"mister_j","group":"A","value":13,"colname":"level3"},{"name":"mister_k","group":"A","value":13,"colname":"level3"},{"name":"mister_l","group":"D","value":25,"colname":"level3"},{"name":"mister_m","group":"D","value":16,"colname":"level3"},{"name":"mister_n","group":"D","value":28,"colname":"level3"}],"colname":"level2"}],"name":"CEO"};
class TreeMap extends React.Component {

    constructor(props) {
        super(props);
        this.state     = {d3: ''}
        this.drawChart = this.drawChart.bind(this);
    }

    componentDidMount() {
    }
    onResize(w,h){
        this.drawChart(w,h);
    }
    drawChart(w,h) {
        // clear all
        d3.select("#treemap").selectAll("*").remove()
        // append the svg object to the body of the page

        // set the dimensions and margins of the graph
        var margin = {top: 10, right: 10, bottom: 10, left: 10},
            width = w - margin.left - margin.right,
            height = h - margin.top - margin.bottom;

// append the svg object to the body of the page
        var svg = d3.select("#treemap")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

// read json data

            // Give the data to this cluster layout:
            var root = d3.hierarchy(data).sum(function(d){ return d.value}) // Here the size of each leave is given in the 'value' field in input data

            // Then d3.treemap computes the position of each element of the hierarchy
            d3.treemap()
                .size([width, height])
                .paddingTop(5)
                .paddingRight(5)
                .paddingInner(3)      // Padding between each rectangle
                //.paddingOuter(6)
                //.padding(20)
                (root)

            // prepare a color scale
            var color = d3.scaleOrdinal()
                .domain(["topic 1", "topic 2", "topic 3"])
                .range([ "#402D54", "#D18975", "#8FD175"])

            // And a opacity scale
            var opacity = d3.scaleLinear()
                .domain([10, 30])
                .range([.5,1])

            // use this information to add rectangles:
            svg
                .selectAll("rect")
                .data(root.leaves())
                .enter()
                .append("rect")
                .attr('x', function (d) { return d.x0; })
                .attr('y', function (d) { return d.y0; })
                .attr('width', function (d) { return d.x1 - d.x0; })
                .attr('height', function (d) { return d.y1 - d.y0; })
                .style("stroke", "black")
                .style("fill", function(d){ return color(d.parent.data.name)} )
                .style("opacity", function(d){ return opacity(d.data.value)})

            // and to add the text labels
            svg
                .selectAll("text")
                .data(root.leaves())
                .enter()
                .append("text")
                .attr("x", function(d){ return d.x0+5})    // +10 to adjust position (more right)
                .attr("y", function(d){ return d.y0+20})    // +20 to adjust position (lower)
                .text(function(d){ return d.data.name.replace('mister_','') })
                .attr("font-size", "19px")
                .attr("fill", "white")

            // and to add the text labels
            svg
                .selectAll("vals")
                .data(root.leaves())
                .enter()
                .append("text")
                .attr("x", function(d){ return d.x0+5})    // +10 to adjust position (more right)
                .attr("y", function(d){ return d.y0+35})    // +20 to adjust position (lower)
                .text(function(d){ return d.data.value })
                .attr("font-size", "11px")
                .attr("fill", "white")

            // Add title for the 3 groups
            svg
                .selectAll("titles")
                .data(root.descendants().filter(function(d){return d.depth==1}))
                .enter()
                .append("text")
                .attr("x", function(d){
                    const x = (d.x1 - d.x0) / 2;
                    return x + d.x0;
                })
                .attr("y", function(d){
                    const y = (d.y1 - d.y0) / 2;
                    return y + d.y0;
                })
                .text(function(d){ return d.data.name })
                .attr("font-size", "32px")
                .attr("fill",  'white' )
                .attr("text-anchor","middle")


            // Add title for the 3 groups
            // svg
            //     .append("text")
            //     .attr("x", 0)
            //     .attr("y", 14)    // +20 to adjust position (lower)
            //     .text("Three group leaders and 14 employees")
            //     .attr("font-size", "19px")
            //     .attr("fill",  "grey" )
    }

    render() {
        return (
            <div id={"treemap"} ref={(ref) => this.treeMapDiv = ref}>
                <ReactResizeDetector handleWidth handleHeight onResize={(w,h) => this.drawChart(w,h)}>
                </ReactResizeDetector>
            </div>
        )
    }
};
export default TreeMap;
