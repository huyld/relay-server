import express from 'express';
import * as http from 'http';
import { Server, Socket } from 'socket.io';

export class RelayServer {
  public static readonly PORT: number = 4200;
  public static readonly TIMEOUT: number = 9999999;
  private app!: express.Application;
  private server!: http.Server;
  private io!: Server;
  private providerSocket: Socket | undefined;
  private port!: number;

  constructor() {
    this.createApp();
    this.config();
    this.createServer();
    this.sockets();
    this.listen();
  }

  private createApp(): void {
    this.app = express();
  }

  private createServer(): void {
    this.server = http.createServer(this.app);
  }

  private config(): void {
    this.port = RelayServer.PORT;
  }

  private sockets(): void {
    this.io = new Server(this.server, {
      connectTimeout: RelayServer.TIMEOUT,
    });
  }

  private listen(): void {
    // Listen to provider context
    this.server.listen(this.port, () => {
      console.log('Running server on port %s', this.port);
    });

    // Listen to request for shared object's property value
    // from consumer context
    this.app.get('/getSharedObjProp', (req, res) => {
      console.log('Received request for property: ', req.query.propName);
      if (!!this.providerSocket) {
        // Emit event to provider context to get property's value
        this.providerSocket.emit(
          'getProp',
          req.query.propName,
          (value: any) => {
            console.log(`Provider context returned value for ${req.query.propName}:`, value);
            res.send({ propValue: value });
          }
        );
      }
    });

    // Init socket connection with provider context
    this.io.on('connect', (socket: Socket) => {
      console.log('Connected client on port %s.', this.port);
      this.providerSocket = socket;

      socket.on('disconnect', () => {
        console.log('Client disconnected');
        this.providerSocket = undefined;
      });
    });
  }

  public getApp(): express.Application {
    return this.app;
  }
}
