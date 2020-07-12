import "reflect-metadata";
import express, {Express} from "express";
import cors from 'cors';
import { Server } from '@overnightjs/core';
import {createConnection, Connection} from "typeorm";
import { UserService } from './services/UserService';
import { UserController } from './controllers/UserController';
export class AppServer extends Server {

    constructor() {
        
        super();

        this.app.use(express.json({
            type: 'application/json',
        }));
        
        this.app.use(cors());

    }

    public setupControllers(
        userService: UserService,
    ): void {

        const userController = new UserController(
            userService,
        );

        super.addControllers([
            userController,
        ]);

    }

}

export async function createServer(): Promise<Express> {

    const dbConnection = await createConnection();

    const appServer = new AppServer();

    const userService = new UserService(
        dbConnection,
    );

    appServer.setupControllers(
        userService,
    );

    const app: Express = appServer.app as Express;

    return app;

}
