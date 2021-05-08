import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ControlErrorComponent} from './control-error.component';


@NgModule({
    declarations: [ControlErrorComponent],
    entryComponents: [ControlErrorComponent],
    imports: [
        CommonModule
    ],
    exports: [
        ControlErrorComponent
    ]
})
export class ControlErrorModule {
}
