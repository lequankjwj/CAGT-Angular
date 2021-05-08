import { Injectable } from '@angular/core';
import { Subject, Subscription, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class EventBusService {
    private subject$ = new Subject();

    /**
     * On event bus service
     * @param event
     * @param action
     * @returns on
     */
    on(event: EventBus, action: any): Subscription {
        return this.subject$
            .pipe(
                filter((e: EmitEvent) => e.name === event),
                map((e: EmitEvent) => e.value)
            )
            .subscribe(action);
    }

    emit(event: EmitEvent) {
        this.subject$.next(event);
    }
}

export class EmitEvent {
    constructor(public name: any, public value?: any) {}
}

export enum EventBus {
    MenuState,
    UpdateAvatarEnum,
    SelectViTriViecLam,
    SelectNgachCongChuc,
    SelectNhomHopDong,
    SelectCoQuan,
    SelectNhomCongCu,
    SelectTinhThanh,
    SelectQuanHuyen,
    SelectPhongThiNghiem,
    ReloadTrinhDoChuyenMon,

    // Ly lich nhan su
    PinSearchXacNhanThongTinNhanSu
}
