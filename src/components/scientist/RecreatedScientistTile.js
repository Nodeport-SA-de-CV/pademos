import React from "react";
import PropTypes from "prop-types";
import PerspectiveTile from "./PerspectiveTile";
import RecreatedTile from "../plots/RecreatedTile";
import ContributionTile from "./ContributionTile";

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
        switch (this.props.level) {
            case 'perspective':
                return(
                    <ContributionTile contribution={data}/>
                )
                break;
            case 'contribution':
                return(
                    <div>contribution</div>
                )
                break;
            default:
                return(
                    <PerspectiveTile perspective={data}/>
                )
        }
    }

    render(){
        const styleTile = {
            width:this.props.width - 2, //padding to show the gutter
            height:this.props.height -2,
            left: this.props.left + 1,
            top:this.props.top + 1 ,
            backgroundColor: this.props.tileData.isDisabled ? 'gray' : this.props.color,
            border:  '',
            boxShadow: '',
            color: this.props.tileData.isDisabled ? 'rgb(66, 66, 66)' : 'white'
        }
        let tileData = this.props.tileData;
        tileData.color = this.props.color;
        return (
            <div className={`recreated-scientist-tile`}
                 style={styleTile}
                 onClick={this.props.onClickTile}>
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
    onClickTile: PropTypes.func
};

RecreatedScientistTile.defaultProps = {
    width: 0,
    height: 0,
    left: 0,
    top: 0,
    tileData:{},
    isSelected: false,
    selectedTopic: {},
    onClickTile: () => {}
};
export default RecreatedScientistTile;


