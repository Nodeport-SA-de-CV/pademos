import React from "react";
import PropTypes from "prop-types";
import RecreatedTreemap from "../RecreatedTreemap";

class OverlaySquares extends React.Component {

    constructor(props) {
        super(props);
        this.state     = {
            // data:[],
        }
        // this.loadData       = this.loadData.bind(this);
    }



    render(){
        const group = this.props.group;
        const  style = {
            position:'absolute',
            left: group.x0,
            width: group.x1 - group.x0 - 2, //2 is the padding(white gutter)
            top: group.y0,
            height: group.y1 - group.y0,
            backgroundColor:group.color,
        }
        return(
            <div className={'OverlaySquares'} style={style}>{group.name}</div>
        )
    }
}
export default OverlaySquares;

OverlaySquares.propTypes = {
    group: PropTypes.object
};

OverlaySquares.defaultProps = {
    group: {}
};

