import {NgModule} from '@angular/core';
import {
	MatButtonModule,
	MatCheckboxModule,
	MatFormFieldModule,
	MatInputModule,
	MatRadioModule
} from '@angular/material';

@NgModule({
	imports: [MatCheckboxModule, MatRadioModule, MatButtonModule, MatInputModule, MatFormFieldModule],
	exports: [MatCheckboxModule, MatRadioModule, MatButtonModule, MatInputModule, MatFormFieldModule]
})
export class AppMaterialsModule {

}
