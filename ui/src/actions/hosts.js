export const HostsMessage = {
    ADD_HOSTS: 'ADD_HOSTS',
    ADD_HOST: 'ADD_HOST',
    REMOVE_HOST: 'REMOVE_HOST',
    SELECT_HOST: 'SELECT_HOST',
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

/**
 * Add an host to the list
 * The payload will directly be added to the list of hosts.
 * @param string name name of the host
 * @param string host a host is described by the couple (host, port)
 * @param string port
 */
export function addHost(host) {
    return {
        type: HostsMessage.ADD_HOST,
        payload: { name: host.name, host: host.host, port: host.port },
    };
}

/**
 * Remove an host from the list of hosts
 * @param string host a host is described by the couple (host, port)
 * @param string port
 */
export function removeHost(host, port) {
    return {
        type: HostsMessage.REMOVE_HOST,
        payload: { host: host, port: port },
    };
}

/**
 * Choose host to be contacted
 * @param string host a host is described by the couple (host, port)
 * @param string port
 */
export function selectHost(host, port) {
    return {
        type: HostsMessage.SELECT_HOST,
        payload: { host: host, port: port },
    };
}
