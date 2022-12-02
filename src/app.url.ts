import { environment } from '../src/environments/environment';

export const url: string = environment.production ? 'http://shc.sut.ac.th/api' : 'http://localhost:3000/api';
// http://localhost:5400 https://app-durable-api.herokuapp.com
export const apiKey:string = environment.production ? '3d7d052a031e864ee9c1b04b5a4d0f11':'3d7d052a031e864ee9c1b04b5a4d0f11'; 
