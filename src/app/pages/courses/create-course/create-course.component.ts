import { Component } from '@angular/core';
import { EducationLevel } from 'src/app/enums/prompt.enums';
import { IChatGPTSubjectModelResponse } from 'src/app/models/openai-response.model';
import { ChatgptService } from 'src/app/services/chatgpt.service';
import { TempStorageService } from 'src/app/services/temp-storage.service';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss']
})
export class CreateCourseComponent {
  subject: string = '';
  courses: IChatGPTSubjectModelResponse[] = [];
  
  queryPrompt(formResuLt:{ subject: string, educationLevel: EducationLevel, itemQuantity: number }) {
    this.courses = [];
    this.subject = '';
    this.chatGptService.getSubject(formResuLt.subject, formResuLt.educationLevel, formResuLt.itemQuantity).then((res) => {
      this.courses = res;
      this.subject = formResuLt.subject;
    });
  }

  constructor(private chatGptService: ChatgptService, private tempStorage: TempStorageService) {
    
  }

  saveCurrentGeneratedCourse() {
    this.tempStorage.addCourse(this.subject, this.courses);
  }
}
