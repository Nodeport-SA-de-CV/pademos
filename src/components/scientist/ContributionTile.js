import React from "react";
import PropTypes from "prop-types";
import API from "../../lib/api/API";



class ContributionTile extends React.Component {

    render(){
        const styleTile = {
            backgroundColor: this.props.contribution.color,
        }
        let contribution = this.props.contribution;

        const icons = this.props.contribution.icons ? this.props.contribution.icons : [];

        return (
            <div className={`contribution-tile`}
                 style={styleTile}>
                    <div className={'ct-title'}>Bürgerbeitrag: {contribution.document_title_response}</div>

                <div className={'rt-footer mt-auto'}>
                    {
                        icons.map((i,index) =>{
                            return(
                                <img key={index} className={'rt-icon'} src={`${API.API_URL}/icons/${i}`} />
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}
ContributionTile.propTypes = {
    contribution: PropTypes.object,
};

ContributionTile.defaultProps = {
    contribution:{},
};
export default ContributionTile;


