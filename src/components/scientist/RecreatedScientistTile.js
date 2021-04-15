import React from "react";
import PropTypes from "prop-types";

class RecreatedScientistTile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
    }

    renderContent(){
        const data = this.props.tileData;
        return(
            <div>{data.perspective}</div>
        )
    }

    render(){
        const styleTile = {
            width:this.props.width,
            height:this.props.height,
            left: this.props.left,
            top:this.props.top,
            backgroundColor: this.props.tileData.isDisabled ? 'gray' : this.props.color,
            border:  '',
            boxShadow: '',
            color: this.props.tileData.isDisabled ? 'rgb(66, 66, 66)' : 'white'
        }
        let tileData = this.props.tileData;
        tileData.color = this.props.color;
        return (
            <div className={`recreated-scientist-tile`} style={styleTile}>
                {this.renderContent()}
            </div>
        )
    }
}
RecreatedScientistTile.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    left: PropTypes.number,
    top: PropTypes.number,
    tileData: PropTypes.object,
    isSelected: PropTypes.bool,
    selectedTopic: PropTypes.object,
    widthTreemap: PropTypes.number,
    heightTreemap: PropTypes.number,
};

RecreatedScientistTile.defaultProps = {
    width: 0,
    height: 0,
    left: 0,
    top: 0,
    tileData:{},
    isSelected: false,
    selectedTopic: {},
};
export default RecreatedScientistTile;


