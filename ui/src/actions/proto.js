export const ProtoMessages = {
    SELECT_PACKAGE: 'SELECT_PACKAGE',
    SELECT_METHOD: 'SELECT_METHOD',
    SET_RESPONSE: 'SET_RESPONSE',
};

export function selectPackage(pack) {
    return {
        type: ProtoMessages.SELECT_PACKAGE,
        payload: pack,
    };
}

export function selectMethod(service, method) {
    return {
        type: ProtoMessages.SELECT_METHOD,
        payload: { service: service, method: method },
    };
}

export function setResponse(response) {
    return {
        type: ProtoMessages.SET_RESPONSE,
        payload: response,
    };
}
