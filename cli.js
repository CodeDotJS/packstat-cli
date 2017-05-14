#!/usr/bin/env node

'use strict';

const dns = require('dns');
const got = require('got');
const cheerio = require('cheerio');
const logUpdate = require('log-update');
const ora = require('ora');
const updateNotifier = require('update-notifier');
const pkg = require('./package.json');

updateNotifier({pkg}).notify();
const arg = process.argv[2];
const spinner = ora();

if (!arg) {
	console.log(`
 Usage: packstat <package-name>

 Example:
   $ packstat express
   `);
	process.exit(1);
}

dns.lookup('npmjs.com', err => {
	if (err) {
		logUpdate(`\n› Please check your internet connection\n`);
		process.exit(1);
	} else {
		logUpdate();
		spinner.text = `Fetching download counts for ${arg}`;
		spinner.start();
	}
});

const url = `https://npmjs.com/package/${arg}`;

got(url).then(res => {
	const $ = cheerio.load(res.body);
	logUpdate(`
› Last day   : ${$('.pretty-number').eq(0).text()} downloads
› Last week  : ${$('.pretty-number').eq(1).text()} downloads
› Last month : ${$('.pretty-number').eq(2).text()} downloads
	`);
	spinner.stop();
}).catch(err => {
	if (err) {
		logUpdate(`\n› ${arg} is not a node package\n`);
		process.exit(1);
	}
});
