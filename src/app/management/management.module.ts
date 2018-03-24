import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ManagementComponent} from './management.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {Angular2FontawesomeModule} from 'angular2-fontawesome';

@NgModule({
	imports: [
		CommonModule,
		Angular2FontawesomeModule
	],
	declarations: [
		ManagementComponent,
		HeaderComponent,
		SidebarComponent,
		FooterComponent,
		DashboardComponent,
	]
})
export class ManagementModule {
}
