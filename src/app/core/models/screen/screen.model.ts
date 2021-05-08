export interface IFunction {
    functionId: number;
    name: string;
    actionName: string;
    controllerName: string;
    order: number;
    notes: string;
    groupName: string;
    parentId: number;
    cssClass: string;
    cssBadge: string;
    isAllow: boolean;

    // expand
    totalChildFunction?: number;
    totalAction?: number;
}

export interface IAction {
    actionId: number;
    name: string;
    actionName: string;
    controllerName: string;
    notes: string;
    actionType: number;
}
