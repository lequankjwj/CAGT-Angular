/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/**
 * Specifies the animation settings of the Drawer
 * ([see example]({% slug interaction_drawer %}#toc-toggling-between-states)).
 *
 */
export interface DrawerAnimation {
    /**
     * Specifies the duration of the Drawer animation.
     */
    duration: number;
    /**
     * Specifies the type of the Drawer animation.
     */
    type?: 'slide';
}
