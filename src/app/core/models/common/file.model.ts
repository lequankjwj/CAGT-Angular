export interface IFile {
    fileId: number;
    guidId?: string;
    name?: string;
    path: string;
    size: number;
}

export interface IFileList {
    files: IFile[];
}

export interface IFileAttach {
    fileAttachId: number;
    fileDinhKemId: number;
    name: string;
    type: number;
    size: number;
    path: string;
    forWeb?: boolean;
    checkSum?: string;
    isDelete?: boolean;
    guidId?: string;
}
