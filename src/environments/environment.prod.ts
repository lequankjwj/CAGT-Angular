import { IEnvironment } from "./environment.interface";

export const environment: IEnvironment = {
    name: 'deploy',
    production: true,
    version: Math.floor(Math.random() * 999999),
};
