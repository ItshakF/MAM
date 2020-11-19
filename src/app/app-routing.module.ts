import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewOperationComponent } from './main/new-operation/new-operation.component';
import { OperationsComponent } from './main/operations/operations.component';


const routes: Routes = [
  {path: '', redirectTo : 'operations', pathMatch : 'full'},
  {path: 'operations',
  component: OperationsComponent},
  {path: 'update',
  component: NewOperationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
