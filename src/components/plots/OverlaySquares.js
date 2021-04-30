import React from "react";
import PropTypes from "prop-types";
import NPIf from "np-if";
import NPElse from "np-if/src/NPElse";
import API from "../../lib/api/API";

class OverlaySquares extends React.Component {

    render(){
        const group = this.props.group;
        const hidden = this.props.hidden ? 'hidden' : '';
        let background = this.props.group.disabled ? 'gray' : group.color;
        const topic = this.props.group.topic;
        if(this.props.filterLinks){
            let parentHasLinks = !! topic.links;
            let childrenHasLinks = topic.children.map((child) => !!child.links).includes(true);
            background = (parentHasLinks || childrenHasLinks) ? background :'gray'
        }
        if(this.props.filterFinancing){
            let parentHasFinancing = !! topic.proposed_topics;
            let childrenHasFinancing = topic.children.map((child) => !!child.proposed_topics).includes(true);
            background = (parentHasFinancing || childrenHasFinancing) ? background :'gray'
        }
        const color = this.props.group.disabled ? 'rgb(66, 66, 66)' : '';
        const colorFooter = this.props.group.disabled ? 'rgb(66, 66, 66)' : 'black';
        const isSelected = this.props.isSelected;
        const  style = {
            position:'absolute',
            left: group.x0,
            width: group.x1 - group.x0 - this.props.gutterWidth, //2 is the padding(white gutter)
            top: group.y0,
            height: group.y1 - group.y0 - this.props.gutterHeight,
            backgroundColor: background,
            visibility: hidden,
            color: color,
            border: isSelected ? `10px solid ${this.props.borderColor}` : ''
        }
        return(
            <div className={'overlay-squares'} style={style} onClick={() => {this.props.onHide(group.name)}}>
                <NPIf condition={this.props.isScientistTreeMap}>
                    <div className={'os-row flex-wrap'}>
                        <img className={'mr-3'}
                             src={`${API.API_URL}/icons/${group.icon}`}
                             height={20}/>
                        <div>{group.name}</div>
                        <div className={'os-icon-zoom ml-auto'} onClick={(ev) => {
                            ev.stopPropagation();
                            this.props.onClickZoom(this.props.index)}
                        }></div>
                    </div>
                    <div className={'os-row align-self-end'}>
                        <div style={{fontSize:'0.9rem'}}>Angelegte Perspektiven: </div>
                        <div className={'number ml-2'}>{group.perspectiveCount}</div>
                    </div>

                    <NPElse>
                        <div className={'os-row flex-wrap'}>
                            <div className={'mr-4'}>Gruppe {this.props.index}</div>
                            <div>{group.name}</div>
                            <NPIf condition={this.props.level === 'citizen'}>
                                <div className={'os-icon-zoom ml-auto'} onClick={(ev) => {
                                    ev.stopPropagation();
                                    this.props.onClickZoom(this.props.index)
                                    this.props.onHide(group.name)
                                }
                                }></div>
                            </NPIf>
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
    isScientistTreeMap: PropTypes.bool,
    onClickZoom:PropTypes.func,
    topic: PropTypes.object,
    gutterHeight: PropTypes.number,
    gutterWidth: PropTypes.number,
    isSelected: PropTypes.bool,
    filterLinks:PropTypes.bool,
    filterFinancing:PropTypes.bool,
    level: PropTypes.string


};

OverlaySquares.defaultProps = {
    group: {},
    index: 1,
    onHide: () => {},
    hidden: false,
    isScientistTreeMap: false,
    onClickZoom: () => {},
    topic:null,
    gutterHeight: 0,
    gutterWidth: 2,
    isSelected: false,
    filterLinks:false,
    filterFinancing:false,
    level:'citizen'
};

