# Permission-Based Access Control System

## Overview

This system implements dynamic, database-driven access control for your Payload CMS application. Users are assigned permissions through the Permission Sets collection, and access is automatically enforced across all collections.

## How It Works

### 1. Permission Structure
- **Module-based**: Permissions are organized by modules (Page, Product, Product Category, User)
- **Action-based**: Each module supports read, write, update, and delete actions
- **User Assignment**: Multiple administrators can be assigned to a single permission set

### 2. Database Structure

#### Permission Collection (`permission`)
```typescript
{
  selectedAdministrators: string[], // Array of administrator IDs
  pagePermission: string[],         // ['read', 'write', 'update', 'delete']
  productPermission: string[],      // ['read', 'write', 'update', 'delete']
  productcatPermission: string[],   // ['read', 'write', 'update', 'delete']
  userPermission: string[],         // ['read', 'write', 'update', 'delete']
  parent: string,                   // Parent administrator ID
  createdFor: string,               // Business/organization ID
}
```

## Usage Guide

### Creating Permission Sets

1. **Navigate to Admin Panel**: Go to `localhost:3000/admin/collections/permission/create`

2. **Select Administrators**: Choose users who should receive these permissions

3. **Set Module Permissions**: For each module, select allowed actions:
   - **Read**: View/list items
   - **Write**: Create new items
   - **Update**: Modify existing items
   - **Delete**: Remove items

4. **Save**: The permissions are immediately active

### Permission Hierarchy

1. **Super Admin**: Full access to everything (bypasses permission checks)
2. **Permission-based**: Users with specific permissions from Permission Sets
3. **Creator Access**: Users can access items they created (fallback)
4. **No Access**: Default deny for unauthorized users

### Testing Permissions

#### API Endpoints

1. **Check User Permissions**
   ```
   GET /api/permissions?userId={userId}
   ```
   Returns all permission sets for a user.

2. **Test Specific Permission**
   ```
   GET /api/check-permission?userId={userId}&module={module}&action={action}
   ```
   
   Parameters:
   - `userId`: Administrator ID
   - `module`: `page`, `product`, `productcat`, or `user`
   - `action`: `read`, `write`, `update`, or `delete`

#### Example Usage
```
GET /api/check-permission?userId=12345&module=product&action=read
```

Response:
```json
{
  "userId": "12345",
  "user": {
    "id": "12345",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "admin"
  },
  "module": "product",
  "action": "read",
  "hasPermission": true
}
```

### Collections Using Permission System

1. **Websites** (`websites`): Uses `page` module permissions
2. **Products** (`products`): Uses `product` module permissions
3. **Categories** (`categories`): Uses `productcat` module permissions
4. **Administrators** (`administrators`): Uses `user` module permissions

## Implementation Details

### Permission Utils (`src/utilities/permissionUtils.ts`)

Key functions:
- `hasPermission()`: Check if user has specific permission
- `getUserPermissions()`: Get all permissions for a user
- `createPermissionBasedAccess()`: Create access function for specific module/action
- `createModuleAccess()`: Create complete access object for a collection

### Access Control Flow

1. **Request comes in** → User authentication check
2. **Super admin check** → If super admin, allow all
3. **API request check** → If API call, allow
4. **Database query** → Find permission sets for user
5. **Permission check** → Verify user has required permission for module/action
6. **Fallback check** → Check if user owns the resource
7. **Access decision** → Allow or deny

## Best Practices

### 1. Permission Set Design
- Create role-based permission sets (e.g., "Editor", "Viewer", "Manager")
- Assign multiple users to the same permission set for consistency
- Use descriptive names for permission sets

### 2. Security
- Always test permissions after changes
- Use principle of least privilege
- Regularly audit permission assignments

### 3. Performance
- Permissions are cached per request
- Database queries are optimized
- Fallback to owner-based access for performance

## Troubleshooting

### Common Issues

1. **User can't access anything**
   - Check if user is assigned to any permission sets
   - Verify permission sets have the required permissions
   - Ensure user role is not blocking access

2. **Super admin losing access**
   - Super admins bypass all permission checks
   - Check user role is exactly 'superadmin'

3. **API calls failing**
   - API calls should bypass permissions
   - Check URL contains '/api'

### Debug Steps

1. **Check user permissions**:
   ```
   GET /api/permissions?userId={userId}
   ```

2. **Test specific access**:
   ```
   GET /api/check-permission?userId={userId}&module=product&action=read
   ```

3. **Check user role**:
   ```javascript
   console.log(user.role, user.collection)
   ```

## Migration Guide

### From Static to Dynamic Permissions

1. **Backup existing access functions**
2. **Import permission utils**:
   ```typescript
   import { createModuleAccess } from '@/utilities/permissionUtils'
   ```

3. **Replace access object**:
   ```typescript
   // Before
   access: {
     read: anyone,
     create: authenticated,
     update: authenticated,
     delete: authenticated,
   }

   // After
   access: createModuleAccess('product')
   ```

4. **Test thoroughly**
5. **Create initial permission sets**

This system provides flexible, scalable, and secure access control that grows with your application needs.