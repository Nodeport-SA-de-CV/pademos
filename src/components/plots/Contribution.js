import React from "react";
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Icon1 from '../../img/icon1.png';
import Icon2 from '../../img/icon2.png';
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
                <div className={'c-title mb-auto mt-auto'}>{this.props.contribution.document_what}</div>
                <div className={'c-wrapper-icons'}>
                    <img className={'c-icon'} src={Icon1}/>
                    <img className={'c-icon'} src={Icon2}/>

                </div>
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
