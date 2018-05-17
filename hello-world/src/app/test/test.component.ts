import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-test',
  template: `
  
  <h2 [ngClass] = "messageClasses">
      {{"Hello " + name}}
  </h2>
  <button (click) = "fireEvent()">Send Event</button>
  <h1 [ngClass] = "player" >\\o/</h1>
  `,
         
  styles: [`

  .text-Large {font-size": "60px"}

  .text-sucess {color : green;}
  .text-danger {color : red;}
  .text-special {font-style: italic;}
  `]
})
export class TestComponent implements OnInit {

  
  @Input("parentData") public name;
  @Output() public childEvent = new EventEmitter();
  public displayName = false;
  public sucessClass = "text-sucess";
  public hasError = false;
  public isSpecial = true;
  public messageClasses = {
    "text-sucess": !this.hasError,
    "text-danger": this.hasError,
    "text-special": this.isSpecial

  }
  public titleStyles = {
    
  }
  public player = {
    "text-Large" : true,
    
    "text-sucess" : true
  }
  fireEvent()
  {
    this.childEvent.emit("Hello Parent Class o/");
  }
   constructor() { }

  ngOnInit() {
  }
}
