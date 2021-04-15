import React from "react";
import PropTypes from "prop-types";
import RecreatedScientistTile from "./RecreatedScientistTile";

class RecreatedScientistTreemap extends React.Component {
    constructor() {
        super();
        this.state = {
        }
    }

    render(){
        return this.props.data.map((tile) =>{
            return(
                <RecreatedScientistTile key={tile.tileData.id} height={tile.height}
                               width={tile.width}
                               left={tile.x}
                               top={tile.y}
                               color={tile.color}
                               tileData={tile.tileData}
                               widthTreemap={this.props.widthTreemap}
                               heightTreemap={this.props.heightTreemap}

                />
            )
        })
    }
}
RecreatedScientistTreemap.propTypes = {
    data: PropTypes.array,
};

RecreatedScientistTreemap.defaultProps = {
    data: [],
};
export default RecreatedScientistTreemap;

