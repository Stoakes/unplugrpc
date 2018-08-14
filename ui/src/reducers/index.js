import { HostsMessage } from '../actions/hosts';
import { PackagesMessages } from '../actions/packages';
import { ProtoMessages } from '../actions/proto';
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
    } else if (action.type === HostsMessage.SELECT_HOST) {
        return {
            ...state,
            proto: {
                ...state.proto,
                call: {
                    ...state.proto.call,
                    host: `${action.payload.host}:${action.payload.port}`,
                },
            },
        };
    } else if (action.type === ProtoMessages.SELECT_PACKAGE) {
        return {
            ...state,
            proto: {
                ...state.proto,
                call: {
                    ...state.proto.call,
                    package: action.payload,
                },
            },
        };
    } else if (action.type === ProtoMessages.SELECT_METHOD) {
        return {
            ...state,
            proto: {
                ...state.proto,
                call: {
                    ...state.proto.call,
                    service: action.payload.service,
                    method: action.payload.method,
                },
            },
        };
    } else if (action.type === ProtoMessages.SET_RESPONSE) {
        return {
            ...state,
            proto: {
                ...state.proto,
                response: action.payload,
            },
        };
    } else if (action.type === PackagesMessages.SET_PACKAGES) {
        return {
            ...state,
            proto: {
                ...state.proto,
                packages: action.payload,
            },
        };
    } else if (action.type === PackagesMessages.SET_SELECTED_PACKAGE) {
        return {
            ...state,
            proto: {
                ...state.proto,
                selectedPackage: action.payload,
            },
        };
    }
    return state;
}
