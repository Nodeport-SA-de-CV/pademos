import React from "react";
import PropTypes from "prop-types";

class PerspectiveTile extends React.Component {
    render(){
        return (
            <div className={`perspective-tile`} >
                Perspektive: {this.props.perspective.perspective}
            </div>
        )
    }
}
PerspectiveTile.propTypes = {
    perspective: PropTypes.object,
};

PerspectiveTile.defaultProps = {
    perspective:{},
};
export default PerspectiveTile;


