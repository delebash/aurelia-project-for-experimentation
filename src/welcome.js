//import {computedFrom} from 'aurelia-framework';
// import regeneratorRuntime from 'regenerator-runtime';
// //add es2017 generators
// window.regeneratorRuntime = regeneratorRuntime;

export class Welcome {
  heading = 'Welcome to the Aurelia Navigation App!';
  firstName = 'John';
  lastName = 'Doe';
  previousValue = this.fullName;

  //Getters can't be directly observed, so they must be dirty checked.
  //However, if you tell Aurelia the dependencies, it no longer needs to dirty check the property.
  //To optimize by declaring the properties that this getter is computed from, uncomment the line below
  //as well as the corresponding import above.
  //@computedFrom('firstName', 'lastName')
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  submit() {
  let genObj = this.genFunc();
 genObj.next()
  this.hello()
  }

  canDeactivate() {
    if (this.fullName !== this.previousValue) {
      return confirm('Are you sure you want to leave?');
    }
  }

  // // fake asynchronise operation
  fakeop(ms) {
    return new Promise(r => setTimeout(r, ms));
  }
  wait(ms) {
    return new Promise(r => setTimeout(r, ms));
  }

  async  hello() {
    await this.fakeop(1000);
    console.log('Async success')
  }

  * genFunc() {
    console.log('First Generator');
    yield; // (A)
    console.log('Second Generator'); // (B)
  }
}

export class UpperValueConverter {
  toView(value) {
    return value && value.toUpperCase();
  }
}
