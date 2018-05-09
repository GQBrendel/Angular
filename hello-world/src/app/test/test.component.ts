import { Component, OnInit } from '@angular/core';

@Component({
  selector: '[app-test]',
  template: `
  <h2 [ngClass] = "messageClasses">
       {{greetUser()}};
  </h2>

  <div [ngSwitch] = "color">
    <div *ngSwitchCase = "'red'">You Picked red color</div>
    <div *ngSwitchCase = "'blue'">You Picked blue color</div>
    <div *ngSwitchCase = "'green'">You Picked green color</div>
    <div *ngSwitchDefault>Pick Again</div>
  </div>

  `,
         
  styles: [`
  .text-sucess {color : green;}
  .text-danger {color : red;}
  .text-special {font-style: italic;}
  `]
})
export class TestComponent implements OnInit {

  public color = "blue";


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
