import type { TaskDataProps } from "./taskDataTypes";

export type UserDataProps = {
  id: string;
  name: string;
  email: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
} | null;
export type UserTokenProps = string | null;
export type userAuthStoreProps = {
  userData: UserDataProps;
  userToken: UserTokenProps;
  isActive: boolean;
  isCheckingActive: boolean;
  CheckActive: () => void;
  Login: (email: string, password: string) => Promise<boolean>;
  LogOut: (userId: string) => Promise<boolean>;
  Register: (email: string, name: string, password: string) => Promise<boolean>;
  AddTask: (
    title: string,
    description: string,
    userId: string
  ) => Promise<boolean>;
  DeleteTask: (userId: string, id: string) => Promise<boolean>;
  EditTask: (
    title: string,
    description: string,
    userId: string,
    id: string
  ) => Promise<boolean>;
  getMyTasks: (userId: string) => Promise<TaskDataProps[] | []>;
  CompletedTask: (userId: string, id: string) => Promise<boolean>;
};
