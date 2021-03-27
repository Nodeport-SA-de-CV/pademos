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
            result:null,
            isUploading:false
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
                <div className={'mt-2 mb-2'}>
                    <b>Result: {msg}</b>
                </div>
                <div style={{display:'flex'}}>
                    <div style={{width:200}}><b>Row</b></div>
                    <div style={{width:200}}><b>Is Row Valid</b></div>
                    <div style={{width:200}}><b>Validation Error</b></div>
                    <div style={{width:200}}><b>Saved to Database</b></div>
                </div>
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
                                <div style={{width:200}}>
                                    {row.errors.length > 0 ? row.errors[0] : 'No error'}
                                </div>
                                <div style={{width:200}}>

                                    {row.saved ? 'yes': 'no'}
                                </div>
                            </div>
                        )
                    })
                }
            </div>

        )

    }
    onUpload(){
        this.setState({
            isUploading:true
        })
        API.uploadData(this.state.file).then((r) =>{
            this.setState({
                result:r,
                isUploading:false
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

                            <NPIf condition={this.state.isUploading}>
                                <div className={'mt-2 mb-2'}>
                                    <b>Uploading...</b>
                                </div>
                            </NPIf>
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
