/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { StepPredicateFn } from './step-predicate';
/**
 * An interface for the steps of the Stepper component.
 */
export interface StepperStep {
    /**
     * The CSS classes that will be rendered on the step element of the Stepper.
     * Supports the type of values that are supported by [`ngClass`]({{ site.data.urls.angular['ngclassapi'] }}).
     */
    cssClass?: any;
    /**
     * The CSS styles that will be rendered on the item element of the Drawer.
     * Supports the type of values that are supported by [`ngStyle`]({{ site.data.urls.angular['ngstyleapi'] }}).
     */
    cssStyle?: any;
    /**
     * Specifies whether the step is disabled.
     */
    disabled?: boolean;
    /**
     * Specifies if a step is valid.
     * By default only previous steps are validated (This behavior can be overridden by setting the `validate` property).
     *
     * ([More information and example]({% slug step_validation_stepper %})).
     */
    isValid?: boolean | StepPredicateFn;
    /**
     * Specifies if a step should be validated. This property overrides the default validation behavior.
     *
     * ([More information and example]({% slug step_validation_stepper %})).
     */
    validate?: boolean | StepPredicateFn;
    /**
     * Defines the name of an existing icon in a Kendo UI theme.
     * If provided, the icon will be rendered inside the step indicator by a span.k-icon element, instead of the default numeric or text content.
     */
    icon?: string;
    /**
     * Defines a CSS class or multiple classes separated by spaces which are applied to a span element.
     * Allows the usage of custom icons, rendered inside the step indicator instead of the default numeric or text content.
     */
    iconClass?: string;
    /**
     * Specifies the text content of the step label.
     */
    label?: string;
    /**
     * Specifies that the step is optional. An `Optional` label will be rendered.
     */
    optional?: boolean;
    /**
     * Specifies custom content rendered inside the step indicator.
     * The numeric step index is rendered by default.
     */
    text?: string;
}
