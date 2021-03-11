import React from "react";
import API from "../../lib/api/API";
import NPIf from "np-if";
import Contribution from "./Contribution";
import Group from "./Group";
import PropTypes from "prop-types";
import Sidebar from "../Sidebar";
import NPElse from "np-if/src/NPElse";
import {Spinner} from "react-bootstrap";


// const worst = (row,w) => {
//     // return Math.max(row.map((c) => {
//     //     return c ? c.weight : 0;
//     // }));
// }
class TreeMapHtml extends React.Component {
    usedWidth = 0;
    constructor(props) {
        super(props);
        this.state  = {
            d3: '',
            data: null,
            selectedContributions: [],
            spinnerColor:'#1A87D7'
        }
        this.svg    = null;
        this.search = this.search.bind(this);
        this.buildTree = this.buildTree.bind(this);
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
    }

    componentDidMount() {
        this.loadData();
    }

    onContributionSelected(contribution) {
        let newContributions = this.state.selectedContributions;

        if (newContributions.find((c) => c._id === contribution._id)) {
            newContributions = newContributions.filter((c) => c._id !== contribution._id);
        } else {
            newContributions.push(contribution)
        }
        this.setState({
            selectedContributions: newContributions
        });
        this.props.onContributionSelected(newContributions);
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
        this.setState({
            data: data
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
    loadData() {
        this.setState({isLoading: true})
        this.changeColors();
        API.getContributions().then((res) => {
            if (res.success) {
                this.props.onTopicsLoaded(res.topics);
                this.setState({
                    data: res.topics,
                    dataTree:this.buildTree(res.topics),
                    topics: res.topics,
                    isLoading: false
                }, () => {
                    const tree = this.buildTree(res.topics);
                    this.squarify(tree.children,[],this.width())
                });
                clearInterval(this.colorsInterval);
            }
        })
    }
    buildTree(groups){
        const area = this.treeMapHTMLRef.clientWidth * this.treeMapHTMLRef.clientHeight;

        // let areas = row.map((square) =>{
        //     let areaPx = (square.weight * area) / 100;
            // return areaPx;
        // })
        // console.log(areas)

        const tree = {
            children:groups.sort((g,g1) => g1.contributions.length - g.contributions.length).map((g) =>{
                const groupWeight = (g.contributions.length * area) / 100;
                return{
                    data:g,
                    weight: groupWeight,
                    children:g.contributions.map((c) =>{
                        return{
                            data:c,
                            weight:groupWeight / g.contributions.length,
                            children:[]
                        }
                    })
                }
            })
        }
        return tree;
    }
    layoutRow(row){
        console.log(row)
        // this.usedWidth = 300;
        // TODO: draw row, decrease remaining space
        return true;
    }
    worst(row,w){
        let sumArea = row.map((e) => e.weight).reduce((a,v) => a+v,0);
        let maxArea = Math.max(row.map((e) => e.weight));
        let minArea = Math.min(row.map((e) => e.weight));

        let a = w * w * maxArea / sumArea * sumArea;
        let b = sumArea * sumArea / w * w * minArea;
        console.log('a',a,'b',b)
        return Math.max(a,b);
    }
    width(){
        return this.treeMapHTMLRef.clientWidth - this.usedWidth;
    }
    squarify(children,row,w){
        console.log('w',w)
        // width : Length of the shortest side of the remaining area
        // layoutrow: Returns a list of children to be drawn (passed to row)
        if(!children){
            return true; // stop condition
        }
        const child = children[0];
        const tail  = children[children.length - 1];

        if(this.worst(row,w) <= this.worst(row.concat([child]),w)){
            this.squarify(tail.children,row.concat([child]),w);
        }else{
            this.layoutRow(row);
            this.squarify(children.children,[],this.width());
        }
    }
    render() {
        // if (this.state.data === null || this.state.isLoading) {
        //     return(
        //         <Spinner animation={'grow'} style={{width:200,height:200,backgroundColor:this.state.spinnerColor}}></Spinner>
        //     )
        // }
        const data      = this.state.data || [];
        // translate(${this.props.x}px,${this.props.y}px`
        const translate = `translate3d(${this.props.translateX}px,${this.props.translateY}px,1px)`;
        // console.log(` translate(${this.props.X}px,${this.props.Y}px)`);
        const rect      = this.treeMapHTMLRef ? this.treeMapHTMLRef.getBoundingClientRect() : null;
        // const offsetLeft = this.treeMapHTMLRef ? this.treeMapHTMLRef.offsetLeft : 0;
        // if(rect){
        //     console.log(rect.x,rect.y)
        // }
        const totalContributions = data.map((groups) => groups.contributions.length).reduce((a,v) => a+v,0);
        return(
            <div className={'groups noselect'}  style={{
                transform:`scale(${this.props.zoom}) ${translate}`,
            }}
                 ref={(ref) => this.treeMapHTMLRef = ref}
                 onMouseOver={(e) =>{
                     e.stopPropagation();
                 }}
            >
                {
                    data.map((group, index) => {
                        return(
                            <div style={{
                                backgroundColor:group.color,
                                width:`${(group.contributions.length / totalContributions) * 100}%`
                            }}> {group.contributions.length} { (group.contributions.length / totalContributions) * 100}</div>
                        )
                    })
                }
                {/*    {*/}
                {/*        data.map((group,index   ) =>{*/}
                {/*            return(*/}
                {/*                <Group group={group}  key={index} selectedTopic={this.props.selectedTopic}*/}
                {/*                       style={{*/}
                {/*                           transition: !this.props.isDragging ? 'all .2s ease-out' : ''*/}
                {/*                       }}*/}
                {/*                       isDragging={this.props.isDragging}*/}
                {/*                       selectedContributions={this.state.selectedContributions}*/}
                {/*                       onContributionSelected={(contribution) => this.onContributionSelected(contribution)}*/}
                {/*                       onClickContributionDetails={(contribution) => this.props.onClickContributionDetails(contribution)}>*/}
                {/*                </Group>*/}
                {/*            )*/}
                {/*    })*/}
                {/*}*/}
            </div>
        )
    }
}

TreeMapHtml.propTypes = {
    onContributionSelected: PropTypes.func,
    selectedTopic: PropTypes.object,
    onClickContributionDetails: PropTypes.func,
    onTopicsLoaded: PropTypes.func,
    searchKeyword: PropTypes.string,
    searchDocumentType: PropTypes.string,
    zoom: PropTypes.number
};

TreeMapHtml.defaultProps = {
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
export default TreeMapHtml;


