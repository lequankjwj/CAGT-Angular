import {
    Directive,
    Optional,
    Inject,
    ViewContainerRef,
    ComponentFactoryResolver,
    ComponentRef,
    Input,
    Host,
    Renderer2,
    ElementRef,
    OnInit,
    AfterViewInit,
} from '@angular/core';
import { NgControl, ControlContainer, AbstractControl } from '@angular/forms';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { FORM_ERRORS } from './form-errors';
import { ControlErrorContainerDirective } from './control-error-container.directive';
import { merge, EMPTY, Observable } from 'rxjs';
import { ControlErrorComponent } from '@shared/controls/control-error/control-error.component';
import { FormSubmitDirective } from '@shared/directives/forms/form-submit.directive';

@Directive({
    selector: '[formControl], [formControlName]',
})
export class ControlErrorsDirective implements OnInit, AfterViewInit {
    ref: ComponentRef<ControlErrorComponent>;
    container: ViewContainerRef;
    submit$: Observable<Event>;
    @Input() customErrors = {};

    constructor(
        private renderer: Renderer2,
        private el: ElementRef,
        private vcr: ViewContainerRef,
        private resolver: ComponentFactoryResolver,
        @Optional() controlErrorContainer: ControlErrorContainerDirective,
        @Inject(FORM_ERRORS) private errors,
        @Optional() @Host() private form: FormSubmitDirective,
        private controlDir: NgControl
    ) {
        this.container = controlErrorContainer ? controlErrorContainer.vcr : vcr;
        this.submit$ = this.form ? this.form.submit$ : EMPTY;
    }

    ngOnInit() {
        merge(this.submit$, this.control.valueChanges)
            .pipe(untilDestroyed(this))
            .subscribe(v => {
                const controlErrors = this.control.errors;

                if (controlErrors) {
                    const firstKey = Object.keys(controlErrors)[0];
                    const getError = this.errors[firstKey];
                    const text = this.customErrors[firstKey] || getError(controlErrors[firstKey]);
                    this.setError(text);
                } else if (this.ref) {
                    this.setError(null);
                }
            });
    }

    ngAfterViewInit() {
        setTimeout(() => {
            if (this.validator) {
                const parent = this.el.nativeElement.closest('.form-group');
                if (parent.getElementsByTagName('LABEL').length && !parent.getElementsByClassName('required-asterisk').length) {
                    parent.getElementsByTagName('LABEL')[0].innerHTML += '<span class="required-asterisk text-danger">(*)</span>';
                }
            }
        }, 0);
    }

    get control() {
        return this.controlDir.control;
    }

    get validator() {
        const validator = this.control.validator({} as AbstractControl);
        if (validator && validator.required) {
            return true;
        }
    }

    setError(text: string) {
        if (!this.ref) {
            const factory = this.resolver.resolveComponentFactory(ControlErrorComponent);
            this.ref = this.container.createComponent(factory);
        }

        this.ref.instance.text = text;
    }

    getParent(element) {
        const parent = this.renderer.parentNode(element);
        if (parent.getElementsByTagName('FORM').length || parent.getElementsByTagName('BODY').length) {
            return;
        }

        if (!parent.getElementsByTagName('LABEL').length) {
            return this.getParent(parent);
        }

        return parent;
    }

    ngOnDestroy() {}
}
