import Homepage from '../views/Homepage';
import AddProto from '../containers/AddProtoContainer';
import Hosts from '../containers/HostsContainer';
import UseProto from '../containers/UseProtoContainer';

const dashboardRoutes = [
    {
        path: '/home',
        name: 'Homepage',
        icon: 'pe-7s-graph',
        component: Homepage,
    },
    {
        path: '/new',
        name: 'Add Protofile',
        icon: 'pe-7s-user',
        component: AddProto,
    },
    {
        path: '/use',
        name: 'Use',
        icon: 'pe-7s-news-paper',
        component: UseProto,
    },
    {
        path: '/hosts',
        name: 'Hosts',
        icon: 'pe-7s-news-paper',
        component: Hosts,
    },
    { redirect: true, path: '/', to: '/home', name: 'Home' },
];

export default dashboardRoutes;
