import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ISalwareCourse } from 'src/app/models/courses.model';
import { TempStorageService } from 'src/app/services/temp-storage.service';

@Component({
  selector: 'app-overview-course',
  templateUrl: './overview-course.component.html',
  styleUrls: ['./overview-course.component.scss']
})
export class OverviewCourseComponent implements OnInit {
  courses: ISalwareCourse[] = [];

  constructor(private router: Router, private tempStorage: TempStorageService) { }

  ngOnInit(): void {
    this.courses = this.tempStorage.getCourses();
    console.log(this.courses);
  }

  goToCreateCourse() {
    this.router.navigate(['/courses/create']);
  }

  goToDetailCourse(id: string) {
    this.router.navigate([`/courses/detail/${id}`])
  }
}
