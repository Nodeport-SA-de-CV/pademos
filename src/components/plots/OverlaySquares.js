import React from "react";
import PropTypes from "prop-types";
import NPIf from "np-if";
import NPElse from "np-if/src/NPElse";
import API from "../../lib/api/API";

class OverlaySquares extends React.Component {

    render(){
        const group = this.props.group;
        const hidden = this.props.hidden ? 'hidden' : '';
        const background = this.props.group.disabled ? 'gray' : group.color;
        const color = this.props.group.disabled ? 'rgb(66, 66, 66)' : '';
        const colorFooter = this.props.group.disabled ? 'rgb(66, 66, 66)' : 'black';

        const  style = {
            position:'absolute',
            left: group.x0,
            width: group.x1 - group.x0 - 2, //2 is the padding(white gutter)
            top: group.y0,
            height: group.y1 - group.y0,
            backgroundColor: background,
            visibility: hidden,
            color: color,
        }
        return(
            <div className={'overlay-squares'} style={style} onClick={() => {this.props.onHide(group.name)}}>
                <NPIf condition={this.props.isScientistTreeMap}>
                    <div className={'os-row flex-wrap'}>
                        <img className={'mr-3'}
                             src={`${API.API_URL}/icons/${group.icon}`}
                             height={20}/>
                        <div>{group.name}</div>
                        <div className={'os-icon-zoom ml-auto'}></div>
                    </div>
                    <div className={'os-row align-self-end'}>
                        <div style={{fontSize:'0.9rem'}}>Angelegte Perspektiven: </div>
                        <div className={'number ml-2'}>{group.perspectiveCount}</div>
                    </div>

                    <NPElse>
                        <div className={'os-row flex-wrap'}>
                            <div className={'mr-4'}>Gruppe {this.props.index}</div>
                            <div>{group.name}</div>
                        </div>
                        <div className={'os-row align-self-end'} style={{color:colorFooter}}>
                            <div style={{fontSize:'0.9rem'}}>Anzahl der Beiträge</div>
                            <div className={'number ml-2'}>{group.contributionCount}</div>
                        </div>
                    </NPElse>
                </NPIf>
            </div>
        )
    }
}
export default OverlaySquares;

OverlaySquares.propTypes = {
    group: PropTypes.object,
    index: PropTypes.number,
    onHide: PropTypes.func,
    hidden: PropTypes.bool,
    isScientistTreeMap: PropTypes.bool
};

OverlaySquares.defaultProps = {
    group: {},
    index: 1,
    onHide: () => {},
    hidden: false,
    isScientistTreeMap: false
};

