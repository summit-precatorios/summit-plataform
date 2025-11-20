'use client';

import { AuthContext } from '@/contexts/AuthContext';
import PermissionContext from '@/contexts/PermissionContext';
import { Permission } from '@/types';
import React, {
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useRef,
} from 'react';

type Props = {
  children: ReactNode;
};

type PermissionCache = {
  [key: string]: boolean;
};

export function PermissionProvider({ children }: Props) {
  const { user } = useContext(AuthContext);
  const cacheRef = useRef<PermissionCache>({});

  const fetchPermission = useCallback(
    async (permission: Permission) => {
      if (!user) return false;

      return user.roles.includes(permission);
    },
    [user]
  );

  const isAllowedTo = useMemo(
    () =>
      async (permission: Permission): Promise<boolean> => {
        if (cacheRef.current[permission] !== undefined) {
          return cacheRef.current[permission];
        }

        const isAllowed = await fetchPermission(permission);
        cacheRef.current[permission] = isAllowed;

        return isAllowed;
      },
    [fetchPermission]
  );

  // Clear cache when user changes
  React.useEffect(() => {
    cacheRef.current = {};
  }, [user]);

  return (
    <PermissionContext.Provider value={{ isAllowedTo }}>
      {children}
    </PermissionContext.Provider>
  );
}
