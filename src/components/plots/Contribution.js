import React from "react";
import PropTypes from 'prop-types';
class Contribution extends React.Component {

    constructor(props) {
        super(props);
        this.state     = {}
    }

    componentDidMount() {
    }
    render(){
        return(
            <div className={`contribution ${this.props.index}`}>
                {this.props.index} - {this.props.contribution.document_what}
            </div>
        )
    }
}
Contribution.propTypes = {
    contribution : PropTypes.object
};

Contribution.defaultProps = {
    contribution : {}

};
export default Contribution;
