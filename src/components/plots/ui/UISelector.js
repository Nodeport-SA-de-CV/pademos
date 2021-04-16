import React from "react";
import PropTypes from 'prop-types';
import NPIf from "np-if";


class UISelector extends React.Component {

    render(){
        return(
            <div className={'ui-selector'}
                 style={this.props.style}
                 onClick={(event) => {
                     event.stopPropagation();
                     this.props.onClick(this.props.isSelected)
                 }}>
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
