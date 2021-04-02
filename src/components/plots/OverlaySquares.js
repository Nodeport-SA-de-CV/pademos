import React from "react";
import PropTypes from "prop-types";

class OverlaySquares extends React.Component {

    render(){
        const group = this.props.group;
        const hidden = this.props.hidden ? 'hidden' : '';
        const background = this.props.group.disabled ? 'gray' : group.color;

        const  style = {
            position:'absolute',
            left: group.x0,
            width: group.x1 - group.x0 - 2, //2 is the padding(white gutter)
            top: group.y0,
            height: group.y1 - group.y0,
            backgroundColor: background,
            visibility: hidden
        }
        return(
            <div className={'overlay-squares'} style={style} onClick={() => {this.props.onHide(group.name)}}>
                <div className={'os-row flex-wrap'}>
                    <div className={'mr-4'}>Group {this.props.index}</div>
                    <div>{group.name}</div>
                </div>
                <div className={'os-row align-self-end'} style={{color:'black'}}>
                    <div style={{fontSize:'0.9rem'}}>Anzahl der Beiträge</div>
                    <div className={'number ml-2'}>{group.contributionCount}</div>
                </div>
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
};

OverlaySquares.defaultProps = {
    group: {},
    index: 1,
    onHide: () => {},
    hidden: false,
};

