import React from "react";
import PropTypes from "prop-types";
import API from "../../lib/api/API";

class ConnectionTile extends React.Component {
    render(){
        const connection = this.props.connection;
        return (
            <div className={`connection-tile`} >
                Verbindung {this.props.index + 1}:
                <div className={'mt-2 mb-2 connection-tile-title'}>{connection.connection_explanation}</div>
                <div className={'rt-footer'}>
                    <img className={'rt-icon'} src={`${API.API_URL}/icons/${connection.icon}`} />
                </div>
            </div>
        )
    }
}
ConnectionTile.propTypes = {
    connection: PropTypes.object,
    index: PropTypes.number
};

ConnectionTile.defaultProps = {
    connection:{},
    index: 0
};
export default ConnectionTile;


