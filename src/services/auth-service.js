import {AuthService} from 'aurelia-authentication';
import {Endpoint} from 'aurelia-api';
import {inject, computedFrom} from 'aurelia-framework';
import dfconfig from '../config/dreamfactory-config';

@inject(AuthService, Endpoint.of('api'))
export class AuthenticationService {
  constructor(authservice, api) {
    this.api = api;
    this.authservice = authservice;
    this.username = null;
  };

  async login() {
    try {
      let response = await  this.authservice.login(dfconfig.credentials());
      this.username = response.name;
      return true;

    } catch (error) {
      console.error(error);
      return false;
    }
  }

  // make a getter to get the authentication status.
  // use computedFrom to avoid dirty checking
  @computedFrom('authService.authenticated')
  get authenticated() {
    return this.authservice.authenticated;
  }

  get sessiontoken() {
    return this.authservice.getAccessToken()
  }

  logout() {
    return this.authservice.logout();
  }
}
