import { TranslateModule } from '@ngx-translate/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CKEditorModule } from '@shared/modules/ckeditor';
import { NgxSpinnerModule } from 'ngx-spinner';

// https://www.npmjs.com/package/angular-highcharts
// import { ChartModule } from 'angular-highcharts';

export const EXTERNAL_MODULE = [TranslateModule, DragDropModule, CKEditorModule, NgxSpinnerModule];
