import { Component, OnInit } from '@angular/core';

@Component({
  selector: '[app-test]',
  template: `
  <h2 [ngClass] = "messageClasses">
       {{greetUser()}};
  </h2>

  <input [(ngModel)] = "name" type = "text">

  {{name}}
  `,
         
  styles: [``]
})
export class TestComponent implements OnInit {

  public name = "Dark Lord of All";
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

  logMessage(value)
  {
    console.log(value);
  }
  greetUser()
  {
    return "Hello " + this.name;
  }

}
