import { Injectable } from '@angular/core';
import { url } from '../../app.url';
import { HttpClient, HttpHeaders, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public searchActivity(search: string, page: number, sort: string, order: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${localStorage.getItem('rankingToken')}`,
    });
    return this.httpClient.get<IActivity>(`${url}/event?sort=${sort}&order=${order}&search=${search}&page=${page + 1}`, { headers: headers });
  }

  public updateActivity(results: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${localStorage.getItem('rankingToken')}`,
    });
    return this.httpClient.post<any>(`${url}/event/activity`, results, { headers: headers });
  }

  public getActivityById(id: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${localStorage.getItem('rankingToken')}`,
    });
    return this.httpClient.get<IActivity>(`${url}/event/activity/${id}`, { headers: headers });
  }

  public searchRangeAge(search: string, page: number, sort: string, order: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${localStorage.getItem('rankingToken')}`,
    });
    return this.httpClient.get<IRangeAge>(`${url}/event/rangeAge?sort=${sort}&order=${order}&search=${search}&page=${page + 1}`, { headers: headers });
  }

  public getRange() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${localStorage.getItem('rankingToken')}`,
    });
    return this.httpClient.get<IRangeAge>(`${url}/event/range`, { headers: headers });
  }

  public getPlan() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${localStorage.getItem('rankingToken')}`,
    });
    return this.httpClient.get<IPlan>(`${url}/event/plan`, { headers: headers });
  }

  public getPlanRangeById(id: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${localStorage.getItem('rankingToken')}`,
    });
    return this.httpClient.get<IRangeAge>(`${url}/event/plan_range/${id}`, { headers: headers });
  }

  public getPlanRange() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${localStorage.getItem('rankingToken')}`,
    });
    return this.httpClient.get<IRangeAge>(`${url}/event/plan_range`, { headers: headers });
  }

  public getRanking(id_plan: number, id_range: number, year: string): Observable<IRanking> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${localStorage.getItem('rankingToken')}`,
    });
    return this.httpClient.get<IRanking>(`${url}/event/ranking?id_plan=${id_plan}&id_range=${id_range}&year=${year}`, { headers: headers });
  }

  public getImageById(result: IImageById) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${localStorage.getItem('rankingToken')}`,
    });
    return this.httpClient.get<IImagePreview>(`${url}/event/image/${result.id_plan}/${result.id_img}`, { headers: headers });
  }

  public uploadImage(result: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('rankingToken')}`
    });
    return this.httpClient.post<any>(`${url}/event/uploadInfomation`, result, { headers: headers })
  }

  public uploadImages01(result: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('rankingToken')}`
    });
    return this.httpClient.post<any>(`${url}/event/uploadMultiInfomation`, result, { headers: headers, reportProgress: true })
  }

  public uploadImages(result: any): Observable<HttpEvent<any>> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('rankingToken')}`
    });
    const req = new HttpRequest('POST', `${url}/event/uploadMultiInfomation`, result, {
      reportProgress: true,
      headers: headers,
      responseType: 'json'
    });
    return this.httpClient.request(req);
  }

  public groupRangeAge(result: Result) {
    console.log(result);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${localStorage.getItem('rankingToken')}`,
    });
    return this.httpClient.post<Result>(`${url}/event/groupRangeAge`, result, { headers: headers })
  }

  public addActivity(result: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${localStorage.getItem('rankingToken')}`,
    });
    return this.httpClient.post<any>(`${url}/event/addActivity`, result, { headers: headers })
  }

}

// ---------------------------------- Interface -------------------------------------------
export interface IImageById {
  id_img: number
  id_plan: number
}

export interface IImagePreview {
  result: ResultImagePreview[]
}

export interface ResultImagePreview {
  id: number
  id_plan: number
  image: string
}

export interface IActivity {
  result: Result[]
  count: Count[]
}

export interface Result {
  message: string
  id_plan: number
  name: string
  start_date: string
  end_date_register: string
  end_date: string
  status: number
  details: string
  images: Image[]
  check_range_age: CheckRangeAge[]
}

export interface Image {
  id: number
  image: string
}

export interface CheckRangeAge {
  id: number
  checked: string
  id_report_range_age: number
  id_plan?: number
  range_start: number
  range_end: number
  report_group_member: string
  report_type_time: string
}

export interface IRangeAge {
  result: RangeResult[]
  count: Count[]
}

export interface RangeResult {
  id: number
  range_start: number
  range_end: number
  typemember: string
  rangeage: string
}

export interface Count {
  count: number
}


export interface IPlan {
  result: PlanResult[]
}

export interface PlanResult {
  id_plan: number
  name: string
}

export interface IRanking {
  resultMen: ResultMen[]
  resultWomen: ResultWomen[]
}

export interface ResultMen {
  shirt_size: string
  sex: string
  operating_age: number
  employee_id: string
  name: string
  department: string
  total_distance: number
  total_time: number
  start_date: string
  end_date: string
  plan_name: string
  id_plan: number
}

export interface ResultWomen {
  shirt_size: string
  sex: string
  operating_age: number
  employee_id: string
  name: string
  department: string
  total_distance: number
  total_time: number
  start_date: string
  end_date: string
  plan_name: string
  id_plan: number
}