/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
/**
 * @hidden
 */
var ScrollSyncService = /** @class */ (function () {
    function ScrollSyncService(ngZone) {
        var _this = this;
        this.ngZone = ngZone;
        this.changes = new rxjs_1.Subject();
        this.elements = [];
        this.subscriptions = new rxjs_1.Subscription();
        this.headerSubscription = new rxjs_1.Subscription();
        this.bodySubscription = new rxjs_1.Subscription();
        this.subscriptions.add(this.changes.subscribe(function (args) { return _this.scrollLeft(args); }));
    }
    ScrollSyncService.prototype.registerEmitter = function (el, sourceType) {
        var _this = this;
        this.unregister(sourceType);
        this.elements.push({ element: el, sourceType: sourceType });
        if (sourceType === "body" || sourceType === "header") {
            this.ngZone.runOutsideAngular(function () {
                var obs = rxjs_1.fromEvent(el, "scroll").pipe(operators_1.map(function (_a) {
                    var scrollLeft = _a.target.scrollLeft;
                    return ({
                        scrollLeft: scrollLeft,
                        sourceType: sourceType
                    });
                }));
                var subscription = obs.pipe(operators_1.distinctUntilChanged(function (x, y) { return (x.scrollLeft === y.scrollLeft); }), operators_1.filter(function (x) { return !_this.source || _this.source === x.sourceType; }), operators_1.tap(function (x) { return _this.source = x.sourceType; }))
                    .subscribe(function (x) { return _this.changes.next(x); });
                subscription.add(obs.pipe(operators_1.filter(function (x) { return _this.source && _this.source !== x.sourceType; }))
                    .subscribe(function () { return _this.source = undefined; }));
                if (sourceType === "body") {
                    _this.bodySubscription.add(subscription);
                }
                else {
                    _this.headerSubscription.add(subscription);
                }
            });
        }
    };
    /**
     * destroy
     */
    ScrollSyncService.prototype.destroy = function () {
        this.subscriptions.unsubscribe();
        this.headerSubscription.unsubscribe();
        this.bodySubscription.unsubscribe();
    };
    ScrollSyncService.prototype.scrollLeft = function (_a) {
        var _this = this;
        var scrollLeft = _a.scrollLeft, sourceType = _a.sourceType;
        this.ngZone.runOutsideAngular(function () {
            _this.elements
                .filter(function (x) { return sourceType !== x.sourceType; })
                .forEach(function (_a) {
                var element = _a.element;
                return element.scrollLeft = scrollLeft;
            });
        });
    };
    ScrollSyncService.prototype.unregister = function (sourceType) {
        var index = this.elements.findIndex(function (x) { return x.sourceType === sourceType; });
        if (index > -1) {
            if (sourceType === "header") {
                this.headerSubscription.unsubscribe();
                this.headerSubscription = new rxjs_1.Subscription();
            }
            else if (sourceType === "body") {
                this.bodySubscription.unsubscribe();
                this.bodySubscription = new rxjs_1.Subscription();
            }
            this.elements.splice(index, 1);
        }
    };
    ScrollSyncService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    ScrollSyncService.ctorParameters = function () { return [
        { type: core_1.NgZone }
    ]; };
    return ScrollSyncService;
}());
exports.ScrollSyncService = ScrollSyncService;
