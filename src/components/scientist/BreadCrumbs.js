import React from "react";
import PropTypes from "prop-types";
import NPIf from "np-if";

class BreadCrumbs extends React.Component {

    render() {
        const level = this.props.level;
        return (
            <div className={`pd_breadcrumbs`}>
                <NPIf condition={level != 'scientist'}>
                    <div className={'pd_breadcrumb'}
                         onClick={() => this.props.onScientistClicked()}
                    >
                        Übersicht
                    </div>
                </NPIf>
                <NPIf condition={['theme','perspective','contribution','connection'].includes(level)}>
                    <div className={'pd_breadcrumb'}
                         onClick={() => this.props.onThemeClicked(this.props.theme)}>
                        Thema: {this.props.theme.topic}
                    </div>
                </NPIf>
                <NPIf condition={['perspective','contribution','connection'].includes(level)}>
                    <div className={'pd_breadcrumb'}
                         onClick={() => this.props.onPerspectiveClicked(this.props.perspective)}>
                        Perspektive: {this.props.perspective.name}
                    </div>
                </NPIf>
                <NPIf condition={['contribution','connection'].includes(level)}>
                    <div className={'pd_breadcrumb'}
                         onClick={() => {
                             this.props.onContributionClicked(this.props.contribution)
                         }}>
                        Bürgerbeitrag {this.props.contributionIndex}
                    </div>
                </NPIf>
                <NPIf condition={['connection'].includes(level)}>
                    <div className={'pd_breadcrumb'}
                         onClick={() => this.props.onConnectionClicked(this.props.contribution)}>
                        Verbindung {this.props.connectionIndex}
                    </div>
                </NPIf>
            </div>
        )
    }
}

BreadCrumbs.propTypes = {
    level: PropTypes.string,
    theme: PropTypes.object,
    perspective: PropTypes.object,
    contribution: PropTypes.object,
    onScientistClicked: PropTypes.func,
    onThemeClicked: PropTypes.func,
    onPerspectiveClicked: PropTypes.func,
    onConnectionClicked: PropTypes.func,
    onContributionClicked: PropTypes.func,
    contributionIndex:PropTypes.number,
    connectionIndex:PropTypes.number,


};

BreadCrumbs.defaultProps = {
    level: 'scientist',
    theme: {},
    perspective: {},
    contribution: {},
    onScientistClicked: () => {
    },
    onThemeClicked: () => {
    },
    onPerspectiveClicked: () => {
    },
    onConnectionClicked: () => {
    },
    onContributionClicked: () => {
    },
    contributionIndex:1,
    connectionIndex:1

};
export default BreadCrumbs;


