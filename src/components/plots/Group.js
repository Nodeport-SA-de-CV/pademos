import React from "react";
import PropTypes from 'prop-types';
import Contribution from "./Contribution";
class Group extends React.Component {

    constructor(props) {
        super(props);
        this.state     = {}
    }

    componentDidMount() {
    }
    render(){
        var randomColor = Math.floor(Math.random()*16777215).toString(16);
        return(
            <div style={{backgroundColor:"#" +randomColor}}>
                {this.props.title}
                <div className={'group-container'} >
                    {
                        this.props.group.map((contribution,index   ) =>{
                            return(
                                <Contribution contribution={contribution} key={index} index={index}>

                                </Contribution>
                            )

                        })
                    }
                </div>
            </div>
        )
    }
}
Group.propTypes = {
    group : PropTypes.array,
    title : PropTypes.string,
};

Group.defaultProps = {
    group : [],
    title : 'Title'

};
export default Group;
