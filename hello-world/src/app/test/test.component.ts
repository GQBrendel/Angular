import { Component, OnInit } from '@angular/core';

@Component({
  selector: '[app-test]',
  template: `
  <h2 class="text-sucess">
       {{greetUser()}};
  </h2>

  <h2 [style.color] = "hasError ? 'red' : 'green'">Style Binding</h2>
  <h2 [style.color] = "highlightColor"> Style Binding 2 </h2>
  <h2 [ngStyle] = "titleStyles"> Style Binding 3 </h2>
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

  greetUser()
  {
    return "Hello " + this.name;
  }

}
