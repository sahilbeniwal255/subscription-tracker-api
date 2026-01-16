import {config} from 'dotenv';

config({path : `.env.${process.env.NODE_ENV || 'development'}`});

//this will load the environment variables from the appropriate .env file based on the current NODE_ENV value
//where NODE_ENV can be development, production
//if NODE_ENV is not set, it defaults to 'development'
//config() function from dotenv package is used to load the environment variables into process.env

export const {PORT, DB_URI} = process.env;