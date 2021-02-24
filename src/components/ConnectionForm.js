import React from 'react';
import PropTypes from 'prop-types';
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Topic from "./Topic";
import NPIf from "np-if";
import NPElse from "np-if/src/NPElse";


class ConnectionForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            showConnectionForm:false
        }
        this.onClickHelp = this.onClickHelp.bind(this);
    }

    onClickHelp(){
        console.log('help clicked');
    }


    render(){
        return(
            <div className={'sidebar'}>
                <h4>Forschungsthemen</h4>
                <div className={'btn btn-tiny txt-right'}>Anweisungen <FontAwesomeIcon icon={'caret-down'}/></div>
                <div className={'sidebar-header'}>
                    <h2>12</h2>
                    <div className={'sidebar-header-row'}>
                        <div>definierte Verbindungen</div>
                        <div className={'sidebar-icon-link'}
                             onClick={() => this.setState({showConnectionForm:true})}>
                            <FontAwesomeIcon icon={'link'}/>
                        </div>
                    </div>
                    <div className={'txt-right'}>neue Verbindung zum Forschungsthema definieren</div>
                </div>
                <div className={'sidebar-content'}>

                </div>
                <div className={'sidebar-row'}>
                    <div>SAVE</div>
                    <div onClick={() => this.props.onCancel()}>CANCEL</div>
                </div>
            </div>
        )
    }
}

export default ConnectionForm;

ConnectionForm.propTypes = {
    onCancel: PropTypes.func,

};

ConnectionForm.defaultProps = {
    onCancel: () => {},
};
