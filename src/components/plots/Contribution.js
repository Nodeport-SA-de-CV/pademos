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
        const bgColor = this.props.contribution.isDisabled ? 'gray' : this.props.bgColor;
        return(
            <div className={`contribution ${this.props.index}`} style={{backgroundColor:bgColor}}>
                {this.props.index} - {this.props.contribution.document_what}
            </div>
        )
    }
}
Contribution.propTypes = {
    contribution    : PropTypes.object,
    bgColor         : PropTypes.string
};

Contribution.defaultProps = {
    contribution    : {},
    bgColor         : '#1A87D7'

};
export default Contribution;
