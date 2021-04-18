import React from 'react';
import PropTypes from 'prop-types';
import NPIf from "np-if";
import NPElse from "np-if/src/NPElse";


class NPInput extends React.Component{


    render(){
        return(
            <div className={this.props.wrapperClass}>
                <NPIf condition={this.props.label}>
                    <label for={this.props.id} className={this.props.labelClass}>{this.props.label}</label>
                </NPIf>
                <NPIf condition={this.props.type !== 'text-area'}>
                    <input className={this.props.inputClass}
                           type={this.props.type}
                           id={this.props.id}
                           placeholder={this.props.placeholder}
                           onChange={(e) => this.props.onChange(e)}
                           value={this.props.value}
                           disabled={this.props.disabled}
                           onKeyDown={(c) => this.props.onKeyDown(c)}

                    />
                    <NPElse>
                        <textarea className={this.props.inputClass}
                                id={this.props.id}
                                placeholder={this.props.placeholder}
                                onChange={(e) => this.props.onChange(e)}
                                value={this.props.value}
                                disabled={this.props.disabled}
                                rows={this.props.rows}>
                                onKeyDown={(c) => this.props.onKeyDown(c)}

                        </textarea>
                    </NPElse>
                </NPIf>
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
    rows: PropTypes.number,
    onKeyDown: PropTypes.func

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
    rows: 3,
    onKeyDown: () => {},

};
