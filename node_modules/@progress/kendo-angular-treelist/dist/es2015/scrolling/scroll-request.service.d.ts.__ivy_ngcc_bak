/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Subject } from 'rxjs';
/**
 * Arguments for the scrollTo method. Specifies to which row / column should the treelist scroll to.
 */
export interface ScrollRequest {
    row?: number;
    column?: number;
}
/**
 * @hidden
 */
export declare class ScrollRequestService {
    requests: Subject<ScrollRequest>;
    scrollTo(request: ScrollRequest): void;
}
