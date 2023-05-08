import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ISalwareCourse } from 'src/app/models/courses.model';
import { ChatgptService } from 'src/app/services/chatgpt.service';
import { TempStorageService } from 'src/app/services/temp-storage.service';

@Component({
  selector: 'app-detail-course',
  templateUrl: './detail-course.component.html',
  styleUrls: ['./detail-course.component.scss']
})
export class DetailCourseComponent implements OnInit {
  course: ISalwareCourse | null = null;
  isDiff = false;
  ngOnInit() {
    const courseId = this.route.snapshot.paramMap.get('id');
    if (courseId !== null) {
      const course = this.tempStorage.getCourse(courseId);
      if (course !== null) {
        this.course = course;
      }
    }
  }

  constructor(private tempStorage: TempStorageService, private route: ActivatedRoute, private chatgptService: ChatgptService) {
    
  }

  createCourseSummary() {
    if (this.course !== null) {
      this.chatgptService.getSubjectSummary(this.course.name).then((res) => {
        this.course!.summary = res.summary;
        this.isDiff = true;
      })
    }
  }

  saveCourse() {
    if (this.course !== null) {
      this.tempStorage.updateCourse(this.course?.id, this.course)
    }
  }
}
