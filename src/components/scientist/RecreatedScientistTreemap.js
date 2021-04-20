import React from "react";
import PropTypes from "prop-types";
import RecreatedScientistTile from "./RecreatedScientistTile";

class RecreatedScientistTreemap extends React.Component {
    render(){
        return this.props.data.map((tile,index) =>{
            return(
                <RecreatedScientistTile key={tile.tileData.id}
                                        height={tile.height}
                                       width={tile.width}
                                       left={tile.x}
                                       top={tile.y}
                                       color={tile.color}
                                       tileData={tile.tileData}
                                       widthTreemap={this.props.widthTreemap}
                                       heightTreemap={this.props.heightTreemap}
                                       onClickTile={() => this.props.onClickTile(tile)}
                                        level={this.props.level}
                />
            )
        })
    }
}
RecreatedScientistTreemap.propTypes = {
    data: PropTypes.array,
    onClickTile: PropTypes.func,
    level: PropTypes.string
};

RecreatedScientistTreemap.defaultProps = {
    data: [],
    onClickTile: () => {},
    level: ''
};
export default RecreatedScientistTreemap;

