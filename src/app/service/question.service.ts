import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http:HttpClient) { }
  private data:any = []
  getQuestionFromJson(classe:String, matiere:String) {
    const url ="https://qcmapi.herokuapp.com/questionsQUIZ/"+matiere+"/20"

    this.http.get(url).subscribe((res)=>{
      this.data = res
      console.log(url)
    })
    return this.http.get<any>(url)


  }
}

