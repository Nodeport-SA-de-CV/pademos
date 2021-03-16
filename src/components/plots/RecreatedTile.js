import React from "react";
import PropTypes from "prop-types";

class RecreatedTile extends React.Component {
    render(){
        return (
            <div style={{
                position:"absolute",
                width:this.props.width,
                height:this.props.height,
                left: this.props.left,
                top:this.props.top,
                backgroundColor:this.props.color
            }} className={'recreated-tile'}>
               
            </div>
        )
    }
}
RecreatedTile.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number,
    contribution: PropTypes.object
};

RecreatedTile.defaultProps = {
    width: 0,
    height: 0,
    left: 0,
    top: 0,
    contribution:{}
};
export default RecreatedTile;


