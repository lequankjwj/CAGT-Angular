import {Injectable, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs/internal/Subject';

@Injectable()
export class DestroyService extends Subject<void> implements OnDestroy {
    ngOnDestroy() {
        this.next();
        this.complete();
    }
}
