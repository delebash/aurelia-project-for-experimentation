// import regeneratorRuntime from 'regenerator-runtime';
// //add es2017 generators
// window.regeneratorRuntime = regeneratorRuntime;

export class ES2017Tests{
  gentest() {
    let genObj = this.genfunc();
    genObj.next()
    genObj.next()
  }

  // // fake asynchronise operation
  fakeop(ms) {
    return new Promise(r => setTimeout(r, ms));
  }

  async  asynctest() {
    await this.fakeop(1000);
    console.log('Async success')
  }

  * genfunc() {
    console.log('First Generator');
    yield; // (A)
    console.log('Second Generator'); // (B)
  }
}
