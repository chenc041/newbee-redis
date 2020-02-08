import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from '../content/content.component';

const contentRoutes: Routes = [
  { path: '',  component: ContentComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forChild(contentRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule { }
