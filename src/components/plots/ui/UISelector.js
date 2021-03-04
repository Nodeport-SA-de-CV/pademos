import React from "react";
import PropTypes from 'prop-types';
import NPIf from "np-if";
import NPElse from "np-if/src/NPElse";
class UISelector extends React.Component {

    constructor(props) {
        super(props);
        this.state     = {}
    }

    componentDidMount() {
    }
    render(){
        return(
            <div className={'ui-selector'} style={this.props.style} onClick={() => this.props.onClick(this.props.isSelected)}>
                <NPIf condition={this.props.isSelected}>
                    ✔
                </NPIf>
            </div>
        )
    }
}
UISelector.propTypes = {
    isSelected      : PropTypes.bool,
    style           : PropTypes.object,
    onClick         : PropTypes.func,
};

UISelector.defaultProps = {
    isSelected      : false,
    style           : {},
    onClick       : () => {}

};
export default UISelector;
