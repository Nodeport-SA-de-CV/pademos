import React from "react";
import PropTypes from "prop-types";
import RecreatedScientistTile from "./RecreatedScientistTile";

const _ = require('underscore');

class RecreatedScientistTreemap extends React.Component {
    render() {
        return this.props.data.map((tile, index) => {
            let topic_labels = [];
            let isSelected   = false;
            let borderColor  = '';
            if (this.props.selectedGroups && tile.tileData.contributions) {
                topic_labels       = tile.tileData.contributions.map((c) => c.topic_label);
                const intersection = _.intersection(this.props.selectedGroups.map((s) => s.name), topic_labels);
                isSelected         = intersection.length > 0;
                borderColor        = isSelected ? this.props.selectedGroups.find((g) => g.name === intersection[0]).color : ''
            }


            return (
                <RecreatedScientistTile key={tile.tileData.id}
                                        height={tile.height}
                                        width={tile.width}
                                        left={tile.x}
                                        top={tile.y}
                                        color={tile.color}
                                        tileData={tile.tileData}
                                        widthTreemap={this.props.widthTreemap}
                                        heightTreemap={this.props.heightTreemap}
                                        onClickTile={() => {
                                            this.props.onClickTile(tile, index)
                                        }}
                                        level={this.props.level}
                                        index={index}
                                        isSelected={isSelected}
                                        borderColor={borderColor}
                                        filterLinks={this.props.filterLinks}
                                        filterFinancing={this.props.filterFinancing}
                                        selectedTheme={this.props.selectedTheme}
                />
            )
        })
    }
}

RecreatedScientistTreemap.propTypes = {
    data: PropTypes.array,
    onClickTile: PropTypes.func,
    level: PropTypes.string,
    selectedGroups: PropTypes.array,
    filterLinks: PropTypes.bool,
    filterFinancing: PropTypes.bool,
    selectedTheme: PropTypes.func

};

RecreatedScientistTreemap.defaultProps = {
    data: [],
    onClickTile: () => {
    },
    level: '',
    selectedGroups: [],
    filterLinks: false,
    filterFinancing: false,
    selectedTheme: {}


};
export default RecreatedScientistTreemap;

