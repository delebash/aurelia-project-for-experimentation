import {inject} from 'aurelia-framework';
import routes from './config/config.routes'

export class App {
  configureRouter(config, router) {
    config.title = 'Aurelia';
    config.map(routes);
    this.router = router;
  }
}
