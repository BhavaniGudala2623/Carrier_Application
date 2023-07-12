import request, { SuperTest, Test } from 'supertest';
import express, { Express } from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema, GraphQLSchema } from 'graphql';

// Create a mock schema for testing
const schema: GraphQLSchema = buildSchema(`
  type Query {
    hello: String
  }
`);

// Create a root resolver for the schema
const rootResolver = {
  hello: () => 'Hello, World!',
};

describe('GraphQL API', () => {
  let server: SuperTest<Test>;

  beforeAll(() => {
    // Create a test server with the Express app and GraphQL middleware
    const expressApp: Express = express();
    expressApp.use(
      '/graphql',
      graphqlHTTP({
        schema,
        rootValue: rootResolver,
        graphiql: false,
      })
    );
    server = request(expressApp);
  });

  it('returns the expected response for the "hello" query', async () => {
    // Make a POST request to the GraphQL endpoint with the query
    const response = await server.post('/graphql').send({ query: '{ hello }' });

    // Assert the response
    expect(response.status).toBe(200);
    expect(response.body.data).toEqual({ hello: 'Hello, World!' });
  });
});
