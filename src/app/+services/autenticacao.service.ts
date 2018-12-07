import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { tap, map, mergeMap } from 'rxjs/operators';

import { IUser } from '../+core/interfaces/user.interface';
import { loli } from './initial';
import { UsuarioService } from './usuario.service';


@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {
  private myStorage: Storage;
  private _isLogado = new BehaviorSubject<boolean>(false);
  public isLogado: Observable<boolean>;
  private _usuarioLogado = new BehaviorSubject<IUser>(null);
  public usuarioLogado: Observable<IUser>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private usuarioService: UsuarioService
  ) {
    this.myStorage = window.localStorage;
    this.isLogado = this._isLogado.asObservable();
    this.usuarioLogado = this._usuarioLogado.asObservable();
  }

  public logCheck() {
    this._isLogado.next(this.myStorage.getItem("session_token") !== null);
    this.refreshUsuarioLogado();
  }

  //logout
  logout(): any {
    this.myStorage.clear();
    this._isLogado.next(false);
    this.router.navigateByUrl('');
    this._usuarioLogado.next(null);
  }

  //valida o login
  public login(value: IUser) {
    let token = this.myStorage.getItem('session_token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.http.post(loli + '/login/', value, httpOptions).pipe(
      mergeMap(
        res => {
          let user = Object.assign(value, res);
          this.myStorage.setItem('session_token', user.key);
          this._isLogado.next(true);

          return this.usuarioService.get().pipe(
            tap(
              res => this._usuarioLogado.next(res as IUser),
              err => console.log(err)
            )
          );
        }
      )
    );
  }

  public refreshUsuarioLogado() {
    this.usuarioService.get().subscribe(
        res => this._usuarioLogado.next(res as IUser),
        err => console.log(err)
    );
  }

  //cadastra o usuário
  public submit(value: IUser) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post(loli + '/registration/', value, httpOptions).pipe(tap(
      res => {
        let user = Object.assign(value, res);
        this.myStorage.setItem('session_token', user.key);
        this._isLogado.next(true);
      }
    ));
  }

}

