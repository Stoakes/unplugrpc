export const NotificationMessages = {
    RNS_SHOW_NOTIFICATION: 'RNS_SHOW_NOTIFICATION',
    RNS_HIDE_NOTIFICATION: 'RNS_HIDE_NOTIFICATION',
    RNS_REMOVE_ALL_NOTIFICATIONS: 'RNS_REMOVE_ALL_NOTIFICATIONS',
};

/**
 * Example opts
{
  title: 'Hey, it\'s good to see you!',
  message: 'Now you can see how easy it is to use notifications in React!',
  position: 'tr',
  autoDismiss: 0,
  action: {
    label: 'Awesome!',
    callback: function() {
      console.log('Clicked');
    }
  }
}
 * @param Object opts 
 * @param string level 
 */
export function addNotification(notif = {}) {
    return {
        type: NotificationMessages.RNS_SHOW_NOTIFICATION,
        ...notif,
        uid: notif.uid || Date.now(),
        level: notif.level || 'info',
    };
}

export function hide(uid) {
    return {
        type: NotificationMessages.RNS_HIDE_NOTIFICATION,
        uid,
    };
}

export function removeAll() {
    return { type: NotificationMessages.RNS_REMOVE_ALL_NOTIFICATIONS };
}
