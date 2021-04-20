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

    renderHeader(){
        const data = this.props.data;

        switch (this.props.level){
            case 'theme':
                return(
                    <div className={'mw-header mb-3'}>
                        <img className={'mr-3'}
                             src={`${API.API_URL}/icons/${data.icon}`}
                             height={36}/>
                        <div>
                            <div className={'title'}>
                                Thema: {data.topic}
                            </div>
                            <div>
                                Ein Forschungsthema kann mehrere Perspektiven haben, die von Wissenschaftler:innen angelegt wurden. Bitte wählen Sie eine:
                            </div>
                        </div>
                    </div>
                )
                break;
            case 'perspective':
                return(
                    <div className={'mw-header mb-3'}>
                        <img className={'mr-3'}
                             src={`${API.API_URL}/icons/${this.props.data.data.icon}`}
                             height={36}/>
                        <div>
                            <div className={'title'}>
                                Perspektive: {this.props.data.name}
                            </div>
                            <div>
                                Dies sind die mit dieser Perspektive verbundenen Beiträge, bitte wählen Sie einen, um weitere Details zu sehen:
                            </div>
                        </div>
                    </div>
                )
                break;
            default: return null;
        }
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
                {this.renderHeader()}
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
