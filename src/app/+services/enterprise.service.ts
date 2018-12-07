import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { loli } from './initial';
import { tap } from 'rxjs/operators';
import { AutenticacaoService } from './autenticacao.service';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseService {
  private myStorage: Storage;
  constructor(private http: HttpClient,
    private authService: AutenticacaoService) {
    this.myStorage = window.localStorage;
  }

  public post(value) {
    let token = this.myStorage.getItem('session_token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      })
    };
    return this.http.post(`${loli}/enterprises`, value, httpOptions).pipe(
      tap(resp => this.myStorage.setItem("registro_completo", 'true'))
    );
  }

  public put(id, value) {
    let token = this.myStorage.getItem('session_token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      })
    };
    return this.http.put(`${loli}/enterprises/${id}`, value, httpOptions);
  }

  public get(id) {
    return this.http.get(`${loli}/enterprises${id}`);
  }

  public getAll() {
    return this.http.get(`${loli}/enterprises`);
  }

  public delete(id) {
    return this.http.get(`${loli}/enterprises${id}`);
  }
}
