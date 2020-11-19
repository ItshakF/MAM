import { Injectable } from '@angular/core';
import { OpenOperation } from '../model/open-operation';
import { User } from '../model/user';
import { FileReaderService } from './file-reader.service';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {

  currentOperation: OpenOperation;

  constructor(fileService: FileReaderService) {
    this.currentOperation = fileService.openOperation;
   }

  showAll(): OpenOperation {
    return this.currentOperation;
  }

  updateShare(nameToUpdate: string, newShare: number) {
    this.currentOperation.operations.users.find(user => user.name === nameToUpdate).sharePourcentage = newShare;
  }

  findUser(nameOfUser: string): User {
    return this.currentOperation.operations.users.find(user => user.name === nameOfUser);
  }

  newBalance(newBalance: number){
    this.currentOperation.balance = newBalance;
  }

  addAssociate(user: User){
    this.currentOperation.associates++;
  }

  addFunds(name: string, fundsToAdd: number){
    this.currentOperation.balance += fundsToAdd;
    this.calculateNewShare(fundsToAdd, name);
  }

  withdrawFunds(name: string, fundsToWithdraw: number) {
    this.currentOperation.balance -= fundsToWithdraw;
    this.calculateNewShare(-fundsToWithdraw, name);
  }

  calculateNewShare(fundsToAdd: number, name: string) {
    this.currentOperation.operations.users.forEach(user => {
      if (user.name === name) {
        user.translatedValue += fundsToAdd;
      }
      user.sharePourcentage = user.translatedValue / this.currentOperation.balance;
    });
    this.currentOperation.operations.date = new Date();
    this.writeToFile(this.currentOperation);
  }

  defineRobotPayment(name: string, payRobot: boolean) {
    const userToUpdate: User = this.findUser(name);
    userToUpdate.payBot = payRobot;
  }

  benefitTransfer(nameBenefitTaken: string, nameBenefiTGiven: string, shareToGive: number){
    const userCurrTaken = this.findUser(nameBenefitTaken);
    const userCurrGiven = this.findUser(nameBenefiTGiven);
    const userLastTaken = this.currentOperation.operations.users.find(user => user.name === nameBenefitTaken);
    const benefitToTransfer =
     (userCurrTaken.translatedValue - userLastTaken.translatedValue) /
      userCurrTaken.profitDeduce.shareDeduce;
    this.calculateNewShare(benefitToTransfer, userCurrGiven.name);
  }

  writeToFile(newOperation: OpenOperation) {}

}
