/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    // {
    //     id   : 'example',
    //     title: 'example',
    //     type : 'basic',
    //     icon : 'feather:message-circle',
    //     link : '/example'
    // },
    {
        id   : 'enquires',
        title: 'Enquires',
        type : 'collapsable',
        icon : 'feather:file-text',
        children: [
            {
                id   : 'enquires.dashboard',
                title: 'Dashboard',
                type : 'basic',
                link : '/enquires/dashboard'
            },
            {
                id   : 'enquires.dashboard',
                title: 'New Enquires',
                type : 'basic',
                link : '/enquires/newenquires'
            },
            {
                id   : 'enquires.dashboard',
                title: 'Portal Not Access',
                type : 'basic',
                link : '/enquires/portal'
            },
            {
                id   : 'enquires.dashboard',
                title: 'Login Log',
                type : 'basic',
                link : '/enquires/loginlog'
            }
        ]
    },
    {
        id   : 'cases',
        title: 'Cases',
        type : 'collapsable',
        icon : 'feather:briefcase',
        children: [
            {
                id   : 'unallocated',
                title: 'Unallocated',
                type : 'basic',
                link : '/cases/unallocated'
            },
            {
                id   : 'enquires.allocated',
                title: 'Allocated',
                type : 'basic',
                link : '/cases/allocated'
            },
        ]
    },
    {
        id   : 'messaging',
        title: 'Messaging',
        type : 'collapsable',
        icon : 'feather:message-circle',
        children: [
            {
                id   : 'unallocated',
                title: 'Marketing SMS File List',
                type : 'basic',
                link : ''
            },
            {
                id   : 'enquires.allocated',
                title: 'SMS Draft List',
                type : 'basic',
                link : '/board/inventory'
            },
            {
                id   : 'enquires.openbulk',
                title: 'Mobile List',
                type : 'basic',
                link : '/board/inventory'
            }
        ]
    },
    {
        id   : 'gst',
        title: 'GST',
        type : 'collapsable',
        icon : 'feather:dollar-sign',
        children: [
            {
                id   : 'gst',
                title: 'Dashboard',
                type : 'basic',
                link : '/gst/gstdashboard'
            },
            {
                id   : 'gst',
                title: 'GST Cases',
                type : 'basic',
                link : '/gst/gstcases'
            }
        ]
    },
    {
        id   : 'Tasks',
        title: 'Tasks',
        type : 'basic',
        icon : 'heroicons_outline:check-circle',
        link : '/Tasks/tasks'
    },
    {
        id   : 'Reports',
        title: 'Reports',
        type : 'collapsable',
        icon : 'mat_outline:list_alt',
        children: [
            {
                id   : 'unallocated',
                title: 'Estimate Approval',
                type : 'basic',
                link : ''
            },
            {
                id   : 'enquires.allocated',
                title: 'Approval Sent',
                type : 'basic',
                link : '/board/inventory'
            },
            {
                id   : 'enquires.openbulk',
                title: 'GST Lodgement',
                type : 'basic',
                link : '/board/inventory'
            },
            {
                id   : 'enquires.openbulk',
                title: 'Taxreturn Lodgement',
                type : 'basic',
                link : '/board/inventory'
            }
        ]
    },
    {
        id   : 'users',
        title: 'Users',
        type : 'collapsable',
        icon : 'feather:users',
        children: [
            {
                id   : 'torsusers',
                title: 'Tors Users',
                type : 'basic',
                link : '/users/tors-users'
            },
            {
                id   : 'teamusers',
                title: 'Teams Users',
                type : 'basic',
                link : '/users/team-users'
            },
            {
                id   : 'attendance',
                title: 'Attendance Report',
                type : 'basic',
                link : '/users/attendance-report'
            }
        ]
    },
    {
        id   : 'logout',
        title: 'Log Out',
        type : 'basic',
        icon : 'mat_outline:logout',
        link : '/sign-out'
    },

];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
