import React from "react";
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Overlay} from "react-bootstrap";


class GroupTitle extends React.Component {
    constructor(props) {
        super(props);
        this.state     = {
            showOverlay:false,
        }
        this.showOverlay    = this.showOverlay.bind(this);
    }

    showOverlay(show){
        this.setState({showOverlay: show});
    }

    render(){
        const group = this.props.group;
        const color = this.props.group.color;
        const keywords = this.props.group.contributions ? this.props.group.contributions[0].topic_keywords : [];
        return(
            <div style={{flex:1}} onMouseLeave={() => this.showOverlay(false)}>
                <div key={group._id}
                     className={'group-name'}
                     style={{color:group.color,borderColor:group.color}}
                     ref={(ref) => (this.divTarget)= ref}
                     onMouseEnter={() => {
                         this.setState({groupSelected:group});
                         this.showOverlay(true)}}>
                    {group.name}
                </div>
                <Overlay target={this.divTarget} show={this.state.showOverlay} placement="bottom">
                    {({ placement, arrowProps, show: _show, popper, ...props }) => (
                        <div {...props}
                             className={'overlay-wrapper'}
                             style={{backgroundColor: color, ...props.style,}}>
                            <div className={'overlay'}>
                                <FontAwesomeIcon className={'overlay-btn-icon ml-auto'}
                                                 onClick={() => this.showOverlay(false)}
                                                 icon={'times'}/>
                                <div className={'overlay-content'}>
                                    {
                                        keywords.map((keyword,index) => {
                                            return(
                                                <div key={index}>{keyword}</div>
                                            )
                                        })
                                    }
                                </div>
                                <div className={'overlay-footer'}>
                                    <div>Anzahl der Beiträge </div>
                                    <div className={'number'}>{group.contributions.length}</div>
                                </div>
                            </div>
                        </div>
                    )}
                </Overlay>
            </div>
        )
    }
}
GroupTitle.propTypes = {
    group                  : PropTypes.object,
};

GroupTitle.defaultProps = {
    group                  : {},
};
export default GroupTitle;
