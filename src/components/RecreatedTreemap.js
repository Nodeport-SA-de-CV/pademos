import React from "react";
import PropTypes from "prop-types";
import RecreatedTile from "./plots/RecreatedTile";

class RecreatedTreemap extends React.Component {
    render(){
        return this.props.data.map((tile) =>{
            return(
                <RecreatedTile height={tile.height} width={tile.width} left={tile.x} top={tile.y}
                               color={tile.color} contribution={tile.contribution}
                               selectedTopic={this.props.selectedTopic}
                ></RecreatedTile>
            )
        })
    }
}
RecreatedTreemap.propTypes = {
    data: PropTypes.array
};

RecreatedTreemap.defaultProps = {
    data: []
};
export default RecreatedTreemap;

