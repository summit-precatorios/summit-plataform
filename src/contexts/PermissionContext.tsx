'use client';

import { Permission } from '@/types';
import { createContext } from 'react';

type PermissionContextType = {
  isAllowedTo: (permission: Permission) => Promise<boolean>;
};

const defaultBehavior: PermissionContextType = {
  isAllowedTo: () => Promise.resolve(false),
};

const PermissionContext = createContext<PermissionContextType>(defaultBehavior);

export default PermissionContext;
