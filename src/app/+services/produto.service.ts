import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { loli } from './initial';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private myStorage: Storage;
  constructor(private http: HttpClient) {
    this.myStorage = window.localStorage;
  }

  public post(enterpriseId, value) {
    const token = this.myStorage.getItem('session_token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      })
    };
    return this.http.post(`${loli}/enterprises/${enterpriseId}/products`, value, httpOptions);
  }

  public put(id, enterpriseId, value) {
    const token = this.myStorage.getItem('session_token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      })
    };
    return this.http.put(`${loli}/enterprises/${enterpriseId}/products/${id}`, value, httpOptions);
  }

  public get(enterpriseId, id) {
    return this.http.get(`${loli}/enterprises/${enterpriseId}products/${id}`);
  }

  public getAll(enterpriseId) {
    let token = this.myStorage.getItem('session_token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      })
    };
    return this.http.get(`${loli}/enterprises/${enterpriseId}/products`, httpOptions);
  }

  public delete(enterpriseId, id) {
    return this.http.get(`${loli}/enterprises/${enterpriseId}/products/${id}`);
  }
}
