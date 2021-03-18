import React from "react";
import PropTypes from "prop-types";
import RecreatedTile from "./plots/RecreatedTile";
import Group from "./plots/Group";
import Contribution from "./plots/Contribution";

class RecreatedTreemap extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedContributions: [],
        }
    }
    onContributionSelected(contribution) {
        let newContributions = this.state.selectedContributions;

        if (newContributions.find((c) => c._id === contribution._id)) {
            newContributions = newContributions.filter((c) => c._id !== contribution._id);
        } else {
            newContributions.push(contribution)
        }
        this.setState({
            selectedContributions: newContributions
        });
        this.props.onContributionSelected(newContributions);
    }
    isContributionSelected(contribution){
        const found =  this.state.selectedContributions.find((c) => c._id === contribution._id);
        return found !== undefined;
    }
    render(){
        return this.props.data.map((tile) =>{
            return(
                <RecreatedTile height={tile.height}
                               width={tile.width}
                               left={tile.x}
                               top={tile.y}
                               onContributionSelected={(contribution) => this.onContributionSelected(contribution)}
                               color={tile.color}
                               contribution={tile.contribution}
                               selectedTopic={this.props.selectedTopic}
                               isSelected={this.isContributionSelected(tile.contribution)}
                               onClickContributionDetails={(c) => this.props.onClickContributionDetails(c)}

                />
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

