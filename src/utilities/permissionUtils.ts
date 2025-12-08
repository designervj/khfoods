// import { Access, PayloadRequest } from "payload";

// export interface UserPermissions {
//   pagePermission?: string[];
//   productPermission?: string[];
//   productcatPermission?: string[];
//   userPermission?: string[];
// }

// /**
//  * Check if user has specific permission for a module
//  */
// export const hasPermission = async (
//   req: PayloadRequest,
//   module: "page" | "product" | "productcat" | "user",
//   action: "read" | "write" | "update" | "delete",
// ): Promise<boolean> => {
//   const user = req.user;
//   const { payload } = req;

//   if (!user) return false;

//   // Super admin has all permissions
//   if (user.collection === "administrators" && user.role === "superadmin") {
//     return true;
//   }

//   // API requests bypass permission checks
//   if (req.url?.includes("/api")) {
//     return true;
//   }

//   try {
//     // Find permissions for the user
//     const permissions = await payload.find({
//       collection: "permission",
//       where: {
//         selectedAdministrators: {
//           equals: user.id,
//         },
//       },
//     });

//     if (!permissions.docs.length) return false;

//     // Check if user has the required permission
//     const permissionField = `${module}Permission`;

//     for (const permission of permissions.docs) {
//       const modulePermissions = permission[permissionField] as string[];
//       if (modulePermissions && modulePermissions.includes(action)) {
//         return true;
//       }
//     }

//     return false;
//   } catch (error) {
//     console.error("Error checking permissions:", error);
//     return false;
//   }
// };

// /**
//  * Get user's permissions for a specific module
//  */
// export const getUserPermissions = async (
//   req: PayloadRequest,
//   userId: string,
// ): Promise<UserPermissions | null> => {
//   const { payload } = req;

//   try {
//     const permissions = await payload.find({
//       collection: "permission",
//       where: {
//         selectedAdministrators: {
//           equals: userId,
//         },
//       },
//     });

//     if (!permissions.docs.length) return null;

//     // Merge all permissions
//     const mergedPermissions: UserPermissions = {};

//     permissions.docs.forEach((permission) => {
//       if (permission.pagePermission) {
//         mergedPermissions.pagePermission = [
//           ...(mergedPermissions.pagePermission || []),
//           ...permission.pagePermission,
//         ];
//       }
//       if (permission.productPermission) {
//         mergedPermissions.productPermission = [
//           ...(mergedPermissions.productPermission || []),
//           ...permission.productPermission,
//         ];
//       }
//       if (permission.productcatPermission) {
//         mergedPermissions.productcatPermission = [
//           ...(mergedPermissions.productcatPermission || []),
//           ...permission.productcatPermission,
//         ];
//       }
//       if (permission.userPermission) {
//         mergedPermissions.userPermission = [
//           ...(mergedPermissions.userPermission || []),
//           ...permission.userPermission,
//         ];
//       }
//     });

//     // Remove duplicates
//     Object.keys(mergedPermissions).forEach((key) => {
//       mergedPermissions[key] = [...new Set(mergedPermissions[key])];
//     });

//     return mergedPermissions;
//   } catch (error) {
//     console.error("Error getting user permissions:", error);
//     return null;
//   }
// };

// /**
//  * Create dynamic access function for a specific module and action
//  */
// export const createPermissionBasedAccess = (
//   module: "page" | "product" | "productcat" | "user",
//   action: "read" | "write" | "update" | "delete",
// ): Access => {
//   return async ({ req }) => {
//     const user = req.user;

//     if (!user) return false;

//     // Check if user has permission
//     const hasAccess = await hasPermission(req, module, action);

//     if (hasAccess) return true;

//     // Fallback: Admin can access their own created records
//     if (user.collection === "administrators" && user.role === "admin") {
//       return {
//         createdBy: {
//           equals: user.id,
//         },
//       };
//     }

//     return false;
//   };
// };

// /**
//  * Create comprehensive access object for a collection
//  */
// export const createModuleAccess = (module: "page" | "product" | "productcat" | "user") => {
//   return {
//     read: createPermissionBasedAccess(module, "read"),
//     create: createPermissionBasedAccess(module, "write"),
//     update: createPermissionBasedAccess(module, "update"),
//     delete: createPermissionBasedAccess(module, "delete"),
//   };
// };
