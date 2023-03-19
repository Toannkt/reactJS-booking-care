export const adminMenu = [
  //Manage users
  {
    name: "menu.admin.user-manage",
    menus: [
      {
        name: "menu.admin.user-doctor",
        link: "/system/user-doctor",
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
      },
      {
        name: "menu.admin.user-admin",
        link: "/system/user-admin",
      },
      {
        name: "menu.admin.user-redux",
        link: "/system/user-redux",
      },
      {
        name: "menu.admin.user-crud",
        link: "/system/user-crud",
      },
    ],
  },
  // Manage cnilic
  {
    name: "menu.admin.clinic",
    menus: [
      {
        name: "menu.admin.manage-clinic",
        link: "/system/manage-clinic",
      },
    ],
  },
  // Manage speciality
  {
    name: "menu.admin.speciality",
    menus: [
      {
        name: "menu.admin.manage-speciality",
        link: "/system/manage-speciality",
      },
    ],
  },
  //handlebook
  {
    name: "menu.admin.hanlebook",
    menus: [
      {
        name: "menu.admin.manage-hanlebook",
        link: "/system/manage-hanlebook",
      },
    ],
  },
];
