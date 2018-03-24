import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app.routing.module';
import {LoginComponent} from './auth/login.component';
import {IndexComponent} from './index/index.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppMaterialsModule} from './app.materials.module';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthService} from './auth/auth.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './auth.interceptor';
import {ManagementModule} from './management/management.module';
import {AuthenticationGuard} from './guards/authentication.guard';

@NgModule({
	declarations: [
		AppComponent,
		IndexComponent,
		LoginComponent,
	],
	imports: [
		BrowserModule,
		ReactiveFormsModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		AppMaterialsModule,
		HttpClientModule,
		ManagementModule,
	],
	providers: [AuthService, AuthenticationGuard, {
		provide: HTTP_INTERCEPTORS,
		useClass: AuthInterceptor,
		multi: true
	}],
	bootstrap: [AppComponent]
})
export class AppModule {
}
