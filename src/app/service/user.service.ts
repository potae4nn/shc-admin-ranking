import { Injectable } from '@angular/core';
import { url } from '../../app.url';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public userLogin(data: IUser) {
    return this.httpClient.post<IUser>(`${url}/auth/login`, data);
  }

  public getMember(search: string, page: number, sort: string, order: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${localStorage.getItem('rankingToken')}`,
    });
    return this.httpClient.get<IMember>(`${url}/staff/member?sort=${sort}&order=${order}&search=${search}&page=${page + 1}`, { headers: headers });
  }

  public getMemberId(id_user: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${localStorage.getItem('rankingToken')}`,
    });
    return this.httpClient.get<IMember>(`${url}/staff/user/${id_user}`, { headers: headers })
  }

  public updateMember(result: ResultMember) {
    console.log(result);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${localStorage.getItem('rankingToken')}`,
    });
    return this.httpClient.post<ResultMember>(`${url}/staff/userUpdate`, result, { headers: headers })
  }

  public getAdmin(search: string, page: number, sort: string, order: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${localStorage.getItem('rankingToken')}`,
    });
    return this.httpClient.get<IMember>(`${url}/staff/admin?sort=${sort}&order=${order}&search=${search}&page=${page + 1}`, { headers: headers });
  }

}

// ----------------------------- Interface ----------------------
export interface IUser {
  users: User
  token: string
}

export interface User {
  id_user: number
  id_plan: number
  name: string
  employee_id: string
  sex: string
  email: string
  contact_number: string
  weight: number
  height: number
  id_department: string
  birthday: string
  operating_age: string
  member_type_name: string
  status: string
}


export interface IMember {
  result: ResultMember[]
  count: CountMember[]
}

export interface ResultMember {
  message?: string;
  id_user: number
  employee_id: string
  name: string
  status: string
  contact_number: string
  email: string
}

export interface CountMember {
  count: number
}
