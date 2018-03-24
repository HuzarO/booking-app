import {
	HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './auth/auth.service';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/catch';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	private _refreshingToken = false;
	private _tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

	constructor(private authService: AuthService) {
	}

	static addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
		return req.clone({
			setHeaders: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			url: 'http://localhost:8000' + req.url
		});
	}

	private static handle400Error(error: HttpErrorResponse) {
		if (error && error.status === 400 && error.error && error.error.error === 'invalid_grant') {
			// If we get a 400 and the error message is 'invalid_grant', the token is no longer valid so logout.
			AuthService.logout();
			return Observable.throw('');
		}

		return Observable.throw(error);
	}

	intercept(req: HttpRequest<any>, next: HttpHandler): any {
		return next.handle(AuthInterceptor.addToken(req, AuthService.getAccessToken()))
			.catch(error => {
				if (error instanceof HttpErrorResponse) {
					switch (error.status) {
						case 400:
							return AuthInterceptor.handle400Error(error);
						case 401:
							return this.handle401Error(req, next, error);
					}
				} else {
					return Observable.throw(error);
				}
			});
	}

	private handle401Error(req: HttpRequest<any>, next: HttpHandler, error: HttpErrorResponse) {
		if (error && error.status === 401 && error.error && error.error.error === 'invalid_credentials') {
			AuthService.logout();
			return Observable.throw(error);
		}

		if (!this._refreshingToken) {
			this._refreshingToken = true;

			// Reset here so that the following requests wait until the token
			// comes back from the refreshToken call.
			this._tokenSubject.next(null);

			return this.authService.refreshAccessToken()
				.switchMap((newToken: string) => {
					console.log(newToken);
					if (newToken) {
						this._tokenSubject.next(newToken);
						return next.handle(AuthInterceptor.addToken(req, newToken));
					}

					// If we don't get a new token, we are in trouble so logout.
					AuthService.logout();
					return Observable.throw(error);
				})
				.catch(() => {
					// If there is an exception calling 'refreshToken', bad news so logout.
					AuthService.logout();
					return Observable.throw(error);
				})
				.finally(() => {
					this._refreshingToken = false;
				});
		} else {
			return this._tokenSubject
				.filter(token => token != null)
				.take(1)
				.switchMap(token => {
					return next.handle(AuthInterceptor.addToken(req, token));
				});
		}
	}

}
