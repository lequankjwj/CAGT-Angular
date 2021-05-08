/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var card_component_1 = require("./card/card.component");
var card_header_component_1 = require("./card/card-header.component");
var card_footer_component_1 = require("./card/card-footer.component");
var card_body_component_1 = require("./card/card-body.component");
var card_actions_component_1 = require("./card/card-actions.component");
var card_separator_directive_1 = require("./card/directives/card-separator.directive");
var card_title_directive_1 = require("./card/directives/card-title.directive");
var card_subtitle_directive_1 = require("./card/directives/card-subtitle.directive");
var card_media_directive_1 = require("./card/directives/card-media.directive");
var cardDirectives = [
    card_title_directive_1.CardTitleDirective,
    card_subtitle_directive_1.CardSubtitleDirective,
    card_separator_directive_1.CardSeparatorDirective,
    card_media_directive_1.CardMediaDirective
];
var exportedModules = [
    card_component_1.CardComponent,
    card_header_component_1.CardHeaderComponent,
    card_body_component_1.CardBodyComponent,
    card_footer_component_1.CardFooterComponent,
    card_actions_component_1.CardActionsComponent
].concat(cardDirectives);
var declarations = exportedModules.slice();
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the Card component.
 */
var CardModule = /** @class */ (function () {
    function CardModule() {
    }
    CardModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [declarations],
                    exports: [exportedModules],
                    imports: [common_1.CommonModule]
                },] },
    ];
    return CardModule;
}());
exports.CardModule = CardModule;
