import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NPInput from "./NPInput";
import API from "../lib/api/API";


class ConnectionForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            otherTopic:'',
            otherPerspective:'',
            topic:'',
            perspective:'',
            explanation:'',
            links:'',
            proposeTopics:''
        }
        this.onClickHelp = this.onClickHelp.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onClickSave = this.onClickSave.bind(this);

    }

    onClickHelp(){
        console.log('help clicked');
    }

    onClickSave(){
        const topic = {
            contributions: this.props.selectedContributions,
            topic: this.state.otherTopic,
            perspective: this.state.otherPerspective,
            connection_explanation: this.state.explanation,
            links: this.state.links,
            proposed_topics: this.state.proposeTopics,
        }
        API.postTopic(topic).then((r) =>{
            if(r.success){

            }else{

            }
        })
        this.props.onFormSaved();
    }

    onChange(e){
        this.setState({[e.target.id]:e.target.value});
    }


    render(){
        return(
            <div className={'sidebar'}>
                <div className={'sidebar-form-header'}>
                    <div>
                        <div><b>Neue Verbindung definieren</b></div>
                        <div className={'btn btn-tiny txt-right'} onClick={() => this.onClickHelp()}>Anweisungen <FontAwesomeIcon icon={'caret-down'}/></div>
                    </div>
                    <FontAwesomeIcon className={'icon-link'} icon={'link'}/>
                </div>
                <div className={'sidebar-form mt-3'}>
                    <label>1. Select the citizen’s contributions on the left side. </label>

                    {/*select */}
                    <label className={'mt-2'}>2. To which research topic can the contribution(s) be linked to? (*)  </label>
                    <select>
                        <option value={''}>Select a topic </option>
                    </select>

                    <NPInput label={'If not on the list, add a new topic:  '}
                             id={'otherTopic'}
                             onChange={(e) => this.onChange(e)}
                             value={this.state.otherTopic}
                    />

                    {/*select */}
                    <label className={'mt-2'}>3. From which perspective are you making this connection? (from a discipline or your position) (*)   </label>
                    <select>
                        <option value={''}>Select a perspective </option>
                    </select>

                    <NPInput label={'If not on the list, add a new perspective: '}
                             id={'otherPerspective'}
                             onChange={(e) => this.onChange(e)}
                             value={this.state.otherPerspective}
                    />

                    <NPInput wrapperClass={'mt-2'}
                             type={'text-area'}
                             label={'4. Please explain the connection of the contributions to the topic'}
                             placeholder={'This contribution is related ... '}
                             id={'explanation'}
                             onChange={(e) => this.onChange(e)}
                             value={this.state.explanation}/>
                    <NPInput wrapperClass={'mt-2'}
                             type={'text-area'}
                             label={'5. Can you add some links to research resources? (optional)'}
                             placeholder={'Research about AI (www.researchgate.net/789890) '}
                             id={'links'}
                             onChange={(e) => this.onChange(e)}
                             value={this.state.links}/>
                    <NPInput wrapperClass={'mt-2'}
                             type={'text-area'}
                             label={'6. Can you propose topics for new ministry funding calls? (optional)'}
                             placeholder={'A topic to the ministry comprises ... '}
                             id={'proposeTopics'}
                             onChange={(e) => this.onChange(e)}
                             value={this.state.proposeTopics}/>


                </div>
                <div className={'sidebar-form-buttons'}>
                    <div className={'btn btn-burgundy'} onClick={() => this.onClickSave()}>SAVE</div>
                    <div className={'btn btn-outline-burgundy'} onClick={() => this.props.onCancel()}>CANCEL</div>
                </div>
            </div>
        )
    }
}

export default ConnectionForm;

ConnectionForm.propTypes = {
    onFormSaved: PropTypes.func,
    onCancel: PropTypes.func,
    selectedContributions: PropTypes.array

};

ConnectionForm.defaultProps = {
    onFormSaved: PropTypes.func,
    onCancel: () => {},
    selectedContributions : []
};
