import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { EducationLevel } from '../enums/prompt.enums';
import { IChatGPTSubjectModelResponse } from '../models/openai-response.model';

const apiKey = '';

const OpenAIHeaders = {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
  }
}

enum OpenAIModels {
  GPT3Turbo = 'gpt-3.5-turbo'
}

// Response Example for Subject
const subjectResponseFormatExample = `[{"name": "Subject", "priority": 1, "difficulty": 1, "orderOfLearning": 1 }]`;
const subjectSummaryResponseFormatExample = `{"summary": "Summary of X subject"}`;

const JSONParseClause = 'y asegurate de que el formato de tu respuesta sea valido para ser usado con el metodo JSON.parse() de Javascript.';

const subjectPromptGuidelines = (subject: string, educationLevel: EducationLevel, itemQuantity: number) => `
  Para estudiantes de ${educationLevel},
  dame un array de un minimo de ${itemQuantity} items,
  acerca de temas de ${subject}. Tienes este formato de respuesta como ejemplo: ${subjectResponseFormatExample}
  ${JSONParseClause}
`;

const subjectSummaryPromptGuidelines = (subject: string) => `
  Dame un objeto JSON cuya propiedad "summary" contenga una extensa descripcion del tema ${subject} en idioma español. Utilizando este formato como ejemplo: ${subjectSummaryResponseFormatExample}
`;


function promptToUsableQueryContent(prompt: string, model: OpenAIModels) {
  return {
    model,
    messages: [
      {
        role: 'user',
        content: prompt
      }
    ]
  }
}


@Injectable({
  providedIn: 'root'
})
export class ChatgptService {
  private baseURL = 'https://api.openai.com/v1';
  
  constructor(private http: HttpClient) { }

  getSubjectSummary(subject: string) {
    return new Promise<{ summary: string}>((res, rej) => {
      this.getChatGPT3(
        subjectSummaryPromptGuidelines(subject)
      ).then((gptResponse: any) => {
        if (gptResponse.choices.length > 0) {
          try {
            console.log(gptResponse.choices[0].message.content);
            const jsonRes: { summary: string} = JSON.parse(gptResponse.choices[0].message.content);
            console.log(jsonRes);
            res(jsonRes);
          } catch (err) {
            console.error(err);
            rej(new Error('ChatGPT returned an unusable response format'));
          }
        } else {
          rej(new Error('ChatGPT returned no results'));
        }
      }).catch((err: any) => {
        rej(err);
      })
    })
  }
  
  getSubject(subject: string, educationLevel: EducationLevel, itemQuantity: number): Promise<IChatGPTSubjectModelResponse[]> {
    return new Promise((res, rej) => {
      this.getChatGPT3(
        subjectPromptGuidelines(subject, educationLevel, itemQuantity)
      ).then((gptResponse: any) => {
        if (gptResponse.choices.length > 0) {
          try {
            
            console.log(gptResponse.choices[0].message.content);
            const jsonRes: IChatGPTSubjectModelResponse[] = JSON.parse(gptResponse.choices[0].message.content);
            console.log(jsonRes);
            res(jsonRes);
          } catch (err) {
            console.error(err);
            rej(new Error('ChatGPT returned an unusable response format'));
          }
        } else {
          rej(new Error('ChatGPT returned no results'));
        }
      }).catch((err: any) => {
        rej(err);
      })
    })
  }

  private getChatGPT3(prompt: string) {
    const url = `${this.baseURL}/chat/completions`;
    const query = promptToUsableQueryContent(prompt, OpenAIModels.GPT3Turbo);
    return lastValueFrom(this.http.post(url, query, OpenAIHeaders));
  }
}
