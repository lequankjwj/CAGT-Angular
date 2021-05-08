/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable, NgZone } from '@angular/core';
import { Subscription, Subject, fromEvent } from 'rxjs';
import { distinctUntilChanged, filter, map, tap } from 'rxjs/operators';
/**
 * @hidden
 */
export class ScrollSyncService {
    constructor(ngZone) {
        this.ngZone = ngZone;
        this.changes = new Subject();
        this.elements = [];
        this.subscriptions = new Subscription();
        this.headerSubscription = new Subscription();
        this.bodySubscription = new Subscription();
        this.subscriptions.add(this.changes.subscribe(args => this.scrollLeft(args)));
    }
    registerEmitter(el, sourceType) {
        this.unregister(sourceType);
        this.elements.push({ element: el, sourceType });
        if (sourceType === "body" || sourceType === "header") {
            this.ngZone.runOutsideAngular(() => {
                const obs = fromEvent(el, "scroll").pipe(map(({ target: { scrollLeft } }) => ({
                    scrollLeft,
                    sourceType
                })));
                const subscription = obs.pipe(distinctUntilChanged((x, y) => (x.scrollLeft === y.scrollLeft)), filter(x => !this.source || this.source === x.sourceType), tap(x => this.source = x.sourceType))
                    .subscribe((x) => this.changes.next(x));
                subscription.add(obs.pipe(filter(x => this.source && this.source !== x.sourceType))
                    .subscribe(() => this.source = undefined));
                if (sourceType === "body") {
                    this.bodySubscription.add(subscription);
                }
                else {
                    this.headerSubscription.add(subscription);
                }
            });
        }
    }
    /**
     * destroy
     */
    destroy() {
        this.subscriptions.unsubscribe();
        this.headerSubscription.unsubscribe();
        this.bodySubscription.unsubscribe();
    }
    scrollLeft({ scrollLeft, sourceType }) {
        this.ngZone.runOutsideAngular(() => {
            this.elements
                .filter(x => sourceType !== x.sourceType)
                .forEach(({ element }) => element.scrollLeft = scrollLeft);
        });
    }
    unregister(sourceType) {
        const index = this.elements.findIndex(x => x.sourceType === sourceType);
        if (index > -1) {
            if (sourceType === "header") {
                this.headerSubscription.unsubscribe();
                this.headerSubscription = new Subscription();
            }
            else if (sourceType === "body") {
                this.bodySubscription.unsubscribe();
                this.bodySubscription = new Subscription();
            }
            this.elements.splice(index, 1);
        }
    }
}
ScrollSyncService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ScrollSyncService.ctorParameters = () => [
    { type: NgZone }
];
