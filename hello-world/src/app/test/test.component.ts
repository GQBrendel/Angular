import { Component, OnInit } from '@angular/core';

@Component({
  selector: '[app-test]',
  template: `
  <h2 [ngClass] = "messageClasses">
       {{greetUser()}};
  </h2>

  <h2 *ngIf = "displayName; else elseBlock" > ngif Directive </h2>
  
  <ng-template #elseBlock>
    <h2> Name is hidden </h2>
  </ng-template>
  
  <div *ngIf="displayName; then thenBlock; else otherElseBlock"></div>

  <ng-template #thenBlock>
    <h2>Flag is True</h2>
  </ng-template>

  <ng-template #otherElseBlock>
    <h2>Flag is False</h2>
  </ng-template>

  `,
         
  styles: [`
  .text-sucess {color : green;}
  .text-danger {color : red;}
  .text-special {font-style: italic;}
  `]
})
export class TestComponent implements OnInit {

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
