import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-test',
  template: `
  
  <h2 [ngClass] = "messageClasses">
      {{"Hello " + name}}
  </h2>
  <button (click) = "fireEvent()">Send Event</button>

  `,
         
  styles: [`
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
    color: "blue",
    fontStyle: "italic"
  }
  fireEvent()
  {
    this.childEvent.emit("Hello Parent Class o/");
  }
   constructor() { }

  ngOnInit() {
  }
}
