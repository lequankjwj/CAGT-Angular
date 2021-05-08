/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { CardHeaderComponent } from './card/card-header.component';
import { CardFooterComponent } from './card/card-footer.component';
import { CardBodyComponent } from './card/card-body.component';
import { CardActionsComponent } from './card/card-actions.component';
import { CardSeparatorDirective } from './card/directives/card-separator.directive';
import { CardTitleDirective } from './card/directives/card-title.directive';
import { CardSubtitleDirective } from './card/directives/card-subtitle.directive';
import { CardMediaDirective } from './card/directives/card-media.directive';
const cardDirectives = [
    CardTitleDirective,
    CardSubtitleDirective,
    CardSeparatorDirective,
    CardMediaDirective
];
const exportedModules = [
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    CardFooterComponent,
    CardActionsComponent,
    ...cardDirectives
];
const declarations = [...exportedModules];
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the Card component.
 */
export class CardModule {
}
CardModule.decorators = [
    { type: NgModule, args: [{
                declarations: [declarations],
                exports: [exportedModules],
                imports: [CommonModule]
            },] },
];
