import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { FeedPage } from '../feed/feed';
import { ProfilePage } from '../profile/profile';

import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ProfilePage;
  tab3Root = ContactPage;  
  tab4Root = FeedPage;
  activeTab: number = 1;

  
  constructor(public navCtrl: NavController, public params: NavParams) {


  }
  ngOnInit() {
    this.activeTab = this.params.get("tab") ? this.params.get("tab") : 0;
  }
  
  public setIndex(n:number)
  {
    this.activeTab = n;
  }
}
