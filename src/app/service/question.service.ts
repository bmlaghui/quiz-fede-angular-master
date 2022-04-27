import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http:HttpClient) { }
  private data:any = []
  getQuestionFromJson(classe:String, matiere:String) {
    const url ="http://localhost:8080/questionsQUIZ/"+matiere+"/10"


    this.http.get(url).subscribe((res)=>{
      this.data = res
      console.log(this.data)
    })
    return this.http.get<any>(url)


  }
}

