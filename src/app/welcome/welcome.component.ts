import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  @ViewChild('name') nameKey!: ElementRef;
  @ViewChild('matiere') matiereKey!: ElementRef;
  @ViewChild('classe') classeKey!: ElementRef;
  public myName: string = '';
  private form: FormGroup | undefined;

  constructor() { }



  ngOnInit(): void {
    this.form = new FormGroup({
      newTask: new FormControl('', [Validators.required]),
    });
  }
  startQuiz() {
    localStorage.setItem("name", this.nameKey.nativeElement.value)
    localStorage.setItem("matiere", this.matiereKey.nativeElement.value)
    localStorage.setItem("classe", this.classeKey.nativeElement.value)
  }

  onFormSubmit(userForm: NgForm) {
    console.log('Name:' + userForm.controls['name'].value);


  }
}
