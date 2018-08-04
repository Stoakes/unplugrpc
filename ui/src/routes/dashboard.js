import Homepage from '../views/Homepage';
import AddProto from '../containers/AddProtoContainer';
import UseProto from '../views/UseProto';

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
    { redirect: true, path: '/', to: '/home', name: 'Home' },
];

export default dashboardRoutes;
