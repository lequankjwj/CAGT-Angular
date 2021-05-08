import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { SurveyState, SurveyStore } from './survey.store';

@Injectable({ providedIn: 'root' })
export class SurveyQuery extends Query<SurveyState> {
    all$ = this.select();
    surveys$ = this.select('surveys');

    constructor(protected store: SurveyStore) {
        super(store);
    }
}
