import React from "react";
import PropTypes from 'prop-types';
import Contribution from "./Contribution";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Overlay} from "react-bootstrap";

class Group extends React.Component {

    constructor(props) {
        super(props);
        this.state     = {
            showOverlay:false
        }
        this.showOverlay = this.showOverlay.bind(this);
    }

    componentDidMount() {
    }

    showOverlay(show){
        this.setState({showOverlay: show});
    }
    isContributionSelected(contribution){
        const found =  this.props.selectedContributions.find((c) => c._id === contribution._id);
        return found !== undefined;
    }
    render(){
        const color = this.props.group.color;
        const keywords = this.props.group.contributions ? this.props.group.contributions[0].topic_keywords : [];

        return(
            <div onMouseLeave={() => this.showOverlay(false)}>
                <div className={'group-title'}
                     style={{color:color}}
                     ref={(ref) => this.divTarget = ref}>
                    <div className={'mr-auto'} 
                         onMouseEnter={() => this.showOverlay(true)}
                         >{this.props.group.name}</div>
                    <div className={'group-keywords'} >
                        {
                            keywords.slice(0,2).map((keyword,index) => {
                                return(
                                    <div key={index}>{keyword}</div>
                                )
                            })
                        }
                    </div>
                    <FontAwesomeIcon className={'group-icon'}
                                     onClick={() => this.showOverlay(true)}
                                     icon={'angle-down'}
                    />
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
                                    <div>Anzahl der Beiträge</div>
                                    <div className={'number'}>{this.props.group.contributions.length}</div>
                                </div>
                            </div>
                        </div>
                    )}
                </Overlay>
                <div className={'group-container'} >
                    {
                        this.props.group.contributions.map((contribution,index   ) =>{
                            return(
                                <Contribution contribution={contribution}
                                              key={index}
                                              index={index}
                                              bgColor={color}
                                              topic={this.props.selectedTopic}
                                              isSelected={this.isContributionSelected(contribution)}
                                              onContributionSelected={(c) => this.props.onContributionSelected(c)}
                                              isDragging={this.props.isDragging}
                                              onClickContributionDetails={(c) => this.props.onClickContributionDetails(c)}
                                />
                            )

                        })
                    }
                </div>

            </div>
        )
    }
}
Group.propTypes = {
    group                  : PropTypes.array,
    title                  : PropTypes.string,
    onContributionSelected : PropTypes.func,
    selectedContributions  : PropTypes.array,
    selectedTopic          : PropTypes.object,
    onClickContributionDetails : PropTypes.func
};

Group.defaultProps = {
    group                  : [],
    title                  : 'Title',
    onContributionSelected : () => {},
    selectedContributions  : [],
    selectedTopic          : null,
    onClickContributionDetails : () => {}

};
export default Group;
