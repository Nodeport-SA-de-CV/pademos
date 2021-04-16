import React from 'react';


const _ = require('underscore');

class MapWrapper extends React.Component {
    constructor() {
        super();
        this.state = {}
    }

    render() {
        return (
            <div className={'h-100 d-flex treemap-wrapper'} style={{flexDirection:'column'}}>
                adsasd
                {this.props.children}
            </div>
        );
    }
}
export  default MapWrapper;
