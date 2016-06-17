#!/usr/bin/env node

'use strict';

const packStat = require('packstat');

const colors = require('colors/safe');

const argv = require('yargs')

    .usage(colors.cyan.bold('\nUsage: $0 -u [module.name]'))

    .demand(['u'])

    .describe('u', 'Node module name')

    .argv;

packStat(argv.u).then(user => {
	const inf = [];

	const packageRow = (prefix, key) => {
		if (user[key]) {
			inf.push(`${prefix}: ${user[key]}`);
		}
	};

	console.log('\n');

	packageRow(' ❱ Last Day   ', 'lastDay');

	packageRow(' ❱ Last Week  ', 'lastWeek');

	packageRow(' ❱ Last Month ', 'lastMonth');

	console.log(inf.join('\n'));

	console.log('\n');
});
