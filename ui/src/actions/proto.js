export const ProtoMessages = {
    SELECT_METHOD: 'SELECT_METHOD',
    SELECT_PACKAGE: 'SELECT_PACKAGE',
    SELECT_SERVICE: 'SELECT_SERVICE',
    SET_RESPONSE: 'SET_RESPONSE',
    SET_SELECTED_METHOD: 'SET_SELECTED_METHOD',
};

export function selectPackage(pack) {
    return {
        type: ProtoMessages.SELECT_PACKAGE,
        payload: pack,
    };
}

export function selectService(service) {
    return {
        type: ProtoMessages.SELECT_SERVICE,
        payload: service,
    };
}

export function selectMethod(method) {
    return {
        type: ProtoMessages.SELECT_METHOD,
        payload: method,
    };
}

export function setResponse(response) {
    return {
        type: ProtoMessages.SET_RESPONSE,
        payload: response,
    };
}

/**
 * Add the details of a method (Request, Response) to the state.
 * @param {*} pack
 */
export function setSelectedMethod(method) {
    return {
        type: ProtoMessages.SET_SELECTED_METHOD,
        payload: method,
    };
}
