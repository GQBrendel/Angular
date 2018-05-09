import { Component, OnInit } from '@angular/core';

@Component({
  selector: '[app-test]',
  template: `
  <h2 [ngClass] = "messageClasses">
       {{greetUser()}};
  </h2>

  <div *ngFor = "let color of colors; index as i; first as f; last as l, odd as o">
     <h2>Index => {{i}} Is this first? =>  {{f}} {{color}} Is this last? => {{l}} Is this odd? => {{o}}</h2>
  </div>

  

  `,
         
  styles: [`
  .text-sucess {color : green;}
  .text-danger {color : red;}
  .text-special {font-style: italic;}
  `]
})
export class TestComponent implements OnInit {

  public colors = ["red", "blue", "green", "yellow"];


  public displayName = false;
  public name = "Dark Lord of All";
   public sucessClass = "text-sucess";
  public hasError = false;
  public isSpecial = true;
  public messageClasses = {
    "text-sucess": !this.hasError,
    "text-danger": this.hasError,
    "text-special": this.isSpecial

  }
  public titleStyles = {
    color: "blue",
    fontStyle: "italic"
  }

   constructor() { }

  ngOnInit() {
  }

   greetUser()
  {
    return "Hello " + this.name
  }

}
