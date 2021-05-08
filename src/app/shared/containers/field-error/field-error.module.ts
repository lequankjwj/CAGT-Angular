import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldErrorComponent } from '@shared/containers/field-error/field-error.component';

@NgModule({
    declarations: [FieldErrorComponent],
    imports: [CommonModule],
    exports: [FieldErrorComponent],
})
export class FieldErrorModule {}
