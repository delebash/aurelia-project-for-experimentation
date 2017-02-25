import 'fetch';//IE Polyfill
import {HttpClient, HttpClientConfiguration, json} from 'aurelia-fetch-client';
import {EventAggregator} from 'aurelia-event-aggregator';
import {BaseService} from '../infrastructure/BaseService';
import {inject} from 'aurelia-framework';
import AjaxInterceptor from 'ajax-interceptor';

@inject(HttpClient,EventAggregator)
export class CustomLogAppender extends BaseService
{
  httpclient;
  eventAggregator;
  constructor(http, eventAggregator) {
    super(http);
    this.eventAggregator = eventAggregator;

    window.addEventListener('error', (errorEvent) => {
      //let msg = `${errorEvent.error.message} \r ${errorEvent.error.stack}`
      let msg = errorEvent.returnValue;
      this.eventAggregator.publish('Unhandled-Error', msg);
    });

    AjaxInterceptor.addResponseCallback((xhr) => {
      if (xhr.status === 500) {
        let msg = `${xhr.status} - ${xhr.statusText} \r ${xhr.responseText}`
        this.eventAggregator.publish('Unhandled-Error', msg);
      }
      if (xhr.status === 0) {
        let msg = `XMLHttpRequest request cancelled by browser (status code 0). See console for details.`
        this.eventAggregator.publish('Unhandled-Error', msg);
      }
    });
    AjaxInterceptor.wire();
  }

//Property 'onunhandledrejection' does not exist on type 'Window'
  /*
   let baseOnunhandledrejection = window.onunhandledrejection;
   window.onunhandledrejection = (rejection) => {
   let msg = `Unhandled promise rejection : ${rejection.reason}`;
   if (rejection.reason.stack) {
   msg += `\r${rejection.reason.stack}`;
   }

   this.eventAggregator.publish('unhandled-error', msg);

   if (baseOnunhandledrejection) {
   baseOnunhandledrejection(data);
   }
   };*/


  debug(logger, message, ...rest) {
    let comment = 'DEBUG ' + logger.id + ' ' + message;
    console.debug(comment, ...rest);

    return new Promise((resolve, reject) => {
      //var url = '/logger/logger/LogDebug';
      var url = 'logger/logger/LogDebug';

      this.http.fetch(url, { method: 'post', body: json(comment) }).then(res => {
        if (res.ok) {
          /*
           res.json().then(data => {
           return resolve(data);
           });*/
        }
        else {
          reject(res.status);
        }
      });
    });
  }

  info(logger, message, ...rest) {
    let comment = 'INFO ' + logger.id + ' ' + message;
    console.info(comment, ...rest);

    return new Promise((resolve, reject) => {
      //var url = '/logger/logger/LogInfo';
      var url = 'logger/logger/LogInfo';

      this.http.fetch(url, { method: 'post', body: json(comment) }).then(res => {
        if (res.ok) {
          /*
           res.json().then(data => {
           return resolve(data);
           });*/
        }
        else {
          reject(res.status);
        }
      });
    });
  }
  warn(logger, message, ...rest) {
    let comment = 'WARN ' + logger.id + ' ' + message;
    console.warn(comment, ...rest);

    return new Promise((resolve, reject) => {
      //var url = '/logger/logger/LogWarn';
      var url = 'logger/logger/LogWarn';

      this.http.fetch(url, { method: 'post', body: json(comment) }).then(res => {
        if (res.ok) {
          /*
           res.json().then(data => {
           return resolve(data);
           });*/
        }
        else {
          reject(res.status);
        }
      });
    });
  }
  error(logger, message, ...rest) {
    let comment = 'ERROR ' + logger.id + ' ' + message;
    console.error(comment, ...rest);

    return new Promise((resolve, reject) => {
      //var url = '/logger/logger/LogError';
      var url = 'logger/logger/LogError';

      this.http.fetch(url, { method: 'post', body: json(comment) }).then(res => {
        if (res.ok) {
          /*
           res.json().then(data => {
           return resolve(data);
           });*/
        }
        else {
          reject(res.status);
        }
      });
    });
  }
}
