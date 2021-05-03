import React from "react";
import PropTypes from 'prop-types';
import Linkify from 'react-linkify';
const componentDecorator = (href, text, key) => (
    <a href={href} key={key} target="_blank">
        {text}
    </a>
);
class UIQuestion extends React.Component {

    cleanQuestion(questionDirty){
        const stringArray = questionDirty.split('? ');
        const question = stringArray[0];
        return `${question}?`;
    }

    render(){
        const question = this.props.cleanQuestion ? this.cleanQuestion(this.props.question) : this.props.question;
        return(
            <div className={`ui-question ${this.props.className}`}>
                <div className={'question'}>{question}</div>
                <div className={'answer'}>
                    <Linkify componentDecorator={componentDecorator} >{this.props.answer}</Linkify>
                </div>
            </div>
        )
    }
}
UIQuestion.propTypes = {
    question        : PropTypes.string,
    answer          : PropTypes.string,
    className       : PropTypes.string,
    cleanQuestion   : PropTypes.string
};

UIQuestion.defaultProps = {
    question        : '',
    answer          : '',
    className       : '',
    cleanQuestion   : true

};
export default UIQuestion;
