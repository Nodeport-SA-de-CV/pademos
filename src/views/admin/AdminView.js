import React from 'react';
import {AuthContext} from "../../lib/AuthContext";
import NPIf from "np-if";
import NavBar from "../../components/NavBar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Form from "react-bootstrap/Form";
import API from "../../lib/api/API";

class AdminView extends React.Component {
    static contextType = AuthContext;
    constructor() {
        super();
        this.state = {
            file:null,
            result:null
        }
    }
    onFileSelected(e){
        const data = new FormData();
        const file = e.target.files[0];
        data.append('file', file);
        this.setState({
            file:data
        })
    }
    renderTable(){
        if(!this.state.result){
            return null;
        }
        const rows = this.state.result.errors;
        const msg  = this.state.result ? this.state.result.message: '';
        return(
            <div>
                Result: {msg}

                {
                    rows.map((row,index) =>{
                        return (
                            <div key={index} style={{display:'flex'}}>
                                <div style={{width:200}}>
                                    Row {index}:
                                </div>
                                <div style={{width:200}}>
                                    {row.isValid ? 'true' : 'false'}
                                </div>
                                <div>
                                    {row.errors.length > 0 ? row.errors[0] : 'No error'}
                                </div>
                            </div>
                        )
                    })
                }
            </div>

        )

    }
    onUpload(){
        API.uploadData(this.state.file).then((r) =>{
            this.setState({
                result:r
            })
            // if(r.success){
            //
            // }else{
            //
            // }
        })
    }
    render(){
            return(
                <div style={{margin:50}}>
                    <NPIf condition={this.context.isLoggedIn}>
                        <div className={'mt-2'} style={{height:"100%"}}>
                            <h3>Upload Dataset</h3>
                            <input type={'file'} onChange={(e) => this.onFileSelected(e)}></input>
                            {this.renderTable()}
                            <div className={'btn btn-burgundy'} onClick={() => this.onUpload()}>Upload</div>
                        </div>
                        {/*<div className={'mt-2'}>*/}
                        {/*    <h3>Delete Data</h3>*/}
                        {/*    <div className={'btn btn-burgundy'}>Delete all contributions</div>*/}
                        {/*    <div className={'btn btn-burgundy'}>Delete all saved topics</div>*/}
                        {/*</div>*/}
                    </NPIf>
                </div>
            )

    }
}
export default  AdminView;
