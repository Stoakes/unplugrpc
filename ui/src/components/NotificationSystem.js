import React from 'react';
import PropTypes from 'prop-types';
import NotifySystem from 'react-notification-system';

import { hide } from '../actions/notifications';

export default class Notifications extends React.Component {
    system() {
        // eslint-disable-next-line
        return this.refs.notify;
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { notifications } = nextProps;
        const notificationIds = notifications.map(
            notification => notification.uid
        );
        const systemNotifications = this.system().state.notifications || [];

        if (notifications.length > 0) {
            // Get all active notifications from react-notification-system
            /// and remove all where uid is not found in the reducer
            systemNotifications.forEach(notification => {
                if (notificationIds.indexOf(notification.uid) < 0) {
                    this.system().removeNotification(notification.uid);
                }
            });

            notifications.forEach(notification => {
                this.system().addNotification({
                    ...notification,
                    onRemove: () => {
                        this.context.store.dispatch(hide(notification.uid));
                        notification.onRemove && notification.onRemove();
                    },
                });
            });
        }

        if (
            this.props.notifications !== notifications &&
            notifications.length === 0
        ) {
            this.system().clearNotifications();
        }
    }

    shouldComponentUpdate(nextProps) {
        return this.props !== nextProps;
    }

    render() {
        const { notifications, ...rest } = this.props;

        return <NotifySystem ref="notify" {...rest} />;
    }
}

Notifications.propTypes = {
    notifications: PropTypes.array,
};

Notifications.contextTypes = {
    store: PropTypes.object,
};
