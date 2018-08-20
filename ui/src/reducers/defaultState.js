export const DEFAULT_STATE = {
    hosts: [],
    proto: {
        packages: [],
        selectedMethod: {},
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
