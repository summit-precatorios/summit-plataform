export type Permission = string;

export type User = {
  name: string;
  email: string;
  image: string | null;
  document: string;
  isActive: boolean;
  roles: string[];
};

export enum Role {
  User = 'common-user',
  Admin = 'admin-user',
  AccountActivator = 'account-activator',
}
