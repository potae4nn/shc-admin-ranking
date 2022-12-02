import { Injectable } from '@angular/core';
import { url } from '../../app.url';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ICollect } from './deshboard.service';

@Injectable({
  providedIn: 'root'
})
export class StatusTableService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  public searchCollect(search: string, page: number, sort: string, order: any, status: object) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${localStorage.getItem('rankingToken')}`,
    });
    return this.httpClient.get<ICollect>(`${url}/staff/searchHistory?sort=${sort}&order=${order}&search=${search}&status=${status}&page=${page + 1}`, { headers: headers });
  }

}
