import { UserProfileEnum } from "../enums/UserProfileEnum";


export const FrontEndRoutes = {
  DASHBOARD: {
    route: "/dashboard",
    profiles: [UserProfileEnum.COMMERCIAL, UserProfileEnum.FINANCIAL]
  },
  SALES_NEW: {
    route: "/sales/new",
    profiles: [UserProfileEnum.FINANCIAL]
  },
  UNAUTHORIZED: {
    route: "/unauthorized",
    profiles: [UserProfileEnum.COMMERCIAL, UserProfileEnum.FINANCIAL]
  },

  LOGIN: {
    route: "/",
  },
};
