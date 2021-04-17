import React from 'react';
import PropTypes from "prop-types";


const _ = require('underscore');

class MapWrapper extends React.Component {
    constructor() {
        super();
        this.state = {}
    }

    render() {
        const color = this.props.color;
        const style = {
            backgroundColor: this.props.color
        }
        const data = this.props.data;
        return (
            <div className={'h-100 d-flex map-wrapper'} style={style}>
                <div className={'mw-header'}>{data.topic}</div>
                {this.props.children}
            </div>
        );
    }
}
export  default MapWrapper;
MapWrapper.propTypes = {
    data                  : PropTypes.object,
    color                 : PropTypes.string,
};

MapWrapper.defaultProps = {
    data                  : {},
    color                 : '',

};
