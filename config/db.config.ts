import { config } from 'dotenv';
import AWS from './aws.config';

config();
const dynamoDB = new AWS.DynamoDB.DocumentClient(
    {
        region: 'localhost',
        endpoint: 'http://localhost:8001',
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_ACCESS_KEY
    }
);

export default dynamoDB;