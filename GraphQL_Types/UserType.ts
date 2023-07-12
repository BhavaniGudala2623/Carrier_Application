import { GraphQLObjectType, GraphQLString } from "graphql";

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: GraphQLString },
        dealerName: { type: GraphQLString },
        personName: { type: GraphQLString },
        phoneNumber: { type: GraphQLString },
        state: { type: GraphQLString },
        city: { type: GraphQLString },
        zip: { type: GraphQLString },
        street: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
    }
});

export default UserType;