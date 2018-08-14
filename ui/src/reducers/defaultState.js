export const DEFAULT_STATE = {
    hosts: [],
    proto: {
        packages: [],
        selectedPackage: {},
        call: {
            // method that will be called
            host: '',
            package: '',
            service: '',
            method: '',
        },
        response: {}, // gRPC service response
    },
};
