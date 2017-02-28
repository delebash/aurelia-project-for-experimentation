//#region import
import {inject, computedFrom} from 'aurelia-framework';
import routes from '../config/config.routes'


//#endregion

@inject(routes)
export class Layout {
  //#region Properties

  menus = [];
  selectedRoute;


  sidebarVisibleWindowWidth = 768;
  sidebarHiddenClass = "";
  sidebarVisible;

  //#endregion

  constructor(routes) {
    this.routes = routes
    this.sidebarVisible = window.innerWidth >= this.sidebarVisibleWindowWidth;
  }

  //#region au events

  attached() {
    let t = this;
    window.addEventListener("resize", function (e) {
      if (window.innerWidth <= t.sidebarVisibleWindowWidth) {
        t.handleSidebar(false);
      } else {
        t.handleSidebar(true);
      }
    });
  }

  configureRouter(config, router) {
    config.title = 'Aurelia';

    // let actualRoutes = routes.filter(item => {
    //   return item.settings && item.settings.isRoute === true;
    // });

    this.menus = this.routes.filter(item => {
      return item.nav === true;
    });

    config.map(this.routes);
    config.mapUnknownRoutes("viewmodels/notfound");

    let t = this;

    let step = {
      run: (navigationInstruction, next) => {
        t.selectedRoute = navigationInstruction.config;
        return next();
      }
    };
    config.addPreActivateStep(step);

    this.router = router;
  }

  toggleSidebar(event) {
    event.preventDefault();
    this.handleSidebar(!this.sidebarVisible);
    event.returnValue = true;
  }


  handleSidebar(show) {
    this.sidebarVisible = show;

    let sidebar = $('#sidebar');

    if (show) {
      sidebar.addClass('animated fadeIn');
      this.sidebarHiddenClass = "sidebar-visible";
    } else {
      this.sidebarHiddenClass = "sidebar-hidden";
    }
  }

  menuClick(event) {
    if (event.detail.hasChildren === true) {
      event.preventDefault();
      return false;
    } else {
      if (window.innerWidth <= this.sidebarVisibleWindowWidth) {
        this.handleSidebar(false);
      }

      return true;
    }
  }

  //#endregion

}

