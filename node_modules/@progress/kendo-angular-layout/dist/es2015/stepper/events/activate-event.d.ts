/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { StepperComponent } from '../stepper.component';
import { PreventableEvent } from '../../common/preventable-event';
/**
 * Arguments for the `activate` event of the Stepper.
 */
export declare class StepperActivateEvent extends PreventableEvent {
    /**
     * The index of the activated step in the `steps` collection.
     */
    index: number;
    /**
     * The activated step.
     */
    step: any;
    /**
     * The DOM event that triggered the step activation.
     */
    originalEvent: any;
    /**
     * The Stepper that triggered the event.
     */
    sender: StepperComponent;
}
