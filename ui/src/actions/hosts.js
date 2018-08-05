export const HostsMessage = {
    ADD_HOSTS: 'ADD_HOSTS',
};

/**
 * Add an array of hosts
 * @param array hosts an array of hosts, with an host being {name, host, port}
 */
export function addHosts(hosts) {
    return {
        type: HostsMessage.ADD_HOSTS,
        payload: hosts,
    };
}
