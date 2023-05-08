import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './pages/courses/courses.component';
import { CreateCourseComponent } from './pages/courses/create-course/create-course.component';
import { OverviewCourseComponent } from './pages/courses/overview-course/overview-course.component';
import { DetailCourseComponent } from './pages/courses/detail-course/detail-course.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'courses',
    pathMatch: 'full'
  },
  {
    path: 'courses',
    component: CoursesComponent,
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full'
      },
      {
        path: 'overview',
        component: OverviewCourseComponent
      },
      {
        path: 'create',
        component: CreateCourseComponent
      },
      {
        path: 'detail/:id',
        component: DetailCourseComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
