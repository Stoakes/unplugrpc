import { HostsMessage } from '../actions/hosts';
import { DEFAULT_STATE } from './defaultState';

export default function(state = DEFAULT_STATE, action) {
    if (action.type === HostsMessage.ADD_HOSTS) {
        return {
            ...state,
            hosts: action.payload,
        };
    } else if (action.type === HostsMessage.ADD_HOST) {
        return {
            ...state,
            hosts: [...state.hosts, action.payload],
        };
    } else if (action.type === HostsMessage.REMOVE_HOST) {
        return {
            ...state,
            hosts: state.hosts.filter(item => {
                return (
                    item.host !== action.payload.host &&
                    item.port !== action.payload.port
                );
            }),
        };
    }
    return state;
}
