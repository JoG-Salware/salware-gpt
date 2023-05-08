import { Injectable } from '@angular/core';
import { IChatGPTSubjectModelResponse } from '../models/openai-response.model';
import { ISalwareCourse } from '../models/courses.model';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class TempStorageService {
  private mainSubjectsKey = 'main-subjects';
  private mainCoursesKey = 'main-courses';

  constructor() { }

  initStorage() {
    const courses = localStorage.getItem(this.mainCoursesKey);
    const subjects = localStorage.getItem(this.mainSubjectsKey);
    if (courses === null) {localStorage.setItem(this.mainCoursesKey, JSON.stringify([]))}
    if (subjects === null) {localStorage.setItem(this.mainSubjectsKey, JSON.stringify([]))}
  }

  getCourses(): ISalwareCourse[] {
    return this.getStoredDataArr<ISalwareCourse[]>(this.mainCoursesKey);
  }

  addCourse(name: string, subjects: IChatGPTSubjectModelResponse[] = []) {
    const courses = this.getCourses();
    courses.push({
      id: uuid.v4(),
      name,
      subjects
    });

    this.setCourses(courses);
  }

  updateCourse(id: string, updatedCourse: ISalwareCourse) {
    const courses = this.getCourses();
    const targetCourseIndex = courses.findIndex((x) => x.id === id);
    courses[targetCourseIndex] = Object.assign(courses[targetCourseIndex], updatedCourse);
    return this.setCourses(courses);
  }

  getCourse(id: string): ISalwareCourse | null {
    const courses = this.getCourses();
    const targetCourseIndex = courses.findIndex((x) => x.id === id);
    if (targetCourseIndex !== -1) {
      return courses[targetCourseIndex];
    }

    return null;
  }

  private setCourses(courses: ISalwareCourse[]) {
    return localStorage.setItem(this.mainCoursesKey, JSON.stringify(courses));
  }

  private getStoredData<T>(key: string): T | null {
    const storedData = localStorage.getItem(key);
    if (storedData === null) { return null; }

    return JSON.parse(storedData);
  }


  private getStoredDataArr<T>(key: string): T | [] {
    const storedDataArr = this.getStoredData<T>(key);
    if (storedDataArr === null) { return []; }
    return storedDataArr;
  }
}
