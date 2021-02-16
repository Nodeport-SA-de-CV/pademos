import React from 'react';
import PropTypes from 'prop-types';
import NPIf from "np-if";


class NPInput extends React.Component{


    render(){
        return(
            <div className={this.props.wrapperClass}>
                <NPIf condition={this.props.label}>
                    <label for={this.props.id} className={this.props.labelClass}>{this.props.label}</label>
                </NPIf>
                <input className={this.props.inputClass}
                       type={this.props.type}
                       id={this.props.id}
                       placeholder={this.props.placeholder}
                       onChange={(e) => this.props.onChange(e)}
                       value={this.props.value}
                       disabled={this.props.disabled}
                />
                <NPIf condition={this.props.errors}>
                    <div>{this.props.errors}</div>
                </NPIf>
            </div>
        )
    }
}

export default NPInput;

NPInput.propTypes = {
    wrapperClass: PropTypes.string,
    label: PropTypes.string,
    inputClass: PropTypes.string,
    type: PropTypes.string,
    id: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    disabled: PropTypes.bool,
    labelClass: PropTypes.string,
};

NPInput.defaultProps = {
    wrapperClass: '',
    label: '',
    inputClass: '',
    type: 'text',
    id: 'input',
    placeholder: '',
    onChange: () => {},
    value: '',
    disabled: false,
    labelClass: '',

};
