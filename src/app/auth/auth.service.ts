import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {
	constructor(private http: HttpClient, private router: Router) {
	}

	static getAccessToken(): string {
		return localStorage.getItem('access_token');
	}

	static logout() {
		localStorage.removeItem('access_token');
		localStorage.removeItem('refresh_token');
	}

	login(username: string, password: string) {
		const postData = {
			grant_type: 'password',
			client_id: 2,
			client_secret: 'XWRvuk0xbrelPVJnjmtbUHyn5ki5ZkgOkegyCitR',
			username: username,
			password: password,
			scope: ''
		};

		return this.http
			.post('/oauth/token', JSON.stringify(postData))
			.subscribe((response: Response) => {
				localStorage.setItem('access_token', response['access_token']);
				localStorage.setItem('refresh_token', response['refresh_token']);

				this.router.navigate(['/management/dashboard']);

			}, error => {
				console.error(error);
			});
	}

	refreshAccessToken(): Observable<Object> {
		const postData = {
			grant_type: 'refresh_token',
			client_id: 2,
			client_secret: 'XWRvuk0xbrelPVJnjmtbUHyn5ki5ZkgOkegyCitR',
			refresh_token: localStorage.getItem('refresh_token'),
			scope: ''
		};

		return this.http
			.post('/oauth/token', JSON.stringify(postData));
	}

	public isAuthed(): boolean {
		if (localStorage.getItem('access_token') && localStorage.getItem('refresh_token')) {
			return true;
		}

		return false;
	}
}
