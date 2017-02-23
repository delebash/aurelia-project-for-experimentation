import {inject} from 'aurelia-framework';
import {DreamFactoryAdapter} from '../services/syncfusion-dreamfactory-adapter';
import {AurelaiAuthDreamfactory} from '../services/aurelia-auth-dreamfactory'
import dfconfig from '../config/dreamfactory-config'

@inject(AurelaiAuthDreamfactory)
export class GridQuery {
  constructor(authservice) {
    this.authservice = authservice
  }

  attached() {
    if (this.authservice.authenticated === false) {
      alert('please login')
    } else {
      this.getdata();
    }
  }

  getdata() {
    //requestType = "get" -- request uses query string params via get, "json" -- request uses post to send an object
    var adapterOptions = {requestType: "json"}; //defaults to "get" if not specified or not passed in

    let adapter = new DreamFactoryAdapter;
    let dataManager = ej.DataManager({
      url: "https://api.ageektech.com/api/v2/northwind/_table/customers",
      adaptor: new adapter.syncfusionDreamFactoryAdapter(adapterOptions),
      headers: [{
        "X-DreamFactory-Application-Name": dfconfig.APP_NAME,
        "X-DreamFactory-API-Key": dfconfig.APP_API_KEY,
        "X-DreamFactory-Session-Token": this.authservice.sessiontoken
      }]
    });

    $("#Grid").ejGrid({
      dataSource: dataManager,
      toolbarSettings: {
        showToolbar: true,
        toolbarItems: ["add", "edit", "delete"]
      },
      editSettings: {
        allowEditing: true,
        allowAdding: true,
        allowDeleting: true,
        editMode: "dialog"
      },
      allowPaging: true,
      allowSorting: true,
      allowFiltering: true,
      filterSettings: {showPredicate: true, filterType: "menu", enableCaseSensitivity: true},
      searchSettings: {ignoreCase: false},
      isResponsive: true,
      columns: [
        {field: "id", isPrimaryKey: true, isIdentity: true, width: 10},
        {field: "first_name", headerText: "First Name", width: 110},
        {field: "last_name", headerText: "Last Name", width: 110}
      ]
    });
  }
}

