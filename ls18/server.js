const express = require('express');
const { Worker } = require('worker_threads');
const { fork, exec, spawn } = require('child_process');
const cluster = require('cluster');
const os = require('os');
const app = express();
const PORT = 3000;

if (cluster.isPrimary) {
    const numCPUs = os.cpus().length;
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('online', worker => {
        console.log(`Worker PID: ${worker.process.pid} is online`);
    });

} else {

    app.get('/heavy-thread', (req, res) => {
        const start = Date.now();
        const worker = new Worker('./worker-task.js');

        worker.once('message', sum => {
            const duration = (Date.now() - start) / 1000;
            if (duration > 5) console.warn('Warning: Slow Task');
            res.json({
                result: sum,
                pid: worker.threadId,
                duration: `${duration}s`,
                type: 'worker'
            });
        });

        worker.on('error', err => {
            res.status(500).send('Worker error: ' + err.message);
        });
    });

    app.get('/heavy-fork', (req, res) => {
        const start = Date.now();
        const child = fork('./fork-task.js');

        child.on('message', result => {
            const duration = (Date.now() - start) / 1000;
            if (duration > 5) console.warn('Warning: Slow Task');
            res.json({
                result,
                pid: child.pid,
                duration: `${duration}s`,
                type: 'fork'
            });
        });

        child.on('error', err => {
            res.status(500).send('Fork error: ' + err.message);
        });
    });

    app.get('/run-shell', (req, res) => {
        const start = Date.now();
        const shell = exec('ls -lh', (error, stdout, stderr) => {
            const duration = (Date.now() - start) / 1000;
            if (duration > 5) console.warn('Warning: Slow Task');
            res.json({
                stdout,
                stderr,
                pid: shell.pid,
                duration: `${duration}s`,
                type: 'shell'
            });
        });
    });

    app.get('/log-grep', (req, res) => {
        const grep = spawn('grep', ['ERROR', 'logs.txt']);
        res.write(`PID: ${grep.pid}\nType: spawn\n\n`);
        grep.stdout.on('data', data => res.write(data));
        grep.stderr.on('data', data => res.write(`stderr: ${data}`));
        grep.on('close', code => res.end(`\nProcess exited with code ${code}`));
    });

    app.get('/clustered', (req, res) => {
        res.send(`Handled by PID: ${process.pid}, type: cluster`);
    });

    app.listen(PORT, () => {
        console.log(`Worker PID: ${process.pid} running at http://localhost:${PORT}`);
    });
}
