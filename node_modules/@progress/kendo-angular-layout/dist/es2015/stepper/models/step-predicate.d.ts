/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/**
 * Represents the callback used by the `isValid` and `validate` properties of a [`step`]({% slug api_layout_stepperstep %}).
 *
 * Receives the index of the step as an argument.
 *
 * We recommend using an arrow function for the callback to capture the `this` execution context of the current class.
 *
 * ```ts-no-run
 * stepCallback = (index: number): boolean => {
 *   return index === 3;
 * }
 * ```
 *
 */
export declare type StepPredicateFn = (stepIndex: number) => boolean;
