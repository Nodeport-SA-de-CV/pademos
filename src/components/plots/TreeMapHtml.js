import React from "react";
import API from "../../lib/api/API";
import NPIf from "np-if";
import Contribution from "./Contribution";
import Group from "./Group";
class TreeMapHtml extends React.Component {

    constructor(props) {
        super(props);
        this.state     = {d3: '', data: null}
        this.svg       = null;
        this.search    = this.search.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }
    search(value){
        var search = new RegExp(value , 'i');
        // console.log(this.state.data)
        const data = this.state.topics.filter((t) =>{
            // search in all contributions
            t = t.contributions.map((contribution) =>{
                contribution.isDisabled = ! search.test(contribution.document_what);
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

        return(
            <div className={'groups'} >
                {
                    data.map((group,index   ) =>{
                        return(
                            <Group group={group}  key={index}>
                            </Group>
                        )

                    })
                }
            </div>
        )
    }
}
export default TreeMapHtml;
