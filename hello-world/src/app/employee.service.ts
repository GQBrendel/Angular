import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

// import { Observable } from 'rxjs';
// import { Observable, of, pipe } from 'rxjs'


import { IEmployee } from '../assets/data/employee';



// import { Observable } from 'rxjs/Observable';

//  import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';

import { Observable, Subject, ReplaySubject, from, of, range } from 'rxjs';
import { map, filter, switchMap, tap, catchError } from 'rxjs/operators';

   //import { Observable } from 'rxjs/Observable';

// import { ajax } from 'rxjs/ajax';

// import { map, catchError } from 'rxjs/operators';




@Injectable()
export class EmployeeService {

  private _url: string = "/assets/data/employees1.json";
  constructor(private http: HttpClient) { }

  getEmployees(): Observable<IEmployee[]>
  {
    // return this.http.get<IEmployee[]>(this._url).catch(this.errorHandler);

    return this.http.get<IEmployee[]>(this._url).pipe(
      tap(result => catchError(this.errorHandler)));
    }
    
  errorHandler(error: HttpErrorResponse)
  {
    return  Observable.throw(error.message || "Server Error");
  }
}
