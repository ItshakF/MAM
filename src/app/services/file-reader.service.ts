import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { OpenOperation } from '../model/open-operation';

@Injectable({
  providedIn: 'root'
})
export class FileReaderService {

  openOperation: OpenOperation;
  operationUpdate = new Subject<OpenOperation>();


  constructor(private http: HttpClient) { }

  getLastOperation() {
    return this.http.get<OpenOperation>('http://localhost:3000/api/operations')
    // .subscribe((registerData => {
    //   this.openOperation = registerData;
    //   this.operationUpdate.next(this.openOperation);
    // }))
    ;
  }

  getRegister() {
    const a = 1;
  }

  getTest(): Observable<any>{
    return this.http.get<OpenOperation>('http://localhost:3000/api/operations');
  }

  getUpdated() {
    return this.operationUpdate.asObservable();
  }

  addOperation(openOperation: OpenOperation) {
    return this.http.post<{ message: string }>('http://localhost:3000/api/save', openOperation)
      .subscribe(dataSuccess => {
        console.log(dataSuccess.message);
        return dataSuccess;
      });
  }
}
