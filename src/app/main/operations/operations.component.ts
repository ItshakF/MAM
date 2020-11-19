import { Component, OnInit } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OpenOperation } from 'src/app/model/open-operation';
import { User } from 'src/app/model/user';
import { FileReaderService } from 'src/app/services/file-reader.service';


@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.less']
})
export class OperationsComponent implements OnInit {

  currentOperation: Observable<OpenOperation>;
  ope: User[];
  operationSub: Subscription;
  private unsubscribe$: Subject<void>;

  constructor(private fileService: FileReaderService) {}

  ngOnInit(): void {
    this.getOperations();
    this.unsubscribe$ = new Subject<void>();
    // this.operationSub = this.fileService.getUpdated()
    // .subscribe((operation: OpenOperation) => {
    //   this.currentOperation = operation;
    //   this.ope = operation.operations.users;
    //   // this.ope = of(operation.operation.users);
    //   console.log(operation);
    // });
    this.currentOperation = this.getOperations();
  }

  private getOperations() {
    return this.fileService.getLastOperation()
      .pipe(takeUntil(this.unsubscribe$));
  }

  addOperation() {
    const tempOperation: OpenOperation = {
      balance: 7000,
      associates: 3,
      operations: {
        date : null,
        users: [
          {
            name: 'Itshak',
            sharePourcentage: 27.2,
            translatedValue: 2000,
            payBot: false,
            profitDeduce: null
          },
          {
            name: 'Shaul',
            sharePourcentage: 45.2,
            translatedValue: 5000,
            payBot: false,
            profitDeduce: null
          },
           {
            name: 'Yonathan',
            sharePourcentage: 30,
            translatedValue: 500,
            payBot: false,
            profitDeduce: null
          }
        ]
      }
    };
    this.fileService.addOperation(tempOperation);
  }

}
