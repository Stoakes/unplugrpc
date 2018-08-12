import { HostsMessage } from '../actions/hosts';
import { DEFAULT_STATE } from './defaultState';

export default function(state = DEFAULT_STATE, action) {
    if (action.type === HostsMessage.ADD_HOSTS) {
        return {
            ...state,
            hosts: action.payload,
        };
    }
    return state;
}
