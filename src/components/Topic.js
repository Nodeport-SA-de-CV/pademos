import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NPIf from "np-if";



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
            <div className={`topic ${this.props.color} ${this.props.className}`}>
                {this.props.title}
                <NPIf condition={this.props.icon !== ''}>
                    <FontAwesomeIcon className={`icon-${this.props.color}`} icon={this.props.icon}/>
                </NPIf>
            </div>
        )
    }
}

export default Topic;

Topic.propTypes = {
    title: PropTypes.string,
    icon: PropTypes.string,
    color: PropTypes.string,
    className: PropTypes.string
};

Topic.defaultProps = {
    title: '',
    icon: '',
    color:'burgundy',
    className: ''
};
