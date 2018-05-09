import { Component, OnInit } from '@angular/core';

@Component({
  selector: '[app-test]',
  template: `
  <h2 [ngClass] = "messageClasses">


       {{greetUser()}};
  </h2>
  <button (click) = "onClick($event)">Greet</button>

  <button (click) = "greeting='Welcome Hello'" > Greet </button>
  {{greeting}}
  `,
         
  styles: [`
  .text-sucess 
  {
    color:green;
  }
  .text-danger {
    color: red;
  }
  .text-special
  {
    font-style: italic;
  }
    `]
})
export class TestComponent implements OnInit {

  public name = "Dark Lord of All";
  public greeting = "";  
  public sucessClass = "text-sucess";
  public hasError = false;
  public isSpecial = true;
  public highlightColor = "orange";
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

  onClick(event)
  {
    this.greeting = "Hello Hello Olá";
    console.log(event);
  }
  greetUser()
  {
    return "Hello " + this.name;
  }

}
