export interface IChatGPTSubjectModelResponse {
  id: string;
  name: string;
  priority: number;
  difficulty: number;
  orderOfLearning: number;
  // childSubjects: { name: string; difficulty: number; orderOfLearning: number }[]
}
