import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-control-error',
    templateUrl: './control-error.component.html',
    styleUrls: ['./control-error.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlErrorComponent implements OnInit {
    // tslint:disable-next-line:variable-name
    _hide = true;

    // tslint:disable-next-line:variable-name
    _text;
    @Input() set text(value) {
        if (value !== this._text) {
            this._text = value;
            this._hide = !value;
            this.cdr.detectChanges();
        }
    };
    constructor(private cdr: ChangeDetectorRef) {
    }

    ngOnInit() {
    }
}
