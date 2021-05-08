import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageContentDirective } from './page-content.directive';
import { PaginatedViewComponent } from './paginated-view.component';

@NgModule({
    imports: [CommonModule],
    declarations: [PaginatedViewComponent, PageContentDirective],
    exports: [PaginatedViewComponent, PageContentDirective],
})
export class PaginatedViewModule {}
