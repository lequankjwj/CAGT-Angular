/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var animations_1 = require("@angular/animations");
/**
 * @hidden
 */
function miniExpandPush(duration, width, miniWidth) {
    return [
        animations_1.style({ overflow: 'hidden', flexBasis: miniWidth + "px" }),
        animations_1.animate(duration + "ms ease-in", animations_1.style({ flexBasis: width + "px" }))
    ];
}
/**
 * @hidden
 */
function miniCollapsePush(duration, width, miniWidth) {
    return [
        animations_1.style({ overflow: 'hidden', flexBasis: width + "px" }),
        animations_1.animate(duration + "ms ease-in", animations_1.style({ flexBasis: miniWidth + "px" }))
    ];
}
/**
 * @hidden
 *
 */
function miniExpandOverlay(duration, width, miniWidth) {
    return [
        animations_1.style({ width: miniWidth + "px" }),
        animations_1.animate(duration + "ms ease-in", animations_1.style({ overflow: 'hidden', width: width + "px" }))
    ];
}
/**
 * @hidden
 */
function expandPush(duration, width) {
    return [
        animations_1.style({ overflow: 'hidden', flexBasis: '0px' }),
        animations_1.animate(duration + "ms ease-in", animations_1.style({ flexBasis: width + "px" }))
    ];
}
/**
 * @hidden
 */
function collapsePush(duration, width) {
    return [
        animations_1.style({ flexBasis: width + "px" }),
        animations_1.animate(duration + "ms ease-in", animations_1.style({ overflow: 'hidden', flexBasis: "0px" }))
    ];
}
/**
 * @hidden
 */
function expandRTLOverlay(duration) {
    return [
        animations_1.style({ transform: "translateX(100%)" }),
        animations_1.animate(duration + "ms ease-in", animations_1.style({ overflow: 'hidden', transform: "translateX(0)" }))
    ];
}
/**
 * @hidden
 */
function expandOverlay(duration, position) {
    var translateDir = position !== 'end' ? "-100%" : "100%";
    return [
        animations_1.style({ transform: "translateX(" + translateDir + ")" }),
        animations_1.animate(duration + "ms ease-in", animations_1.style({ overflow: 'hidden', transform: "translateX(0)" }))
    ];
}
/**
 * @hidden
 */
function miniCollapseOverlay(duration, width, miniWidth) {
    return [
        animations_1.style({ width: width + "px" }),
        animations_1.animate(duration + "ms ease-in", animations_1.style({ overflow: 'hidden', width: miniWidth + "px" }))
    ];
}
/**
 * @hidden
 */
function collapseOverlay(duration, position) {
    var translateDir = position !== 'end' ? '-100%' : '100%';
    return [
        animations_1.style({ transform: "translateX(0)" }),
        animations_1.animate(duration + "ms ease-in", animations_1.style({ overflow: 'hidden', transform: "translateX(" + translateDir + ")" }))
    ];
}
/**
 * @hidden
 */
function collapseRTLOverlay(duration) {
    return [
        animations_1.style({ transform: "translateX(0)" }),
        animations_1.animate(duration + "ms ease-in", animations_1.style({ overflow: 'hidden', transform: "translateX(100%)" }))
    ];
}
/**
 * @hidden
 */
function expandAnimation(settings) {
    var duration = settings.animation.duration;
    var width = settings.width;
    var miniWidth = settings.miniWidth;
    var mode = settings.mode;
    var mini = settings.mini;
    var rtl = settings.rtl;
    var position = settings.position;
    if (mini && mode === 'push') {
        return miniExpandPush(duration, width, miniWidth);
    }
    if (!mini && mode === 'push') {
        return expandPush(duration, width);
    }
    if (!mini && mode === 'overlay') {
        return rtl ? expandRTLOverlay(duration) : expandOverlay(duration, position);
    }
    if (mini && mode === 'overlay') {
        return miniExpandOverlay(duration, width, miniWidth);
    }
}
exports.expandAnimation = expandAnimation;
/**
 * @hidden
 */
function collapseAnimation(settings) {
    var duration = settings.animation.duration;
    var width = settings.width;
    var miniWidth = settings.miniWidth;
    var mode = settings.mode;
    var mini = settings.mini;
    var rtl = settings.rtl;
    var position = settings.position;
    if (mini && mode === 'push') {
        return miniCollapsePush(duration, width, miniWidth);
    }
    if (!mini && mode === 'push') {
        return collapsePush(duration, width);
    }
    if (!mini && mode === 'overlay') {
        return rtl ? collapseRTLOverlay(duration) : collapseOverlay(duration, position);
    }
    if (mini && mode === 'overlay') {
        return miniCollapseOverlay(duration, width, miniWidth);
    }
}
exports.collapseAnimation = collapseAnimation;
