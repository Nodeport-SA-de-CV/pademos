import React from "react";
import PropTypes from "prop-types";
import NPIf from "np-if";

class CitizenBreadCrumbs extends React.Component {

    render() {
        const level = this.props.level;
        return (
            <div className={`pd_breadcrumbs`}>
                <NPIf condition={level != 'citizen'}>
                    <div className={'pd_breadcrumb'}
                         onClick={() => this.props.onCitizenClicked()}
                    >
                        Bürgerbeiträge
                    </div>
                </NPIf>
                <NPIf condition={['group'].includes(level)}>
                    <div className={'pd_breadcrumb'}>
                        Gruppe: {this.props.group}
                    </div>
                </NPIf>
            </div>
        )
    }
}

CitizenBreadCrumbs.propTypes = {
    level: PropTypes.string,
    group: PropTypes.string,
    onCitizenClicked: PropTypes.func,
};

CitizenBreadCrumbs.defaultProps = {
    level: 'citizen',
    group: '',
    onCitizenClicked: () => {
    },
};
export default CitizenBreadCrumbs;


