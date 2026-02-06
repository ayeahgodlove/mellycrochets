export const accessControlProvider = {
  can: async ({ resource, action, params }) => {
    const user = params?.user; // Get user from params

    if (!user) {
      return { can: false };
    }

    // Define role-based permissions
    const role = user.role;

    const permissions = {
      admin: {
        can: ["create", "edit", "delete", "show", "list"],
      },
      editor: {
        can: ["create", "edit", "show", "list"],
      },
      user: {
        can: ["show", "list"],
      },
    };

    // Check if the user has access to the resource and action
    const canAccess = permissions[role]?.can.includes(action) ?? false;

    return { can: canAccess };
  },
};
