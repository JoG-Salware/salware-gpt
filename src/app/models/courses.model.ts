import { IChatGPTSubjectModelResponse } from "./openai-response.model";

export interface ISalwareCourse {
  id: string;
  name: string;
  summary?: string;
  subjects: IChatGPTSubjectModelResponse[];
}

// export interface ISalwareCourseUpdated {
//   name: string;
//   // subjects: IChatGPTSubjectModelResponse[];
// }
