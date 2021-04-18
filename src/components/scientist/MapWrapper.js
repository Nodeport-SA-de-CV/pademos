import React from 'react';
import PropTypes from "prop-types";
import API from "../../lib/api/API";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


const _ = require('underscore');

class MapWrapper extends React.Component {
    constructor() {
        super();
        this.state = {}
    }

    render() {
        const color = this.props.color;
        const style = {
            backgroundColor: color
        }
        const data = this.props.data;
        return (
            <div className={'h-100 d-flex map-wrapper'} style={style}>
                <FontAwesomeIcon className={'mw-icon'} size={'lg'}
                                 icon={'times'}
                                 onClick={() => this.props.onClickClose()}/>
                <div className={'mw-header mb-3'}>
                    <img className={'mr-3'}
                         src={`${API.API_URL}/icons/${data.icon}`}
                         height={36}/>
                    <div>
                        <div className={'title'}>
                            {data.topic}
                        </div>
                        <div>
                            Ein Forschungsthema kann mehrere Perspektiven haben, die von Wissenschaftler:innen angelegt wurden. Bitte wählen Sie eine:
                        </div>
                    </div>
                </div>
                {this.props.children}
            </div>
        );
    }
}
export  default MapWrapper;
MapWrapper.propTypes = {
    data                  : PropTypes.object,
    color                 : PropTypes.string,
    onClickClose          : PropTypes.func
};

MapWrapper.defaultProps = {
    data                  : {},
    color                 : '',
    onClickClose          : () => {}
};
