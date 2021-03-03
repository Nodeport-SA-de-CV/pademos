import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NPIf from "np-if";



class SearchBox extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        }
        this.onClickHelp = this.onClickHelp.bind(this);
    }

    onClickHelp(){
        console.log('help clicked');
    }

    render(){
        const results = this.props.results;
        return(
            <div className={'search-box-wrapper'}>
                <div className={`search-box ${this.props.searchBoxClass}`}>
                    <input className={this.props.inputClass}
                           onChange={(e) => this.props.onChange(e.target.value)}
                           placeholder={this.props.placeholder}/>
                    <FontAwesomeIcon icon={'search'}/>
                </div>
                <NPIf condition={results.length > 0}>
                    <div className={`search-box-results ${this.props.resultsWrapperClass}`}>
                        { results.map( (result) =>
                            <div key={'result'} className={`search-box-result ${this.props.resultClass}`}>{result}</div>)
                        }
                    </div>
                </NPIf>
            </div>
        )
    }
}

export default SearchBox;

SearchBox.propTypes = {
    searchBoxClass: PropTypes.string,
    inputClass: PropTypes.string,
    resultsWrapperClass: PropTypes.string,
    resultClass: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    disabled: PropTypes.bool,
    results: PropTypes.array
};

SearchBox.defaultProps = {
    searchBoxClass: '',
    inputClass: '',
    resultsWrapperClass: '',
    resultClass: '',
    placeholder: 'Suche...',
    onChange: () => {},
    value: '',
    disabled: false,
    results: []
};
