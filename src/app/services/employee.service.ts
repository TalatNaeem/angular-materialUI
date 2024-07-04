import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private _httpClient: HttpClient) { }

  addEmployee(data:any){
    return this._httpClient.post('https://various-adaptive-volcano.glitch.me/employee', data);
  }

  updateEmployee(id:number, data:any){
    return this._httpClient.put(`https://various-adaptive-volcano.glitch.me/employee/${id}`, data);
  }

  getAllEmployee(){
    return this._httpClient.get<any>('https://various-adaptive-volcano.glitch.me/employee');
  }

  deleteEmployee(id: number){
    return this._httpClient.delete<any>(`https://various-adaptive-volcano.glitch.me/employee/${id}`);
  }
}
