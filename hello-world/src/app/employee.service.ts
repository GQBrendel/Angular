import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private _url: string = "/assets/data/employees.json";
  constructor(private http: HttpClient) { }

  getEmployees()
  {
    return this.http.get(this._url);

  
  }
}
