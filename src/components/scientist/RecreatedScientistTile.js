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

    render(){
        const styleTile = {
            width:this.props.width,
            height:this.props.height,
            left: this.props.left,
            top:this.props.top,
            backgroundColor: this.props.contribution.isDisabled ? 'gray' : this.props.color,
            border:  '',
            boxShadow: '',
            color: this.props.contribution.isDisabled ? 'rgb(66, 66, 66)' : '#01080D'
        }
        let contribution = this.props.contribution;
        contribution.color = this.props.color;
        return (
            <div className={`recreated-tile`} style={styleTile}>

            </div>
        )
    }
}
RecreatedScientistTile.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    left: PropTypes.number,
    top: PropTypes.number,
    contribution: PropTypes.object,
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
    contribution:{},
    isSelected: false,
    selectedTopic: {},
};
export default RecreatedScientistTile;


