/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/**
 * An interface for the Drawer items.
 */
export interface DrawerItem {
    /**
     * The CSS classes that will be rendered on the item element of the Drawer.
     * Supports the type of values that are supported by [`ngClass`]({{ site.data.urls.angular['ngclassapi'] }}).
     */
    cssClass?: any;
    /**
     * The CSS styles that will be rendered on the item element of the Drawer.
     * Supports the type of values that are supported by [`ngStyle`]({{ site.data.urls.angular['ngstyleapi'] }}).
     */
    cssStyle?: any;
    /**
     * Specifies if the Drawer item is disabled.
     */
    disabled?: boolean;
    /**
     * Defines the name for an existing icon in a Kendo UI theme.
     * The icon is rendered inside the Drawer item by a `span.k-icon` element.
     */
    icon?: string;
    /**
     * Specifies if the Drawer item is initially selected.
     */
    selected?: boolean;
    /**
     * Specifies if this is a separator item.
     * If set to `true`, only the `cssClass` and `cssStyle` fields will be rendered.
     */
    separator?: boolean;
    /**
     * Specifies the text content of the Drawer item.
     */
    text?: string;
}
