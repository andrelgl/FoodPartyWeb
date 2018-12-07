import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { loli } from './initial';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private myStorage: Storage;

  constructor(private http: HttpClient) {
    this.myStorage = window.localStorage;
  }

  get isRegistroCompleto() {
    let registroCompleto = this.myStorage.getItem("registro_completo");
    return registroCompleto !== null && registroCompleto == 'true';
  }

  public get() {
    let token = this.myStorage.getItem('session_token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      })
    };
    return this.http.get(`${loli}/user`, httpOptions).pipe(
      tap((resp: any) => {
        let isEmpty = true;
        if (resp.data !== null) {
          isEmpty = Object.keys(resp.data).length === 0;
        }
        this.myStorage.setItem("registro_completo", isEmpty ? 'false' : 'true');
      })
    );
  }

}
