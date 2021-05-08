import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentEditableFormDirective } from './content-editable-form.directive';
import { DragDropDirective } from './drag-drop.directive';
import { PrintSectionDirective } from './printer-section.directive';
import { SearchAdvanceDirective } from './search-advance.directive';
import { HrefDirective } from './href.directive';
import {DialogScrolltopDirective} from './dialog-scrolltop.directive';

const AllDirective = [
    ContentEditableFormDirective,
    DragDropDirective, PrintSectionDirective,
    SearchAdvanceDirective,
    HrefDirective,
    DialogScrolltopDirective
];

@NgModule({
    declarations: [AllDirective],
    imports: [CommonModule],
    exports: [AllDirective],
})
export class SharedDirectiveModule {}
