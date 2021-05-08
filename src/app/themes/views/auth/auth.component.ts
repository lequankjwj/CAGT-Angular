import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DepartmentService } from '@management-state/department/department.service';
import { NhanSuService } from '@management-state/nhan-su/nhan-su.service';
import { SurveyService } from '@management-state/survey/survey.service';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';

@Component({
    selector: 'app-auth',
    template: ` <router-outlet></router-outlet> `,
    encapsulation: ViewEncapsulation.None,
})
export class AuthComponent implements OnInit {
    constructor(
        private departmentService: DepartmentService,
        private nhanSuService: NhanSuService,
        private surveyService: SurveyService,
        private translate: CustomTranslateService
    ) {}

    ngOnInit() {
        this.departmentService.reset();
        this.nhanSuService.reset();
        this.surveyService.reset();
    }
}
