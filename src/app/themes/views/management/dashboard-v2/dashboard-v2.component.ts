import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActionEnum } from '@core/constants/enum.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { SecurityService } from '@core/services/common/security.service';
import { forkJoin, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { OnDestroy } from '@angular/core';

export class DataChartXepLoai {
    category: string;
    value: number;
}
export class DataTongHopKetQua {
    idCoQuan: number;
    idDoiTuongDanhGia: number;
    nam?: number;
    quy?: number;
    t1: number;
    t2: number;
    t3: number;
    t4: number;
    t5: number;
    t6: number;
    ten: string;
}
export class DataTongSoPhieu {
    idCoQuan: number;
    idDoiTuongDanhGia: number;
    nam?: number;
    quy?: number;
    soPhieu: number;
    ten: string;
}
export class DataChartTongSoPhieu {
    idDoiTuongDanhGia: number;
    soPhieu: number;
    tongSoPhieu: number;
    ten: string;
}

@Component({
    selector: 'app-dashboard-v2',
    templateUrl: './dashboard-v2.component.html',
    styleUrls: ['./dashboard-v2.component.css'],
})
export class DashboardV2Component implements OnInit, OnDestroy {
    @ViewChild('content') content: ElementRef;
    public dataTongHopKetQuas: DataTongHopKetQua[];
    public tongSoPhieus: DataTongSoPhieu[];
    public seriesDataXepLoai: DataChartXepLoai[] = [];
    public seriesDataTongSoPhieu: DataChartTongSoPhieu[] = [];
    public categoriesXepLoai: string[] = [];
    public tongSoPhieu = 0;
    public listStyle = ['bg-success', 'bg-info', 'bg-warning', 'bg-danger'];    
    totalPhieuDanhGiaCaNhan = 0;

    public categoriesQuy = ['Q1', 'Q2', 'Q3', 'Q4'];
    public dataChartColum = {
        listData: [],
    };

    /*NHAN SU THEO DON VI */
    public seriesDataNSDonViOfNam: number[] = [
        20,
        60,
        33,
        30,
        50,
        11,
        25,
        22,
        43,
        45,
        100,
        40,
        33,
        30,
        50,
        11,
        25,
        22,
        43,
        45,
        20,
        40,
        33,
        30,
        50,
        11,
        25,
        22,
        43,
        45,
    ];

    seriesDataPhieuDanhGiaTotal: number[] = [];

    cateNSDonVi: string[] = [];

    thongKeKetQuaXepLoaiTheoDonVis = [];

    private destroyed$ = new Subject();
    public labelContent(e: any): string {
        return e.category;
    }
    constructor(private apiService: ApiService, private router: Router, private security: SecurityService) {
        const xepLoais = this.apiService.read(`${''}/List`, {
            pageSize: 0,
            pageNumber: 0,
        });

        const doiTuongDanhGias = this.apiService.read(`${''}/List`, {
            pageSize: 0,
            pageNumber: 0,
        });

        const dataCharts = this.apiService.read('', this.queryOptions);

    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    ngOnInit() {
        
    }

    changeStyle(index: number) {
        return this.listStyle[index];
    }

    private get queryOptions() {
        return {
            dotId: null,
            nam: null,
            quyId: null,
            coQuanIds: null,
        };
    }
}
