import { redisConnection } from '@gateway/redis/redis.connection';
import { GatewayServer } from '@gateway/server';
import express, { Express } from 'express';

class Application {
  public initialize(): void {
    const app: Express = express();
    const server: GatewayServer = new GatewayServer(app);
    server.start();
    redisConnection.redisConnect();
  }
}

const application: Application = new Application();
application.initialize();
