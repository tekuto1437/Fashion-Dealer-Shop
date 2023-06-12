import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GridListComponent} from "../components/grid-list/grid-list.component";

const routes: Routes = [
  {
    path: '',
    component: GridListComponent
  },
  {
    path: 'login',
    loadChildren: () => import('../pages/pages.module').then((m) => m.PagesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
