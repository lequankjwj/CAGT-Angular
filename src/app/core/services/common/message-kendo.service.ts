import { MessageService } from '@progress/kendo-angular-l10n';
import { Injectable } from '@angular/core';

// https://github.com/telerik/kendo-angular-messages/blob/develop/messages/grid/grid.en-US.yml
const messages = {
    'kendo.grid.noRecords': 'Không có dữ liệu',
    'kendo.grid.groupPanelEmpty': 'Drag a column header and drop it here to group by that column',
    'kendo.grid.pagerFirstPage': 'Go to the first page',
    'kendo.grid.pagerPreviousPage': 'Go to the previous page',
    'kendo.grid.pagerNextPage': 'Go to the next page',
    'kendo.grid.pagerLastPage': 'Go to the last page',
    'kendo.grid.pagerOf': '/',
    'kendo.grid.pagerItems': 'dòng',
    'kendo.grid.pagerItemsPerPage': '',
    'kendo.grid.columns': 'Cột',
    'kendo.grid.columnsApply': 'Áp dụng',
    'kendo.grid.columnsReset': 'Đặt lại',
    'kendo.grid.sortable': 'Sắp xếp',
    'kendo.grid.sortedAscending': 'Đã sắp xếp tăng dần',
    'kendo.grid.sortedDescending': 'Đã sắp xếp giảm dần',
    'kendo.grid.sortAscending': 'Sắp xếp tăng dần',
    'kendo.grid.sortDescending': 'Sắp xếp giảm dần',
    'kendo.grid.sortedDefault': 'Không sắp xếp',

    'kendo.scheduler.today': 'Hôm nay',
    'kendo.scheduler.calendarToday': 'Hôm nay',
    'kendo.scheduler.timelineViewTitle': 'Thời gian',
    'kendo.scheduler.allEvents': 'Sự kiện',

    'kendo.datetimepicker.today': 'Hôm nay',

};

// Override key message kendo
@Injectable()
export class MessageKendoService extends MessageService {
    public get(key: string): string {
        return messages[key];
    }
}
