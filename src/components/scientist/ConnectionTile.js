import React from "react";
import PropTypes from "prop-types";
import API from "../../lib/api/API";

class ConnectionTile extends React.Component {
    render(){
        const isSameTheme = this.props.connection.topic === this.props.selectedTheme.topic;
        const connection = this.props.connection;
        return (
            <div className={`connection-tile`} >
                {isSameTheme ? 'Verbindung' : 'Verwandte Verbindung'} {this.props.index + 1}:
                <div className={'mt-2 mb-auto connection-tile-title'}>{connection.connection_explanation}</div>
                <div className={'rt-footer align-items-center'}>
                    <div className={'ct-topic-name'}>{connection.topic}</div><img className={'ml-1 rt-icon'} src={`${API.API_URL}/icons/${connection.icon}`} />
                </div>
            </div>
        )
    }
}
ConnectionTile.propTypes = {
    connection: PropTypes.object,
    index: PropTypes.number,
    selectedTheme:PropTypes.object

};

ConnectionTile.defaultProps = {
    connection:{},
    index: 0,
    selectedTheme:{}

};
export default ConnectionTile;


