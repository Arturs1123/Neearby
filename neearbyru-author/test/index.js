// const Mocha = require('mocha');
// const path = require('path');
// const glob = require('glob');
//
// require('colors');
//
// const task = process.argv[2];
//
// const mocha = new Mocha({
//     reporter: 'spec',
//     useColors: true,
// });
//
//
//
// let files = glob.sync(`${path.join(__dirname, 'test', '*')}.js`);
//
// if (task) {
//     files = glob.sync(`${path.join(__dirname, 'test', task)}.js`);
// }
//
// if (!files.length) {
//     return console.error(
//         `${'Отсутствуют тесты'.red.bold}`
//     );
// }
//
// files.forEach(file => {
//     mocha.addFile(file);
// });
//
// // Run the tests.
// mocha.run((failures) => {
//     process.exitCode = failures ? 1 : 0;
// });
