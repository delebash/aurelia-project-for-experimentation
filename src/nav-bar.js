import {inject,bindable} from 'aurelia-framework';
import {AuthenticationService} from './services/auth-service'

@inject(AuthenticationService)
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
