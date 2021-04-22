import React from "react";
import PropTypes from "prop-types";
import PerspectiveTile from "./PerspectiveTile";
import ContributionTile from "./ContributionTile";
import ConnectionTile from "./ConnectionTile";

class RecreatedScientistTile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    renderContent(){
        const data = this.props.tileData;
        switch (this.props.level) {
            case 'perspective':
                return(
                    <ContributionTile contribution={data} index={this.props.index}/>
                )
                break;
            case 'contribution':
                return(
                    <ConnectionTile connection={data}  index={this.props.index}/>
                )
                break;
            default:
                return(
                    <PerspectiveTile perspective={data} index={this.props.index}/>
                )
        }
    }

    render(){
        let background = this.props.tileData.isDisabled ? 'gray' : this.props.color;

        if(this.props.level === 'scientist' || this.props.level === 'theme'){
            if(this.props.filterLinks){
                let parentHasLinks = !! this.props.tileData.links;
                // let childrenHasLinks = topic.children.map((child) => !!child.links).includes(true);
                background = parentHasLinks ? background :'gray'
            }
            if(this.props.filterFinancing){
                let parentHasFinancing = !! this.props.tileData.proposed_topics;
                // let childrenHasFinancing = topic.children.map((child) => !!child.proposed_topics).includes(true);
                background = parentHasFinancing ? background :'gray'
            }
        }



        const styleTile = {
            width:this.props.width - 2, //padding to show the gutter
            height:this.props.height -2,
            left: this.props.left + 1,
            top:this.props.top + 1 ,
            backgroundColor: background,
            border:  this.props.isSelected ? `10px solid ${this.props.borderColor}` : '',
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
    onClickTile: PropTypes.func,
    index: PropTypes.number,
    borderColor:PropTypes.string,
    filterLinks:PropTypes.bool,
    filterFinancing:PropTypes.bool
};

RecreatedScientistTile.defaultProps = {
    width: 0,
    height: 0,
    left: 0,
    top: 0,
    tileData:{},
    isSelected: false,
    selectedTopic: {},
    onClickTile: () => {},
    index: 0,
    borderColor:'',
    filterLinks:false,
    filterFinancing:false
};
export default RecreatedScientistTile;


