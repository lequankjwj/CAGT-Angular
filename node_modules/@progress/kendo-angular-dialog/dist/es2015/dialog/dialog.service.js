/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
// tslint:disable:max-line-length
import { Subject, merge } from 'rxjs';
import { take, filter, share, map } from 'rxjs/operators';
import { Injectable, ComponentFactoryResolver, Renderer2, TemplateRef, isDevMode, Inject } from '@angular/core';
import { DialogComponent } from './dialog.component';
import { DialogContainerService } from './dialog-container.service';
import { DialogCloseResult, DialogRef } from './dialog-settings';
import { DialogContentBase } from './dialog-content-base';
import { PreventableEvent } from '../common/preventable-event';
import { isString } from '../common/util';
const isNotComponent = (component) => isString(component) || component instanceof TemplateRef;
const ɵ0 = isNotComponent;
class DialogInjector {
    constructor(getDialogRef, parentInjector) {
        this.getDialogRef = getDialogRef;
        this.parentInjector = parentInjector;
    }
    get(token, notFoundValue) {
        if (token === DialogRef) {
            return this.getDialogRef();
        }
        return this.parentInjector.get(token, notFoundValue);
    }
}
/**
 * A service for opening Dialog windows dynamically
 * ([see example]({% slug service_dialog %})).
 */
export class DialogService {
    constructor(
    /**
     * @hidden
     */
    resolver, containerService) {
        this.resolver = resolver;
        this.containerService = containerService;
    }
    /**
     * Opens a Dialog window. Requires an element in the application that uses the
     * [`kendoDialogContainer`]({% slug api_dialog_dialogcontainerdirective %}) directive.
     * Created Dialogs will be mounted in the DOM directly after that element.
     *
     * @param {DialogAction} options - The options that define the Dialog.
     * @returns {DialogRef} - A reference to the Dialog object and the convenience properties.
     *
     * @example
     *
     * ```ts-no-run
     * _@Component({
     *   selector: 'my-app',
     *   template: `
     *     <button kendoButton (click)="open()">Harmless button</button>
     *     <div kendoDialogContainer></div>
     *   `
     * })
     * export class AppComponent {
     *     constructor( private dialogService: DialogService ) {}
     *
     *     public open() {
     *         var dialog = this.dialogService.open({
     *           title: "Please confirm",
     *           content: "Are you sure?",
     *           actions: [
     *             { text: "No" },
     *             { text: "Yes", primary: true }
     *           ]
     *         });
     *
     *         dialog.result.subscribe((result) => {
     *           if (result instanceof DialogCloseResult) {
     *             console.log("close");
     *           } else {
     *             console.log("action", result);
     *           }
     *         });
     *     }
     * }
     * ```
     *
     */
    open(options) {
        const factory = this.resolver.resolveComponentFactory(DialogComponent);
        const container = options.appendTo || this.containerService.container;
        if (!container) {
            throw new Error(`
Cannot attach dialog to the page.
Add an element that uses the kendoDialogContainer directive, or set the 'appendTo' property.
See https://www.telerik.com/kendo-angular-ui/components/dialogs/dialog/service/.
          `);
        }
        // create DialogRef to (1) pass as result, (2) provide through injector
        const dialogRef = {
            close: () => {
                /* noop */
            },
            content: null,
            dialog: null,
            result: null
        };
        return this.initializeDialog(options.content, factory, container, dialogRef, options);
    }
    initializeDialog(component, factory, container, dialogRef, options) {
        const content = this.contentFrom(component, container, dialogRef);
        const dialog = container.createComponent(factory, undefined, undefined, content.nodes);
        dialogRef.dialog = dialog;
        dialog.changeDetectorRef.markForCheck();
        // copy @Input options to dialog instance
        this.applyOptions(dialog.instance, options);
        // create close handler and result stream
        const apiClose = new Subject();
        const close = (e) => {
            if (e instanceof PreventableEvent) {
                e = new DialogCloseResult();
            }
            apiClose.next(e || new DialogCloseResult());
            if (content.componentRef) {
                content.componentRef.destroy();
            }
            dialog.destroy();
        };
        const result = merge(apiClose, 
        // triggered when the titlebar or actions are defined in DialogSettings
        merge(dialog.instance.close, dialog.instance.action).pipe(map(e => (e instanceof PreventableEvent ? new DialogCloseResult() : e)), filter(e => {
            if (options.preventAction) {
                // add dialogRef only when using component
                const dialogRefParameter = isNotComponent(component) ? undefined : dialogRef;
                return !options.preventAction(e, dialogRefParameter);
            }
            return true;
        }))).pipe(take(1), 
        // Takes care for multiple subscriptions:
        // We subscribe internaly and the user may subscribe to get a close result - dialog.result.subscribe().
        // This causes multiple subscriptions to the same source and thus multiple emissions. share() solves that.
        share());
        result.subscribe(close);
        dialogRef.close = close;
        dialogRef.result = result;
        if (component && isDevMode()) {
            const hasContentTitle = content.nodes[0] && content.nodes[0].length > 0;
            const hasContentActions = content.nodes[2] && content.nodes[2].length > 0;
            const multipleTitles = options.title && hasContentTitle;
            const multipleActions = options.actions && hasContentActions;
            if (component.prototype instanceof DialogContentBase) {
                // content component extends DialogContentBase
                if (multipleTitles || multipleActions) {
                    console.warn(`
                    Multiple Title and/or Actions configurations detected.
                    When using a component as content, provide the title and actions either in the component's markup
                    or via the title and actions properties of the DialogSettings object, but not both.
                    See https://www.telerik.com/kendo-angular-ui/components/dialogs/dialog/service/#toc-passing-title-content-and-actions-as-a-single-component'`);
                }
            }
            else {
                if (hasContentTitle || hasContentActions) {
                    console.warn(`
                    When Title and/or Actions markup is provided in content component's template,
                    the component needs to inherit the DialogContentBase class to ensure that close and result events are properly hooked.
                    See https://www.telerik.com/kendo-angular-ui/components/dialogs/dialog/service/#toc-passing-title-content-and-actions-as-a-single-component'`);
                }
            }
        }
        return dialogRef;
    }
    applyOptions(instance, options) {
        instance.title = options.title;
        instance.actions = options.actions;
        instance.actionsLayout = options.actionsLayout || 'stretched';
        instance.width = options.width;
        instance.minWidth = options.minWidth;
        instance.maxWidth = options.maxWidth;
        instance.height = options.height;
        instance.minHeight = options.minHeight;
        instance.maxHeight = options.maxHeight;
        instance.autoFocusedElement = options.autoFocusedElement;
        instance.closeTitle = options.closeTitle;
        if (options.content instanceof TemplateRef) {
            instance.contentTemplate = options.content;
        }
    }
    contentFrom(content, container, dialogRef) {
        const renderer = container.injector.get(Renderer2);
        let nodes = [];
        let titleNodes = [];
        let actionNodes = [];
        let componentRef = null;
        if (typeof content === 'string') {
            nodes = [renderer.createText(content)];
        }
        else if (content && !(content instanceof TemplateRef)) {
            // Component
            const injector = new DialogInjector(() => dialogRef, container.injector);
            const factory = this.resolver.resolveComponentFactory(content);
            componentRef = container.createComponent(factory, undefined, injector);
            titleNodes = Array.from(componentRef.location.nativeElement.querySelectorAll('kendo-dialog-titlebar'));
            nodes = [componentRef.location.nativeElement];
            actionNodes = Array.from(componentRef.location.nativeElement.querySelectorAll('kendo-dialog-actions'));
            dialogRef.content = componentRef;
        }
        return {
            componentRef,
            nodes: [
                titleNodes,
                nodes,
                actionNodes // <ng-content select="kendo-dialog-actions">
            ]
        };
    }
}
DialogService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DialogService.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: DialogContainerService, decorators: [{ type: Inject, args: [DialogContainerService,] }] }
];
export { ɵ0 };
