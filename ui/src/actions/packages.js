export const PackagesMessages = {
    SET_PACKAGES: 'SET_PACKAGES',
    SET_SELECTED_PACKAGE: 'SET_SELECTED_PACKAGE',
};

/**
 * Set the list of every referenced package to the state
 * @param {*} packs
 */
export function setPackages(packs) {
    return {
        type: PackagesMessages.SET_PACKAGES,
        payload: packs,
    };
}

/**
 * Add the details of a package to the state.
 * @param {*} pack
 */
export function setSelectedPackage(pack) {
    return {
        type: PackagesMessages.SET_SELECTED_PACKAGE,
        payload: pack,
    };
}
