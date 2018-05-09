import { Component, OnInit } from '@angular/core';

@Component({
  selector: '[app-test]',
  template: `
  <h2>
      Welcome {{name}}
  </h2>
  <h2>{{2 + 2}}</h2>
  <h2>{{"Welcome " + name}}</h2>
  <h2>{{name.lenght}}</h2>
  <h2>{{name.toUpperCase()}}</h2>
  <h2>{{greetUser()}}</h2>
  <h2>{{siteUrl}}</h2>
  `,
         
  styles: [`

    div {
      color: red;
    }
    `]
})
export class TestComponent implements OnInit {

  public name = "Dark Lord of All";
  public siteUrl = window.location.href;
  constructor() { }

  ngOnInit() {
  }

  greetUser()
  {
    return "Hello " + this.name;
  }

}
