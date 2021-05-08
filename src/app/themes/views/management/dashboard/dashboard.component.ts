import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit {
    public data: any[] = [
        {
            kind: 'Hydroelectric',
            share: 0.175,
        },
        {
            kind: 'Nuclear',
            share: 0.238,
        },
    ];

    /*NHAN SU THEO DON VI */
    public seriesDataNSDonViOfNam: number[] = [20, 40, 33, 30, 50, 11, 25, 22, 43]; //
    public seriesDataNSDonViOfNu: number[] = [32, 23, 43, 23, 13, 75, 12, 44, 14]; //
    public cateNSDonVi: string[] = ['BAN TCCB', 'BAN KHCN', 'ĐH LUẬT', 'ĐH KHTN', 'ĐH KHXH&NV', 'ĐH KT', 'ĐH GD', 'ĐH VN', 'ĐH NN']; //

    /*NHAN SU THEO GIOI TINH */
    public cateGioiTinh: string[] = ['Nam', 'Nữ'];

    public seriesDataGioiTinh: any[] = [
        { category: 'Nam', value: 120 },
        { category: 'Nữ', value: 60 },
    ];

    public categories = ['Q1', 'Q2', 'Q3', 'Q4'];

    public chartData = {
        listData: [
            {
                data: [100, 123, 234, 343],
            },
            {
                data: [100, 123, 234, 343],
            },
            {
                data: [100, 123, 234, 343],
            },
        ],
    };

    public labelContent(e: any): string {
        return e.category;
    }

    constructor() {}

    ngOnInit() {}
}
