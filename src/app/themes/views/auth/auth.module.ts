import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { FieldErrorModule } from '@shared/containers/field-error/field-error.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { OauthComponent } from './oauth/oauth.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
    declarations: [AuthComponent, LoginComponent, OauthComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, AuthRoutingModule, TranslateModule, FieldErrorModule],
})
export class AuthModule {}
