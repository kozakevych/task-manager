import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private authTokenKey = 'authToken';

    constructor(public httpClient: HttpClient) {}

    register(username: string, password: string) {
       return this.httpClient.post(`${environment.apiUrl}/auth/register`, { username, password });
    }

    login(username: string, password: string): Observable<{access_token: string}>{
        return this.httpClient.post<{access_token: string}>(`${environment.apiUrl}/auth/login`, { username, password });
    }

    logout(): void {
        localStorage.removeItem(this.authTokenKey);
    }

    isAuthenticated(): boolean {
        return !!localStorage.getItem(this.authTokenKey);
    }
}
