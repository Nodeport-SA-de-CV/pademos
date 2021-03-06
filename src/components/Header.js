import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NPIf from "np-if";
import SearchBox from "./SearchBox";



class Header extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            enabledWissenschaftler: false,
        }
        this.onClickHelp = this.onClickHelp.bind(this);
    }



    onClickHelp(){
        console.log('help clicked');
    }

    render(){
        return(
            <div className={'header'}>
                {/*title row*/}
                <div className={'header-row justify-content-between'}>
                    <div className={'txt-right'}>
                        <h2>{this.props.title} <span>{this.props.subtitle}</span></h2>
                        <div className={'btn btn-tiny'}>Was können Sie hier tun? <FontAwesomeIcon icon={'caret-down'}/></div>
                    </div>
                    <div className={'txt-right'}><h2>{this.props.contributions}</h2><div>{this.props.subContributions}</div></div>
                </div>
                {/*action row*/}
                <NPIf condition={this.props.showActions}>
                    <div className={'header-row justify-content-between align-items-start pt-3 pb-3'}>
                        <SearchBox onChange={(value) => this.props.onSearchBoxChange(value)}/>
                        <select onChange={(e) => this.props.onKeyWordChange(e.target.value)}>
                            <option value={''}>Stichwort</option>
                            {
                                this.props.keywords.map((k,i) =>{
                                    return(
                                        <option value={k} key={i}>{k}</option>
                                    )
                                })
                            }
                        </select>
                        <select  onChange={(e) => this.props.onDocumentTypeChange(e.target.value)}>
                            <option value={''}>Beitragsart</option>
                            <option value={1}>Frage</option>
                            <option value={2}>Problem</option>
                            <option value={3}>Vision</option>
                        </select>
                        {/*<div className={'d-flex flex-column align-items-end'}>*/}
                        {/*    <div className={'btn btn-icon'}><FontAwesomeIcon icon={'plus'}/></div>*/}
                        {/*    einen Beitrag leisten*/}
                        {/*</div>*/}
                    </div>
                </NPIf>
            </div>
        )
    }
}

export default Header;

Header.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    contributions: PropTypes.string,
    subContributions: PropTypes.string,
    showActions: PropTypes.string,
    onSearchBoxChange: PropTypes.func,
    keywords          : PropTypes.array,
    onKeyWordChange   : PropTypes.func,
    onDocumentTypeChange : PropTypes.func
};

Header.defaultProps = {
    title: 'Bürgerbeiträge',
    subtitle:'gruppiert nach Ähnlichkeit',
    contributions: '-',
    subContributions: 'Eingereichte Beiträge',
    showActions: true,
    onSearchBoxChange: (value) => {},
    keywords:[],
    onKeyWordChange    : () => {},
    onDocumentTypeChange : () => {}
};
