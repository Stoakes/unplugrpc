import { NotificationMessages } from '../actions/notifications';

export default function Notifications(state = [], action = {}) {
    if (action.type === NotificationMessages.RNS_SHOW_NOTIFICATION) {
        return [...state, { ...action, uid: action.uid }];
    } else if (NotificationMessages.RNS_HIDE_NOTIFICATION) {
        return state.filter(notification => {
            return notification.uid !== action.uid;
        });
    } else if (NotificationMessages.RNS_REMOVE_ALL_NOTIFICATIONS) {
        return [];
    }
    return state;
}
