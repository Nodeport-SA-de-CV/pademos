import React from "react";
import PropTypes from "prop-types";

class MyLabel extends  React.Component{
    render(){
        return(
            <div style={{
                left:`${this.props.x}px`,
                top:`${this.props.y}px`,
                width:`${this.props.w}px`,
                height:`${this.props.h}px`,
                backgroundColor:'red',
                position:'absolute'
                }}>
                My Label
            </div>

        )
    }
}
MyLabel.propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    w: PropTypes.number,
    h: PropTypes.number,
}
MyLabel.defaultProps = {
    x : 0,
    y : 0,
    w : 0,
    h : 0,
};
export default MyLabel;
