import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';

// function extractJSON(str: string) {
//   var firstOpen, firstClose, candidate;
//   firstOpen = str.indexOf('{', firstOpen? firstOpen + 1 : 0);
//   do {
//       firstClose = str.lastIndexOf('}');
//       console.log('firstOpen: ' + firstOpen, 'firstClose: ' + firstClose);
//       if(firstClose <= firstOpen) {
//           return null;
//       }
//       do {
//           candidate = str.substring(firstOpen, firstClose + 1);
//           console.log('candidate: ' + candidate);
//           try {
//               var res = JSON.parse(candidate);
//               console.log('...found');
//               return [res, firstOpen, firstClose + 1];
//           }
//           catch(e) {
//               console.log('...failed');
//           }
//           firstClose = str.substr(0, firstClose).lastIndexOf('}');
//       } while(firstClose > firstOpen);
//       firstOpen = str.indexOf('{', firstOpen + 1);
//   } while(firstOpen != -1);
// }


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  arrOfItems: {name: string, imgURL: string}[] = [];
  constructor(private http: HttpClient) {

  }

  title = 'chatgptdemo';

  onSubmitForm(e: Event) {
    e.preventDefault();
    console.log(e);
  }

  submitQuery(val: string) {
    this.http.post('https://api.openai.com/v1/chat/completions', {
      "model": "gpt-3.5-turbo",
      "messages": [{
        "role": "user",
        "content": `Para jovenes de espana de secundaria, dame una lista de ${val}, con imagenes cada uno. El formato deberia ser JSON, y unicamente el contenido de tu respuesta debe ser el JSON, y tener las siguientes propiedades: imgURL y name. Ejemplo:
        [{
          "imgURL": "https://picsum.photos/200/300",
          "name": "Ejemplo 1"
        }]`
      }]
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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',
      }
    }).subscribe((res: any) => {
      this.arrOfItems = JSON.parse(res.choices[0].message.content);
      
      // if (JSONContent !== null && JSONContent !== undefined && JSONContent.length > 0) {
      //   this.arrOfItems = JSONContent;
      // } 
      console.log(res.choices[0].message.content);
    });
  }

}
