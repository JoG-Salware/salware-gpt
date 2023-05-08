import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input'; 
import { MatButtonModule } from '@angular/material/button'; 
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatListModule } from '@angular/material/list'; 
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { SpecificationControlsComponent } from './components/prompt-helper/specification-controls/specification-controls.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { CreateCourseComponent } from './pages/courses/create-course/create-course.component';
import { OverviewCourseComponent } from './pages/courses/overview-course/overview-course.component';
import { DetailCourseComponent } from './pages/courses/detail-course/detail-course.component';
import {MatChipsModule} from '@angular/material/chips'; 
@NgModule({
  declarations: [
    AppComponent,
    SpecificationControlsComponent,
    CoursesComponent,
    CreateCourseComponent,
    OverviewCourseComponent,
    DetailCourseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatChipsModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
