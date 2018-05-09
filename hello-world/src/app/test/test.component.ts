import { Component, OnInit } from '@angular/core';

@Component({
  selector: '[app-test]',
  template: `
  <h2>
      {{greetUser()}};
  </h2>
  <input [id] = "myId" type = "text" value = "Whyscas">
  <input bind-disabled = "isDisabled" id = "{{myId}}" type = "text" value = "Whiscas">
 
  `,
         
  styles: [`

    div {
      color: red;
    }
    `]
})
export class TestComponent implements OnInit {

  public name = "Dark Lord of All";
  public myId = "testId";
  public isDisabled = true;
   constructor() { }

  ngOnInit() {
  }

  greetUser()
  {
    return "Hello " + this.name;
  }

}
