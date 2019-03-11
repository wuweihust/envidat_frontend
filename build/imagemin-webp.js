'use strict'
const ora = require('ora')
const path = require('path');
const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');

const imageminSpinner = ora('minimize images for production...')

const inputAbout = path.join(__dirname, '../src/assets/about/');
const outputAbout = path.join(__dirname, '../src/assets/about/');

const inputCards = path.join(__dirname, '../src/assets/cards/');
const outputCards = path.join(__dirname, '../src/assets/cards/');

const inputIcons = path.join(__dirname, '../src/assets/icons/');
const outputIcons = path.join(__dirname, '../src/assets/icons/');

const inputLogo = path.join(__dirname, '../src/assets/logo/');
const outputLogo = path.join(__dirname, '../src/assets/logo/');

// let inputDest = path.join(__dirname, '../src/assets/');
// let outputDest = path.join(__dirname, '../src/assets/');

imageminSpinner.start()

let inputDest = inputAbout;
let outputDest = outputAbout;

imagemin([inputDest + '*.{jpg,png}'], outputDest, {
	use: [
		// imageminWebp({lossless: true})
		imageminWebp({preset: 'photo'})
	],
  verbose: true,
}).then((files) => {
  console.log("Imagemin " + outputAbout + " finished " + files.length);
});

inputDest = inputCards;
outputDest = outputCards;

imagemin([inputDest + '*.{jpg,png}'], outputDest, {
	use: [
		// imageminWebp({lossless: true})
		imageminWebp({preset: 'photo'})
	],
  verbose: true,
}).then((files) => {
  console.log("Imagemin " + outputCards + " finished " + files.length);
});


inputDest = inputIcons;
outputDest = outputIcons;

imagemin([inputDest + '*.{jpg,png}'], outputDest, {
	use: [
		imageminWebp({preset: 'icon'})
	],
  verbose: true,
}).then((files) => {
  console.log("Imagemin " + outputIcons + " finished " + files.length);
});

inputDest = inputLogo;
outputDest = outputLogo;

imagemin([inputDest + '*.{jpg,png}'], outputDest, {
	use: [
		imageminWebp({preset: 'picture'})
	],
  verbose: true,
}).then((files) => {
  console.log("Imagemin " + outputLogo + " finished " + files.length);
});

imageminSpinner.stop();
