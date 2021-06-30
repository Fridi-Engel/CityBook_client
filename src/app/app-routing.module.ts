import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './form/form.component';
import { InstructionsComponent } from './instructions/instructions.component';


const routes: Routes = [
  { path: '', redirectTo: '/app-instructions', pathMatch: 'full' },
  { path: 'form', component: FormComponent },
  { path: 'app-instructions', component: InstructionsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
