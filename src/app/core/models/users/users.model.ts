export interface IGroupUser {
    id: number;
    groupName: string;
}

export interface IUser {
    id: number;
    userId: number;
    userName: string;
    firstName: string;
    lastName: string;
    groupName: string;
    parentId: string;
    address: string;
    email: string;
    mobileNumber: string;
    phoneNumber: string;
    isActive: boolean;
}

export interface IUserTree {
    id: number;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    mobileNumber: string;
    address: string;
}
