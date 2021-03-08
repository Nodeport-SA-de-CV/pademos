import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NPIf from "np-if";
import API from "../lib/api/API";



class Topic extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        }
        this.onClickHelp = this.onClickHelp.bind(this);
    }

    onClickHelp(){
        console.log('help clicked');
    }

    render(){
        return(
            <div className={`topic ${this.props.className}`} style={{backgroundColor:this.props.color}}
                 onClick={() => this.props.onClick()}>
                {this.props.title}
                {/*{JSON.stringify(this.props.topic)}*/}
                <img src={`${API.API_URL}/icons/${this.props.icon}`} height={20}></img>
            </div>
        )
    }
}

export default Topic;

Topic.propTypes = {
    topic: PropTypes.object,
    title: PropTypes.string,
    icon: PropTypes.string,
    color: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func
};

Topic.defaultProps = {
    topic: {},
    title: '',
    icon: '',
    color:'burgundy',
    className: '',
    onClick: () => {}
};
