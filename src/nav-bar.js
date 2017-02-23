import {inject,bindable} from 'aurelia-framework';
import {AurelaiAuthDreamfactory} from './services/aurelia-auth-dreamfactory'

@inject(AurelaiAuthDreamfactory)
export class NavBar {
  @bindable router = null;
  constructor(authservice) {

    this.authservice = authservice
  }

  logout() {
    this.authservice.logout();
    console.log('logged out')
  }
  async login() {
    //this.authenticated = this.authservice.authenticated;
    let loggedin = ""
    try {
      if (this.authservice.authenticated === false) {
        loggedin = await this.authservice.login();
        if (loggedin = true) {
          console.log('logged in')
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
}
