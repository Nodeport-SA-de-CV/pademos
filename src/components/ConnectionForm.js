import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NPInput from "./NPInput";
import API from "../lib/api/API";

// CommonJS
const Swal = require('sweetalert2');

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
        this.onTopicChange = this.onTopicChange.bind(this);
        this.onPerspectiveChange = this.onPerspectiveChange.bind(this);

    }

    onClickHelp(){
        console.log('help clicked');
    }

    onClickSave(){
        const topic = {
            contributions: this.props.selectedContributions,
            topic: this.state.topic ? this.state.topic : this.state.otherTopic,
            perspective: this.state.perspective ? this.state.perspective : this.state.otherPerspective,
            connection_explanation: this.state.explanation,
            links: this.state.links,
            proposed_topics: this.state.proposeTopics,
        }
        API.postTopic(topic).then((r) =>{
            if(r.success){
                this.props.onFormSaved();
            }else{

            }
        })
    }

    onChange(e){
        this.setState({[e.target.id]:e.target.value});
    }
    cancel(){
        const customSwal = Swal.mixin({
            customClass: {
                popup: 'popup-custom',
                confirmButton: 'confirm-custom',
                cancelButton: 'cancel-custom',
                content:'title-custom',
                icon: 'icon-custom'
            },
        });
         customSwal.fire({
             icon:'warning',
             iconHtml:'',
             text:'ok custom',
             showCancelButton: true,
             showConfirmButton:true,
             confirmButtonText: 'Yes, delete it!',
             cancelButtonText: 'No, cancel!',
         }).then((result) => {
             /* Read more about isConfirmed, isDenied below */
             if (result.isConfirmed) {
                 this.props.onCancel();
             }
         });
    }


    render(){
        const contributions = this.props.selectedContributions;

        return(
            <div className={'sidebar'}>
                <div className={'sidebar-form-header'}>
                    <div><b>Neue Verbindung anlegen</b></div>
                    <FontAwesomeIcon className={'icon-link'} icon={'link'}/>
                </div>
                <div className={'sidebar-form mt-3'}>
                    <label>1. Wählen Sie einen oder mehrere aus den Bürgerbeiträgen auf der linken Seite.</label>
                    {
                        contributions.map(c => {
                            return(
                                <div key={c._id}
                                     className={'sidebar-form-contribution mb-1'}
                                     style={{backgroundColor:c.color}}>
                                     <div>{c.document_title_response}</div>
                                     <FontAwesomeIcon className={'remove'}
                                                      icon={'times' }
                                                      onClick={() => this.props.onRemoveContribution(c)}/>
                                </div>
                            )
                        })
                    }

                    {/*select */}
                    <label className={'mt-2'}>2. Zu welchem Forschungsthema haben die Bürgerbeiträge einen Bezug? (*)</label>
                    <select onChange={this.onTopicChange}>
                        <option value={''}>Wählen Sie ein Thema </option>
                        {
                            this.props.topicsList.map((t,i) => {
                                return(
                                    <option key={i} value={t}>
                                        {t}
                                    </option>
                                )
                            })
                        }
                    </select>

                    <NPInput label={'Wenn nicht in der Liste, legen Sie ein neues Forschungsthema an: '}
                             id={'otherTopic'}
                             onChange={(e) => this.onChange(e)}
                             value={this.state.otherTopic}
                    />

                    {/*select */}
                    <label className={'mt-2'}>3. Aus welcher Perspektive (einer Fachrichtung oder Ihrer Position) legen Sie diese Verbindung an? (*)   </label>
                    <select onChange={this.onPerspectiveChange}>
                        <option value={''}>Wählen Sie eine Perspektive </option>
                        {
                            this.props.perspectivesList.map((t,i) => {
                                return(
                                <option key={i} value={t}>
                                    {t}
                                </option>
                                )
                            })
                        }
                    </select>

                    <NPInput label={'Wenn nicht in der Liste, legen Sie eine neue Perspektive an: '}
                             id={'otherPerspective'}
                             onChange={(e) => this.onChange(e)}
                             value={this.state.otherPerspective}
                    />

                    <NPInput wrapperClass={'mt-2'}
                             type={'text-area'}
                             label={'4. Erklären Sie die Verbindung der gewählten Bürgerbeiträge zum Forschungsthema oder beantworten Sie die Bürgerfrage(n) (*) '}
                             placeholder={'Der Beitrag ergänzt das Thema X, weil ... '}
                             id={'explanation'}
                             onChange={(e) => this.onChange(e)}
                             value={this.state.explanation}/>
                    <NPInput wrapperClass={'mt-2'}
                             type={'text-area'}
                             label={'5. Fügen Sie Links zu wissenschaftlichen Quellen hinzu:'}
                             placeholder={'Forschung zu KI (www.researchgate.net/789890) '}
                             id={'links'}
                             onChange={(e) => this.onChange(e)}
                             value={this.state.links}/>
                    <NPInput wrapperClass={'mt-2'}
                             type={'text-area'}
                             label={'6. Möchten Sie dem Bundesministerium für Bildung und Forschung einen neuen Förderschwerpunkt vorschlagen?'}
                             placeholder={'Der Förderschwerpunkt könnte sein... '}
                             id={'proposeTopics'}
                             onChange={(e) => this.onChange(e)}
                             value={this.state.proposeTopics}/>


                </div>
                <div className={'sidebar-form-buttons'}>
                    <div className={'btn btn-burgundy'} onClick={() => this.onClickSave()}>SPEICHERN</div>
                    <div className={'btn btn-outline-burgundy'} onClick={() => {
                        this.cancel();
                    }}>ABBRECHEN</div>
                </div>
            </div>
        )
    }

    onTopicChange(e) {
        this.setState({
            "topic":e.target.value
        });
    }
    onPerspectiveChange(e) {
        this.setState({
            "perspective":e.target.value
        });
    }
}

export default ConnectionForm;

ConnectionForm.propTypes = {
    onFormSaved: PropTypes.func,
    onCancel: PropTypes.func,
    selectedContributions: PropTypes.array,
    topicsList: PropTypes.array,
    perspectivesList: PropTypes.array,
    onRemoveContribution: PropTypes.func,
};

ConnectionForm.defaultProps = {
    onFormSaved: PropTypes.func,
    onCancel: () => {},
    selectedContributions : [],
    topicsList: [],
    perspectivesList: [],
    onRemoveContribution: () => {}
};
