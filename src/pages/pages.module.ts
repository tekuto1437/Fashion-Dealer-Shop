import { NgModule } from '@angular/core';
import { PagesRoutingModule } from './pages-routing.module';
import { MaterialModule } from '../material/material.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { AuthPageComponent } from './auth/auth.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    MaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [PagesRoutingModule],
  declarations: [AuthPageComponent],
  providers: [HttpClient],
})
export class PagesModule {}
