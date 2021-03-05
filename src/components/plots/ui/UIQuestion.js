import React from "react";
import PropTypes from 'prop-types';

class UIQuestion extends React.Component {

    render(){
        return(
            <div className={`ui-question ${this.props.className}`}>
                <div className={'question'}>{this.props.question}</div>
                <div className={'answer'}>{this.props.answer}</div>
            </div>
        )
    }
}
UIQuestion.propTypes = {
    question        : PropTypes.string,
    answer          : PropTypes.string,
    className       : PropTypes.string,
};

UIQuestion.defaultProps = {
    question        : '',
    answer          : '',
    className       : '',
};
export default UIQuestion;
