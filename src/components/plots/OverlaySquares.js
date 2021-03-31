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
            <div className={'overlay-squares'} style={style}>
                <div className={'os-row flex-wrap'}>
                    <div className={'mr-4'}>Group</div>
                    <div>{group.name}</div>
                </div>
                <div className={'os-row align-self-end'} style={{color:'black'}}>
                    <div>Anzahl der Beiträge</div>
                    <div className={'number ml-2'}>52</div>
                </div>
            </div>
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

