import { toast } from "@payloadcms/ui";
import { Access } from "payload";

export const readAccessPage: any = async ({ req }) => {
  const user = req.user;
  const payload = req.payload;
  // Allow unauthenticated read access (for public pages)
  if (!user) {
    return true;
  }

  // Super admin can see everything

  try {
    // Fetch user's permission set
    const permissions = await payload.find({
      collection: "permission",
      where: {
        "assignedTo.id": {
          equals: user.id,
        },
      },
      limit: 1,
    });

    // No permissions found - deny access
    if (!permissions.docs.length) {
      return false;
    }

    const userPermission = permissions.docs[0];
    const hasReadPermission = userPermission.pages_read;

    // If user doesn't have read permission, deny access
    if (!hasReadPermission) {
      return false;
    }

    if (user.collection === "administrators" && user.role === "admin") {
      return true;
    }

    const parentOrganization = userPermission.parentOrganization;
    // If no parent organization is set, user can only see their own page

    if (user.collection == "administrators" && user.role == "client") {
      const websites = await payload.find({
        collection: "websites",
        where: {
          "tenantID.id": {
            equals: user.id,
          },
        },
      });

      if (!websites.docs.length) {
        return false; // or return an empty filter {}
      }

      const id = websites.docs[0].id;

      return {
        website: {
          equals: id,
        },
      };
    }

    // Get the parent organization ID
    const parentOrgId =
      typeof parentOrganization === "object" && parentOrganization
        ? parentOrganization.id
        : parentOrganization;

    // Find websites belonging to this parent organization
    const websites = await payload.find({
      collection: "websites",
      where: {
        "tenantID.id": {
          equals: parentOrgId,
        },
      },
    });

    // Get all website IDs
    const websiteIds = websites.docs.map((website) => website.id);

    // If no websites found, user can see their own pages
    if (!websiteIds.length) {
      return {
        createdBy: {
          equals: user.id,
        },
      };
    }

    // Return query to show pages linked to parent organization's websites
    return {
      website: {
        in: websiteIds as string[],
      },
    };
  } catch (error) {
    console.error("Error in pages read access:", error);
    return false;
  }
};

export const createAccessPage: Access = async ({ req }) => {
  const user = req.user;
  const payload = req.payload;

  if (!user) {
    return false;
  }

  const permissions = await payload.find({
    collection: "permission",
    where: {
      "assignedTo.id": {
        equals: user.id,
      },
    },
    limit: 1,
  });

  if (user.collection == "administrators" && user.role == "admin") {
    return true;
  }

  const userPermission = permissions.docs[0];
  const createPermission = userPermission.pages_create;

  if (createPermission) {
    return true;
  } else {
    return false;
  }
};

export const deleteAccessPage: Access = async ({ req }) => {
  const user = req.user;
  const payload = req.payload;

  if (!user) {
    return false;
  }

  const permissions = await payload.find({
    collection: "permission",
    where: {
      "assignedTo.id": {
        equals: user.id,
      },
    },
    limit: 1,
  });

  if (user.collection == "administrators" && user.role == "admin") {
    return true;
  }

  const userPermission = permissions.docs[0];
  const deletePermission = userPermission.pages_delete;

  if (deletePermission) {
    return true;
  } else {
    return false;
  }
};

export const updateAccessPage: Access = async ({ req }) => {
  const user = req.user;
  const payload = req.payload;

  if (!user) {
    return false;
  }

  const permissions = await payload.find({
    collection: "permission",
    where: {
      "assignedTo.id": {
        equals: user.id,
      },
    },
    limit: 1,
  });

  if (user.collection == "administrators" && user.role == "admin") {
    return true;
  }

  const userPermission = permissions.docs[0];
  const updatePermission = userPermission.pages_update;

  if (updatePermission) {
    return true;
  } else {
    return false;
  }
};

export const readAccessAdmin: any = async ({ req }) => {
  const user = req.user;
  const payload = req.payload;

  const permissions = await payload.find({
    collection: "permission",
    where: {
      "assignedTo.id": {
        equals: user?.id,
      },
    },
  });

  if (user?.collection == "administrators") {
    if (user.role == "admin") {
      return true;
    }

    if (user.role == "business" && permissions.docs[0].administration_read) {
      return {
        createdBy: {
          equals: user?.id,
        },
      };
    }

    if (user.role == "client" && permissions.docs[0].administration_read) {
      const allusers = await payload.find({
        collection: "permission",
        where: {
          "parentOrganization.id": {
            equals: user.id,
          },
        },
      });

      const users_only = [
        ...allusers.docs.map((d: any) => {
          return d.assignedTo?.id;
        }),
        user.id,
      ];

      return {
        id: {
          in: users_only,
        },
      };
    }

    return false;
  }

  return true;
};
