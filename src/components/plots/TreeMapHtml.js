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
    }

    componentDidMount() {
        this.loadData();
    }
    loadData(){
        API.getContributions().then((contributions) =>{
            if(contributions.success){
                this.setState({
                    data:contributions.contributions
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
        const keys = Object.keys(this.state.data);
        return(
            <div className={'groups'} >
                    {
                        keys.map((key,index   ) =>{
                            return(
                                <Group group={data[key]} title={key} key={index}>

                                </Group>
                            )

                        })
                    }
            </div>
        )
    }
}
export default TreeMapHtml;
