import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface SurveyState {
    surveys: any[];
    isUpdated: boolean;
}

export function createInitialSurveyState(): SurveyState {
    return {
        surveys: [],
        isUpdated: false,
    };
}

@Injectable({
    providedIn: 'root',
})
@StoreConfig({
    name: 'survey',
})
export class SurveyStore extends Store<SurveyState> {
    constructor() {
        super(createInitialSurveyState());
    }
}
