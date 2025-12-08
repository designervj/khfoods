'use client'

import React, { useEffect } from 'react'
import { RelationshipField, useFormFields } from '@payloadcms/ui'

export const PermissionAutoFill: React.FC = (props: any) => {
  const assignedTo = useFormFields(([fields]) => fields.assignedTo)
  const { dispatchFields } = useFormFields(([fields, dispatch]) => ({ fields, dispatchFields: dispatch }))

  useEffect(() => {
    // When assignedTo value changes and has a value
    if (assignedTo?.value) {
      // Set all permissions to true
      dispatchFields({
        type: 'UPDATE',
        path: 'pages_create',
        value: true,
      })
      dispatchFields({
        type: 'UPDATE',
        path: 'pages_read',
        value: true,
      })
      dispatchFields({
        type: 'UPDATE',
        path: 'pages_update',
        value: true,
      })
      dispatchFields({
        type: 'UPDATE',
        path: 'pages_delete',
        value: true,
      })
      dispatchFields({
        type: 'UPDATE',
        path: 'products_create',
        value: true,
      })
      dispatchFields({
        type: 'UPDATE',
        path: 'products_read',
        value: true,
      })
      dispatchFields({
        type: 'UPDATE',
        path: 'products_update',
        value: true,
      })
      dispatchFields({
        type: 'UPDATE',
        path: 'products_delete',
        value: true,
      })
      dispatchFields({
        type: 'UPDATE',
        path: 'productPermission',
        value: ['read', 'write', 'delete', 'update'],
      })
      dispatchFields({
        type: 'UPDATE',
        path: 'media_create',
        value: true,
      })
      dispatchFields({
        type: 'UPDATE',
        path: 'media_read',
        value: true,
      })
      dispatchFields({
        type: 'UPDATE',
        path: 'media_update',
        value: true,
      })
      dispatchFields({
        type: 'UPDATE',
        path: 'media_delete',
        value: true,
      })
    }
  }, [assignedTo?.value, dispatchFields])

  return (
    <RelationshipField {...props} />
  )
}