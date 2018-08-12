import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import NotificationSystem from '../components/NotificationSystem';

class NotificationSystemContainer extends React.Component {
    render() {
        const { notifications } = this.props;
        return <NotificationSystem notifications={notifications} />;
    }
}

NotificationSystemContainer.contextTypes = {
    store: PropTypes.object,
};

NotificationSystemContainer.propTypes = {
    notifications: PropTypes.array,
};

export default connect(state => ({ notifications: state.notifications }))(
    NotificationSystemContainer
);
