import React from "react";
import PropTypes from 'prop-types';
import Contribution from "./Contribution";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



class Group extends React.Component {

    constructor(props) {
        super(props);
        this.state     = {}
        this.onClickShowKeywords = this.onClickShowKeywords.bind(this);
    }

    componentDidMount() {
    }

    onClickShowKeywords(){
        console.log('clicked v');
    }

    render(){
        var c = Math.floor(Math.random()*16777215).toString(16);
        const color = `#${c}`;
        return(
            <div>
                <div className={'group-title'} style={{color:color}}>
                    <div className={'mr-auto'}>{this.props.title}</div>
                    <div className={'group-keywords'}>
                         <div>#keyword 1</div>
                         <div>#keyword 2</div>
                    </div>
                    <FontAwesomeIcon className={'group-icon'}
                                     onClick={() => this.onClickShowKeywords()}
                                     icon={'angle-down'}/>
                </div>
                <div className={'group-container'} >
                    {
                        this.props.group.map((contribution,index   ) =>{
                            return(
                                <Contribution contribution={contribution}
                                              key={index}
                                              index={index}
                                              bgColor={color}
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
    group : PropTypes.array,
    title : PropTypes.string,
};

Group.defaultProps = {
    group : [],
    title : 'Title'

};
export default Group;
