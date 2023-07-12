import {  GraphQLSchema, GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } from "graphql";
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import { v1 as uuidv1 } from 'uuid';
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dynamoDB from './config/db.config'
import UserType from "./GraphQL_Types/UserType";
import GetAllItemsResponseType from "./GraphQL_Types/GetAllItemsResponseType";
import UserKeyType from "./GraphQL_Types/UserKeyType";
import RegisterType from "./GraphQL_Types/RegisterType";


const app = express();
//dotenv
dotenv.config()

// parse json request body
app.use(bodyParser.json())

// enable cors
app.use(cors());
app.options("*", cors());

//port
const PORT = 5000;
//secret key
const secretKey = 'your-secret-key';

// Define GraphQL schema
const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            hello: {
                type: GraphQLString,
                resolve: () => 'Hello, World!'
            },
            getUser: {
                type: UserType,
                args: {
                    id: { type: GraphQLString }
                },
                resolve: async (_, { id }) => {
                    const params = {
                        TableName: 'DealerTable',
                        Key: { id }
                    };
                    const result = await dynamoDB.get(params).promise();
                    console.log(result)
                    return result.Item;
                }
            },
            //filter the data by state and city ....
            getUserByStateAndCity: {
                type: new GraphQLList(UserType),
                args: {
                    state: { type: GraphQLString },
                    city: { type: GraphQLString },
                    orderBy: { type: GraphQLString }
                },
                resolve: async (_, { state, city, orderBy }) => {
                    const params = {
                        TableName: 'DealerTable',
                        IndexName: 'city-state-index',
                        KeyConditionExpression: '#state = :state and #city = :city',
                        ExpressionAttributeNames: { '#state': 'state', '#city': 'city' },
                        ExpressionAttributeValues: { ':state': state, ':city': city },
                        ScanIndexForward: orderBy === 'asc',
                    };
                    const result = await dynamoDB.query(params).promise();
                    console.log(result.Items);
                    return result.Items;
                }
            },
            getUsers: {
                type: new GraphQLList(UserType),
                resolve: async () => {
                    const params = {
                        TableName: 'DealerTable',

                    };
                    const result = await dynamoDB.scan(params).promise();
                    console.log(result.Items?.length)
                    return result.Items;
                    
                }
            },
            //optimize the count of the data - pagination (getting all at once)
            getUsersByCount: {
                type: new GraphQLList(UserType),

                resolve: async () => {
                    let accumulated: any[] = [];
                    let exclusiveStartKey: DocumentClient.Key | undefined = undefined;
                    let result: DocumentClient.QueryOutput;
                    do {
                        const params = {
                            TableName: 'DealerTable',
                            ExclusiveStartKey: exclusiveStartKey,
                            // Select: 'COUNT'
                            Limit: 100
                        };
                        result = await dynamoDB.scan(params).promise();
                        // console.log(result)
                        // accumulated = [accumulated.concat(result.Items)];
                        accumulated = [...accumulated, ...(result.Items ?? [])];
                        console.log(accumulated)
                        exclusiveStartKey = result.LastEvaluatedKey;
                    } while (typeof result.LastEvaluatedKey !== "undefined")
                    return accumulated;
                }
            },
            //custom pagination
            getAllItems: {
                type: GetAllItemsResponseType,
                args: {
                    pageSize: { type: GraphQLInt },
                    exclusiveStartKey: { type: UserKeyType },
                },

                resolve: async (_, { pageSize, exclusiveStartKey }) => {
                    // Retrieve the items from DynamoDB using pagination parameters
                    const params = {
                        TableName: 'DealerTable',
                        Limit: pageSize,
                        ExclusiveStartKey: exclusiveStartKey ? exclusiveStartKey : undefined,
                    };
                    const result = await dynamoDB.scan(params).promise();
                    const items = result.Items || [];
                    const lastEvaluatedKey = result.LastEvaluatedKey;
                    return {
                        items,
                        exclusiveStartKey: lastEvaluatedKey ? lastEvaluatedKey : undefined
                    };
                },
            },
            getUsersByDealerName: {
                type: new GraphQLList(UserType),
                args: {
                    dealerName: { type: GraphQLString },
                    orderBy: { type: GraphQLString }
                },
                resolve: async (_, { dealerName, orderBy }) => {
                    const params = {
                        TableName: 'DealerTable',
                        IndexName: 'dealerName-index',
                        KeyConditionExpression: '#dealerName = :dealerName',
                        ExpressionAttributeNames: { '#dealerName': 'dealerName' },
                        ExpressionAttributeValues: { ':dealerName': dealerName },
                        ScanIndexForward: orderBy === 'asc'
                    };
                    const result = await dynamoDB.query(params).promise();
                    console.log(result.Items);
                    return result.Items;
                }
            }
        }
    }),
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: {
            createUser: {
                type: UserType,
                args: {
                    // id: { type: new GraphQLNonNull(GraphQLString) },
                    dealerName: { type: new GraphQLNonNull(GraphQLString) },
                    personName: { type: new GraphQLNonNull(GraphQLString) },
                    phoneNumber: { type: new GraphQLNonNull(GraphQLString) },
                    state: { type: new GraphQLNonNull(GraphQLString) },
                    city: { type: new GraphQLNonNull(GraphQLString) },
                    zip: { type: new GraphQLNonNull(GraphQLString) },
                    street: { type: new GraphQLNonNull(GraphQLString) },
                    email: { type: new GraphQLNonNull(GraphQLString) },
                    password: { type: new GraphQLNonNull(GraphQLString) }
                },
                resolve: async (_, { dealerName, personName, phoneNumber, state, city, zip, street, email, password }) => {
                    try {
                        const uuid = uuidv1();
                        const params = {
                            TableName: 'DealerTable',
                            Item: { id: uuid, dealerName: dealerName, personName: personName, phoneNumber: phoneNumber, state: state, city: city, zip: zip, street: street, email: email, password: password }
                        };
                        console.log(params)
                        const result = await dynamoDB.put(params).promise();
                        return params.Item;
                    } catch (error) {
                        // Handle error
                        console.error('Error deleting user:', error);
                        throw new Error('Failed to delete user.');
                    }
                }
            },
            updateUser: {
                type: UserType,
                args: {
                    id: { type: new GraphQLNonNull(GraphQLString) },
                    name: { type: GraphQLString },
                    email: { type: GraphQLString }
                },
                resolve: async (_, { id, name, email }) => {
                    const params = {
                        TableName: 'DealerTable',
                        Key: { id },
                        UpdateExpression: 'SET #id = :id, #email = :email',
                        ExpressionAttributeNames: { '#id': 'id', '#email': 'email' },
                        ExpressionAttributeValues: { ':id': id, ':email': email },
                        ReturnValues: 'ALL_NEW'
                    };
                    const result = await dynamoDB.update(params).promise();
                    return result.Attributes;
                }
            },
            deleteUser: {
                type: GraphQLString,
                args: {
                    id: { type: new GraphQLNonNull(GraphQLString) }
                },
                resolve: async (_, { id }) => {
                    const params = {
                        TableName: 'DealerTable',
                        Key: { id },
                        ReturnValues: 'ALL_OLD'
                    };
                    const result = await dynamoDB.delete(params).promise();
                    return `User with ID ${result.Attributes?.id} deleted successfully`;
                }
            },
            //login - register
            RegisterUser: {
                type: RegisterType,
                args: {
                  name: { type: new GraphQLNonNull(GraphQLString) },
                  email: { type: new GraphQLNonNull(GraphQLString) },
                  password: { type: new GraphQLNonNull(GraphQLString) },
                },
                resolve: async (_, { name, email, password }) => {
                  try {
                    // Check if the user already exists in DynamoDB (using email as a unique identifier)
                    const existingUser = await dynamoDB
                      .query({
                        TableName: 'RegisterTable',
                        IndexName: 'email-index',
                        KeyConditionExpression: '#email = :email',
                        ExpressionAttributeNames: { '#email': 'email' },
                        ExpressionAttributeValues: { ':email': email },
                      })
                      .promise();
          
                    if (existingUser.Items && existingUser.Items.length > 0) {
                      throw new Error('User with the provided email already exists');
                    }
                    // Hash the password
                    const hashedPassword = await bcrypt.hash(password, 10);
          
                    // Generate a unique ID for the user
                    const registeredId = uuidv1();
          
                    // Save the user to DynamoDB
                    await dynamoDB
                      .put({
                        TableName: 'RegisterTable',
                        Item: { id: registeredId, name, email, password: hashedPassword },
                      })
                      .promise();
          
                    // Create a JWT token
                    const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });
          
                    // Return the user and token
                    return { id: registeredId, name, email, token };
                  } catch (error) {
                    console.error('Error creating user:', error);
                    throw new Error('Failed to create user.');
                  }
                },
              },

              LoginUser: {
                type: RegisterType,
                args: {
                  email: { type: new GraphQLNonNull(GraphQLString) },
                  password: { type: new GraphQLNonNull(GraphQLString) },
                },
                resolve: async (_, { email, password }) => {
                try {
                  // Check if the user exists in DynamoDB
                  const existingUser = await dynamoDB
                    .query({
                      TableName: 'RegisterTable',
                      IndexName: 'email-index',
                      KeyConditionExpression: '#email = :email',
                      ExpressionAttributeNames: { '#email': 'email' },
                      ExpressionAttributeValues: { ':email': email },
                    })
                    .promise();
          
                  if (!existingUser.Items || existingUser.Items.length === 0) {
                    throw new Error('Invalid credentials');
                  }
          
                  const user = existingUser.Items[0];
                  const validPassword = await bcrypt.compare(password, user.password);
          
                  if (!validPassword) {
                    throw new Error('Invalid credentials');
                  }
          
                  // Create a JWT token
                  const token = jwt.sign({ email: user.email }, secretKey, { expiresIn: '1h' });
          
                  // Return the user and token
                  return { id: user.id, name: user.name, email: user.email, token };
                } catch (error) {
                  console.error('Error during login:', error);
                  throw new Error('Failed to log in.');
                }
              }
            },
        }
    })
});

app.use(
    "/graphql",
    graphqlHTTP({
        schema: schema,
        graphiql: true,
    })
)

app.listen(PORT)
console.log("Running a GraphQL API server at http://localhost:5000/graphql")