import {createConnection} from "typeorm";
import {createServer} from "./server";
import {Express} from "express";

export async function createAppServer() {

    try {

        const app: Express = await createServer();

        return new Promise((resolve) => {

             const server = app.listen(3030, () => {
                console.log('server is running!');
                resolve(server);
            });

        });

    } catch(e) {

        console.log('server creation failed', e);

    }

}


