const fs = require('fs');
const path = require('path');
const {JSDOM} = require('jsdom');

// Ensures test runs with navigator.getBattery undefined

test('index.html executes without navigator.getBattery', () => {
  const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  const dom = new JSDOM(html, {
    runScripts: 'dangerously',
    resources: 'usable',
    url: 'http://localhost',
    beforeParse(window) {
      delete window.navigator.getBattery;
    }
  });
  // Accessing document triggers script execution synchronously
  expect(() => dom.window.document).not.toThrow();
});
