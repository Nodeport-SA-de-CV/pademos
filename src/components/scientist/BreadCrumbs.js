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
                <NPIf condition={['theme','perspective','contribution'].includes(level)}>
                    <div className={'pd_breadcrumb'}
                         onClick={() => this.props.onThemeClicked(this.props.theme)}>
                        Thema: {this.props.theme.topic}
                    </div>
                </NPIf>
                <NPIf condition={['perspective','contribution'].includes(level)}>
                    <div className={'pd_breadcrumb'}
                         onClick={() => this.props.onPerspectiveClicked(this.props.perspective)}>
                        Perspektive: {this.props.perspective.name}
                    </div>
                </NPIf>
                <NPIf condition={['contribution'].includes(level)}>
                    <div className={'pd_breadcrumb'}
                         onClick={() => this.props.onContributionClicked(this.props.contribution)}>
                        Bürgerbeitrag 1
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
    onContributionClicked: PropTypes.func,

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
    onContributionClicked: () => {
    }
};
export default BreadCrumbs;


