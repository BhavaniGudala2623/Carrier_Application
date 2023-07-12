import {  GraphQLObjectType, GraphQLList } from "graphql";
import UserType from "./UserType";
import ExclusiveStartKeyType from "./ExclusiveStartKeyType";

const GetAllItemsResponseType = new GraphQLObjectType({
    name: 'GetAllItemsResponse',
    fields: {
        items: { type: new GraphQLList(UserType) },
        exclusiveStartKey: { type: ExclusiveStartKeyType },
    },
});

export default GetAllItemsResponseType;