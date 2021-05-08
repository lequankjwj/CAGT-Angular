import { MainLayoutModule } from '../../layouts/main/main-layout.module';
import { MainContainerComponent } from './default/main-container/main-container.component';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { NgModule } from '@angular/core';
import { DefaultComponent } from './default/default.component';

@NgModule({
    imports: [MainLayoutModule, MainRoutingModule],
    exports: [],
    declarations: [
        MainComponent,
        DefaultComponent,
        MainContainerComponent,
    ],
    providers: [],
})
export class MainModule {}
