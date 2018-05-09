import { Component, OnInit } from '@angular/core';

@Component({
  selector: '[app-test]',
  template: `
  <h2 class="text-sucess">
       {{greetUser()}};
  </h2>
  <h2 [class] ="sucessClass">
    {{greetUser()}};
  </h2>
  <h2 [ngClass]= "messageClasses" > Another Test</h2>

 
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
  public sucessClass = "text-sucess";
  public hasError = true;
  public isSpecial = true;
  public messageClasses = {
    "text-sucess": !this.hasError,
    "text-danger": this.hasError,
    "text-special": this.isSpecial

  }

   constructor() { }

  ngOnInit() {
  }

  greetUser()
  {
    return "Hello " + this.name;
  }

}
