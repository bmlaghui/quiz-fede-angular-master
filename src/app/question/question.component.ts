import { Component, OnInit } from '@angular/core';
import {QuestionService} from "../service/question.service";
import {interval} from "rxjs";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  public name : string = "";
  public classe : string = "";
  public matiere : string = "";
  public questionList:any = [];
  public currentQuestion:number = 0;
  public points:number = 0;
  counter = 60;
  correctAnswer:number = 0;
  inCorrectAnswer:number = 0;
  interval$:any;
  progress:string="0";
  isQuizCompleted:boolean=false;
  isQuizEnable:boolean=false;

  constructor(private  questionService: QuestionService) { }

  ngOnInit(): void {
    this.name = localStorage.getItem("name")!;
    this.matiere = localStorage.getItem("matiere")!;
    this.classe = localStorage.getItem("classe")!;

    this.getAllQuestions();
    //this.getAllQuestions()[Math.floor(Math.random() * this.getAllQuestions().length)]
    this.startCounter();

  }
  getAllQuestions() {
    this.questionService.getQuestionFromJson(this.classe, this.matiere)
      .subscribe(res=>{
        this.isQuizEnable = true
        let curId = res.questions.length;
        // There remain elements to shuffle
        while (0 !== curId) {
          // Pick a remaining element
          let randId = Math.floor(Math.random() * curId);
          curId -= 1;
          // Swap it with the current element.
          let tmp = res.questions[curId];
          res.questions[curId] = res.questions[randId];
          res.questions[randId] = tmp;
        }
        this.questionList = res.questions
        console.log(this.questionList[this.currentQuestion])
        console.log(this.questionList)
        //this.questionList.splice(this.currentQuestion,1)
      },(error) => {
        this.stopCounter()
        this.isQuizEnable = false
        console.log(error.status);
      })

  }
  nextQuestion() {
    this.currentQuestion++;
  }
  previousQuestion() {
    this.currentQuestion--;
  }

  answer(currentQuestion:number , option:any ) {
    if(currentQuestion === this.questionList.length) {
      this.isQuizCompleted = true;
      this.stopCounter();
    }
    if(option.correct) {
      this.points+=10;
      this.correctAnswer++;
      setTimeout(() => {
        this.currentQuestion++;
        this.getProgressPercent();
      }, 1000);

    }
    else {
      setTimeout(() => {
        this.currentQuestion++;
        this.inCorrectAnswer++;
        this.getProgressPercent();
      }, 1000);

    }
  }

  startCounter() {
      this.interval$ = interval(1000)
      .subscribe(val=>{
        this.counter--;
        if(this.counter===0) {
          this.currentQuestion++;
          this.counter=60;
        }
      });
    setTimeout(() => {
      this.interval$.unsubscribe();
     this.isQuizCompleted = true;
    }, 60000)
  }

  stopCounter() {
    this.interval$.unsubscribe();
    this.counter = 0;
  }

  resetCounter() {
    this.stopCounter();
    this.counter = 0;
    this.startCounter();
  }

  resetQuiz(){
    this.resetCounter();
    this.getAllQuestions();
    this.points=0;
    this.counter=60;
    this.currentQuestion=0;
    this.progress="0";
  }

  getProgressPercent() {
    this.progress = ((this.currentQuestion/this.questionList.length)*100).toString();
    return this.progress;
  }
}
