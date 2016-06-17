import childProcess from 'child_process';
import test from 'ava';
import pify from 'pify';

test(async t => {
	const stdout = await pify(childProcess.execFile)('./cli.js', ['-u express'], {cwd: __dirname});
	t.is(stdout.trim().split('\n')[0], '');
});
