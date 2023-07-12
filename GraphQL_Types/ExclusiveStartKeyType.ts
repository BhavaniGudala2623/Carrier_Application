import {  GraphQLObjectType, GraphQLString } from "graphql";

const ExclusiveStartKeyType = new GraphQLObjectType({
    name: 'ExclusiveStartKey',
    fields: {
        id: { type: GraphQLString },
    },
});

export default ExclusiveStartKeyType;