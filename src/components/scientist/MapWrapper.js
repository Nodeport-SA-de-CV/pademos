import React from 'react';
import PropTypes from "prop-types";
import API from "../../lib/api/API";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import NPIf from "np-if";
import NPElse from "np-if/src/NPElse";


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
                             src={`${API.API_URL}/icons/${data.data.icon}`}
                             height={36}/>
                        <div>
                            <div className={'title'}>
                                Perspektive: {data.name}
                            </div>
                            <div>
                                Dies sind die mit dieser Perspektive verbundenen Beiträge, bitte wählen Sie einen, um weitere Details zu sehen:
                            </div>
                        </div>
                    </div>
                )
                break;
            case 'contribution':
                return(
                    <div className={'mw-header mb-3'}>
                        <div className={`${this.props.classNameHeaderTitle}`}>
                            <div className={'title'} style={{cursor:'pointer'}} onClick={() => this.props.onClickNavigation()}>
                                Bürgerbeitrag: {data.document_title_response}
                            </div>
                            <div>
                                {data.document_what_response}
                            </div>
                            <div className={'ct-show-all-btn'} style={{alignSelf:'flex-start'}} onClick={() => this.props.onClickNavigation()}>... ganzen Bürgerbeitrag anzeigen</div>
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
        return (
            <div className={'h-100 d-flex map-wrapper'} style={style}>
                <FontAwesomeIcon className={'mw-icon'} size={'lg'}
                                 icon={'times'}
                                 onClick={() => this.props.onClickClose()}/>
                {this.renderHeader()}
                <NPIf condition={this.props.level === 'contribution'}>
                    <div className={'mb-3'}>Dies sind die Verbindungen, die zu diesem Beitrag angelegt wurden.
                        Wählen Sie eine aus, um zu sehen, warum die Wissenschaftler:
                        innen diesen Beitrag mit einem Forschungsthema verbunden haben:</div>
                    {this.props.children}
                    <NPElse>
                        {this.props.children}
                    </NPElse>
                </NPIf>
            </div>
        );
    }
}
export  default MapWrapper;
MapWrapper.propTypes = {
    data                  : PropTypes.object,
    color                 : PropTypes.string,
    onClickClose          : PropTypes.func,
    level                 : PropTypes.string,
    onClickNavigation     : PropTypes.func,
    classNameHeaderTitle  : PropTypes.string
};

MapWrapper.defaultProps = {
    data                  : {},
    color                 : '',
    onClickClose          : () => {},
    level                 : '',
    onClickNavigation     : () => {},
    classNameHeaderTitle  : ''
};
