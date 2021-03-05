import React from "react";
import API from "../../lib/api/API";
import NPIf from "np-if";
import Contribution from "./Contribution";
import Group from "./Group";
import PropTypes from "prop-types";
import Sidebar from "../Sidebar";
class TreeMapHtml extends React.Component {

    constructor(props) {
        super(props);
        this.state     = {
            d3: '',
            data: null,
            selectedContributions: []
        }
        this.svg       = null;
        this.search    = this.search.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    onContributionSelected(contribution){
        let newContributions = this.state.selectedContributions;

        if(newContributions.find((c) => c._id === contribution._id)){
            newContributions = newContributions.filter((c) => c._id !== contribution._id);
        }else{
            newContributions.push(contribution)
        }
        this.setState({
            selectedContributions:newContributions
        });
        this.props.onContributionSelected(newContributions);
    }
    search(value){
        var search = new RegExp(value , 'i');
        // console.log(this.state.data)
        const data = this.state.topics.filter((t) =>{
            // search in all contributions
            t = t.contributions.map((contribution) =>{
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
            data:data
        })

    }
    loadData(){
        API.getContributions().then((res) =>{
            if(res.success){
                this.props.onTopicsLoaded(res.topics);
                this.setState({
                    data:res.topics,
                    topics:res.topics
                }, () =>{
                })
            }
        })
    }
    render(){
        if(this.state.data === null){
            return null;
        }
        const data = this.state.data;
        // translate(${this.props.x}px,${this.props.y}px`
        const translate = `translate3d(${this.props.translateX}px,${this.props.translateY}px,1px)`;
        // console.log(` translate(${this.props.X}px,${this.props.Y}px)`);
        const rect  = this.treeMapHTMLRef ? this.treeMapHTMLRef.getBoundingClientRect() : null;
        // const offsetLeft = this.treeMapHTMLRef ? this.treeMapHTMLRef.offsetLeft : 0;
        // if(rect){
        //     console.log(rect.x,rect.y)
        // }
        return(
            <div className={'groups noselect'}  style={{transform:`scale(${this.props.zoom}) ${translate}`}}
                 ref={(ref) => this.treeMapHTMLRef = ref}
                 onMouseOver={(e) =>{
                     e.stopPropagation();
                 }}
            >
                    {
                        data.map((group,index   ) =>{
                            return(
                                <Group group={group}  key={index} selectedTopic={this.props.selectedTopic}
                                       style={{
                                           transition: !this.props.isDragging ? 'all .2s ease-out' : ''
                                       }}
                                       isDragging={this.props.isDragging}
                                       selectedContributions={this.state.selectedContributions}
                                       onContributionSelected={(contribution) => this.onContributionSelected(contribution)}
                                       onClickContributionDetails={(contribution) => this.props.onClickContributionDetails(contribution)}>
                                </Group>
                            )
                    })
                }
            </div>
        )
    }
}

TreeMapHtml.propTypes = {
    onContributionSelected      : PropTypes.func,
    selectedTopic               : PropTypes.object,
    onClickContributionDetails  : PropTypes.func,
    onTopicsLoaded              : PropTypes.func,
    searchKeyword               : PropTypes.string,
    searchDocumentType          : PropTypes.string,
    zoom                        : PropTypes.number
};

TreeMapHtml.defaultProps = {
    onContributionSelected      : () => {},
    selectedTopic               : null,
    onClickContributionDetails  : () => {},
    onTopicsLoaded              : () => {},
    searchKeyword               : 'idee',
    searchDocumentType          : '',
    zoom                        : 1
};
export default TreeMapHtml;


