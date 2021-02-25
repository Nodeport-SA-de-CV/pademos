import React from 'react';
import PropTypes from 'prop-types';
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Topic from "./Topic";
import NPIf from "np-if";
import NPElse from "np-if/src/NPElse";
import NPInput from "./NPInput";


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
                <div className={'sidebar-form-header'}>
                    <div>
                        <div><b>Neue Verbindung definieren</b></div>
                        <div className={'btn btn-tiny txt-right'}>Anweisungen <FontAwesomeIcon icon={'caret-down'}/></div>
                    </div>
                    <FontAwesomeIcon className={'icon-link'} icon={'link'}/>
                </div>
                <div className={'sidebar-form'}>
                    <label>1. Select the citizen’s contributions on the left side. </label>
                    <NPInput label={'If not on the list, add a new topic:  '}/>

                    <NPInput label={'If not on the list, add a new perspective: '}/>
                    <NPInput label={'4. Please explain the connection of the contributions to the topic'}
                             placeholder={'This contribution is related ... '}/>
                    <NPInput label={'5. Can you add some links to research resources? (optional)'}
                             placeholder={'Research about AI (www.researchgate.net/789890) '}/>
                    <NPInput label={'6. Can you propose topics for new ministry funding calls? (optional)'}
                             placeholder={'A topic to the ministry comprises ... '}/>


                </div>
                <div className={'sidebar-form-buttons'}>
                    <div className={'btn btn-burgundy'}>SAVE</div>
                    <div className={'btn btn-outline-burgundy'}onClick={() => this.props.onCancel()}>CANCEL</div>
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
