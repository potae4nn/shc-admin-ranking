import { Injectable } from '@angular/core';
import { url } from '../../app.url';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeshboardService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public getCollect(page: number, sort: string, order: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${localStorage.getItem('rankingToken')}`,
    });
    return this.httpClient.get<ICollect>(`${url}/staff/getHistory/pending/${page + 1}?sort=${sort}&order=${order}`, { headers: headers });
  }

  public searchCollect(search: string, page: number, sort: string, order: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${localStorage.getItem('rankingToken')}`,
    });
    return this.httpClient.get<ICollect>(`${url}/staff/searchHistory?sort=${sort}&order=${order}&search=${search}&status=0&page=${page + 1}`, { headers: headers });
  }

  public getDetail(id_history: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${localStorage.getItem('rankingToken')}`,
    });
    return this.httpClient.get<IDetail>(`${url}/staff/details/${id_history}`, { headers: headers });
  }

  public approve(data: IApproveStatus) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${localStorage.getItem('rankingToken')}`,
    });
    return this.httpClient.post<IApproveStatus>(`${url}/staff/approv`, data, { headers: headers });
  }

}

export interface ICollect {
  result: Result[]
  count: Count[]
}

export interface Result {
  user_id?: string
  id_history?: number
  name?: string
  member_type_name?: string
  date?: string
  distance?: number
  time?: number
  status?: string
  plan_name?: string
  remark?: any
  start_work?: string
}

export interface Count {
  count: number
}

export interface IDetail {
  results: Result2[]
}

export interface Result2 {
  id_history: number
  name: string
  date: string
  distance: number
  time: number
  status: string
  img: string
}

export interface IApproveStatus {
  id_history: number
  distance: number
  time: number
  status: string
  remark: string
  message?: string
}

