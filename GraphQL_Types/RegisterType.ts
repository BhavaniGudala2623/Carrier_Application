import {  GraphQLObjectType, GraphQLString } from "graphql";
const RegisterType = new GraphQLObjectType({
    name: 'Users',
    fields: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        token: {type: GraphQLString},
    }
});
export default RegisterType;