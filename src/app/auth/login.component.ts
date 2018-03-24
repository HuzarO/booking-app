import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	public loginForm: FormGroup;

	constructor(private authService: AuthService, private router: Router) {
	}

	ngOnInit() {
		if (this.authService.isAuthed()) {
			this.router.navigate(['/management/dashboard']);
			return;
		}

		this.loginForm = new FormGroup({
			username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(32)]),
			password: new FormControl('', [Validators.required, Validators.minLength(3)]),
			remember: new FormControl()
		});
	}

	onSubmit() {
		this.authService.login(this.loginForm.get('username').value, this.loginForm.get('password').value);
	}

	getErrorMessage(name): string {
		const field = this.loginForm.get(name);

		if (!field.touched || (field.touched && field.valid)) {
			return '';
		}

		for (const error of Object.keys(field.errors)) {
			switch (error) {
				case 'required':
					return 'This field is required!';

				case 'minlength':
					return 'Minimum length is ' + field.errors[error].requiredLength + '!';

				case 'maxlength':
					return 'Maximum length is ' + field.errors[error].requiredLength + '!';

				case 'email':
					return 'This is not valid E-Mail';
			}
		}
	}

}
