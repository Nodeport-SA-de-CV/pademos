import React from 'react';
import PropTypes from 'prop-types';
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Topic from "./Topic";
import NPIf from "np-if";
import NPElse from "np-if/src/NPElse";


class Sidebar extends React.Component{
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
            <NPIf condition={!this.state.showConnectionForm}>
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
                        <Topic title={'Diversity ...'} color={'burgundy'} icon={'arrow-up'}/>
                        <Topic title={'Explainability of ...'} color={'military'} icon={'chalkboard'}/>
                        <Topic title={'Privacy ...'} color={'dark-gray'} icon={'lock'}/>
                        <Topic title={'Topic 4'} />
                        <Topic title={'Topic 5'} />
                        <Topic title={'Topic 6'} />
                        <Topic title={'Topic 7'} />
                    </div>
                    <Form>
                        <Form.Check id="sidebar-checkbox"
                                    type="checkbox"
                                    label="alle definierten Verbindungen von Beiträgen zu Forschungsthemen anzeigen" />
                    </Form>
                </div>
                <NPElse>
                    form
                </NPElse>
            </NPIf>

        )
    }
}

export default Sidebar;

Sidebar.propTypes = {

};

Sidebar.defaultProps = {

};
