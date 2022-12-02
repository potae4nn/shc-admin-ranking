import { Injectable } from '@angular/core';
import { url } from '../../app.url';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public searchMemberGroup(search: string, page: number, sort: string, order: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${localStorage.getItem('rankingToken')}`,
    });
    return this.httpClient.get<IMember>(`${url}/staff/groupMember?sort=${sort}&order=${order}&search=${search}&page=${page + 1}`, { headers: headers });
  }

  public addTypeMember(formAddMember: ITypeMember) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${localStorage.getItem('rankingToken')}`,
    });
    return this.httpClient.post<ITypeMember>(`${url}/staff/addTypeMember`, formAddMember, { headers: headers })
  }

  public groupTypeMember() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${localStorage.getItem('rankingToken')}`,
    });
    return this.httpClient.get<ISelectAddRange>(`${url}/staff/groupTypeMember`, { headers: headers })
  }

  public getTypeTime() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${localStorage.getItem('rankingToken')}`,
    });
    return this.httpClient.get<ISelectAddRange>(`${url}/staff/typeTime`, { headers: headers })
  }

  public addRangeAge(result: IAddRangeAge) {
    console.log(result);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${localStorage.getItem('rankingToken')}`,
    });
    return this.httpClient.post<IAddRangeAge>(`${url}/staff/addRangeAge`, result, { headers: headers });
  }
}

export interface IAddRangeAge {
  groupMember: number
  range_start: number
  reane_end: number
  typeTime: number
  message?: string
}

export interface ISelectAddRange {
  result: ResultSelectAddRange[]
}

export interface ResultSelectAddRange {
  id: number
  title: string
}

export interface ITypeMember {
  title: string
  detail: string
  message?: string
}

export interface IMember {
  result: Result[]
  count: Count[]
}

export interface Result {
  id: number
  title: string
  details: any
  update_at: string
  create_at: string
}

export interface Count {
  count: number
}


