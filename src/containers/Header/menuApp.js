export const adminMenu = [
    //Manage users
    {
        name: 'menu.admin.user-manage',
        menus: [
            // subMenus: [
            //   {
            //     name: "menu.system.system-administrator.user-manage",
            //     link: "/system/user-manage",
            //   },
            //   {
            //     name: "menu.system.system-administrator.user-redux",
            //     link: "/system/user-redux",
            //   },
            // ],
            {
                name: 'menu.admin.manage-admins',
                link: '/system/manage-admins',
            },
            {
                name: 'menu.admin.manage-doctors',
                link: '/system/manage-doctors',
            },
            {
                name: 'menu.admin.manage-users',
                link: '/system/manage-users',
            },
            {
                name: 'menu.admin.crud-redux',
                link: '/system/crud-redux',
            },
            {
                name: 'menu.doctor.manage-schedule',
                link: '/doctor/manage-schedule',
            },
        ],
    },
    // Manage cnilic
    {
        name: 'menu.admin.clinic',
        menus: [
            {
                name: 'menu.admin.manage-clinic',
                link: '/system/manage-clinic',
            },
        ],
    },
    // Manage speciality
    {
        name: 'menu.admin.speciality',
        menus: [
            {
                name: 'menu.admin.manage-speciality',
                link: '/system/manage-speciality',
            },
        ],
    },
    //handlebook
    {
        name: 'menu.admin.hanlebook',
        menus: [
            {
                name: 'menu.admin.manage-hanlebook',
                link: '/system/manage-hanlebook',
            },
        ],
    },
];

export const doctorMenu = [
    {
        name: 'menu.admin.user-manage',
        menus: [
            {
                name: 'menu.doctor.manage-schedule',
                link: '/doctor/manage-schedule/',
            },
        ],
    },
];
