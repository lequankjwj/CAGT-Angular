/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NgModule } from '@angular/core';
import { EventsOutsideAngularDirective } from './events-outside-angular.directive';
/**
 * @hidden
 */
export class EventsModule {
}
EventsModule.decorators = [
    { type: NgModule, args: [{
                declarations: [EventsOutsideAngularDirective],
                exports: [EventsOutsideAngularDirective]
            },] },
];
