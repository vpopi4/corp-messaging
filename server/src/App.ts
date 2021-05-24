import express from 'express';
import { createServer } from 'http';
import path from 'path';
import { port } from '.';
import { getDate } from './utils';
import { Server } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

export default class App {
    expressApp;
    httpServer;
    io: Server<DefaultEventsMap, DefaultEventsMap>;

    constructor() {
        this.expressApp = express()
        this.httpServer = createServer(this.expressApp);
        this.io = new Server(this.httpServer, {
            cors: {
                origin: [
                    "http://localhost:5000",
                    "http://localhost:3000"
                ],
                methods: ["GET", "POST"],
                allowedHeaders: ["my-custom-header"],
                credentials: true
            },
        });

        this.expressApp.use(express.urlencoded({ extended: true }));
        this.expressApp.use(express.json());
        this.expressApp.use(express.static(path.join(__dirname, "public", "build")));
        this.expressApp.get("/", (req, res) => {
            res.sendFile(path.join(__dirname, "public", "build", "index.html"));
        });        
    }

    setNamespace(namespace:(io: Server<DefaultEventsMap, DefaultEventsMap>) => void) {
        namespace(this.io);
    }

    listen() {
        this.httpServer.listen(port, this.serverListeningListener);
    }

    protected serverListeningListener() {
        console.log(`${getDate().all}: listening on port ${port}`)
    }
}
