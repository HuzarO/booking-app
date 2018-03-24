import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './auth/login.component';
import {IndexComponent} from './index/index.component';
import {DashboardComponent} from './management/dashboard/dashboard.component';
import {ManagementComponent} from './management/management.component';
import {AuthenticationGuard} from './guards/authentication.guard';

const appRoutes: Routes = [{
	path: 'login',
	component: LoginComponent
}, {
	path: 'management',
	component: ManagementComponent,
	canActivate: [AuthenticationGuard],
	children: [{
		path: '',
		redirectTo: 'dashboard',
		pathMatch: 'full'
	}, {
		path: 'dashboard',
		component: DashboardComponent
	}]
}, {
	path: '',
	redirectTo: 'management',
	pathMatch: 'full'
},];

@NgModule({
	imports: [RouterModule.forRoot(appRoutes)],
	exports: [RouterModule]
})
export class AppRoutingModule {

}
