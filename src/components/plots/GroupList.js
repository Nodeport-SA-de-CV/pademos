import React from "react";
import API from "../../lib/api/API";
import GroupTitle from "./GroupTitle";

class GroupList extends React.Component {

    constructor(props) {
        super(props);
        this.state     = {
            data:[],
        }
        this.loadData       = this.loadData.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    loadData(){
        API.getContributions().then((res) => {
            if (res.success) {
                const data = res.topics.sort((g,g1) => g1.contributions.length - g.contributions.length);
                this.setState({data});
            }
        })
    }

    render(){
        const data = this.state.data;
        return(
            <div className={'group-list'}>
                { data.map( group => {
                  return(
                      <GroupTitle group={group} key={group._id}/>
                  )
                })}
            </div>
        )
    }
}
GroupList.propTypes = {

};

GroupList.defaultProps = {

};
export default GroupList;
// <div>
//     <div key={group._id}
//          className={'group-name'}
//          style={{color:group.color}}
//          ref={(ref) => (this.divTarget[group._id])= ref}>
//         <div className={'mr-auto'}
//              onMouseEnter={() => {
//                  this.setState({groupSelected:group});
//                  this.showOverlay(true);
//              }}
//         >{group.name}</div>
//         <FontAwesomeIcon className={'group-icon-keywords'}
//                          onClick={() => this.showOverlay(true)}
//                          icon={'angle-down'}
//         />
//     </div>
//     <Overlay target={this.divTarget} show={this.state.showOverlay} placement="bottom">
//         {({ placement, arrowProps, show: _show, popper, ...props }) => (
//             <div {...props}
//                  className={'overlay-wrapper'}
//                  style={{backgroundColor: color, ...props.style,}}>
//                 <div className={'overlay'}>
//                     <FontAwesomeIcon className={'overlay-btn-icon ml-auto'}
//                                      onClick={() => this.showOverlay(false)}
//                                      icon={'times'}/>
//                     <div className={'overlay-content'}>
//                         {
//                             keywords.map((keyword,index) => {
//                                 return(
//                                     <div key={index}>{keyword}</div>
//                                 )
//                             })
//                         }
//                     </div>
//                     <div className={'overlay-footer'}>
//                         <div>Anzahl der Beiträge</div>
//                         <div className={'number'}>{this.state.groupSelected.contributions.length}</div>
//                     </div>
//                 </div>
//             </div>
//         )}
//     </Overlay>
// </div>
