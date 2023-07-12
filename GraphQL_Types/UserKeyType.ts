import {  GraphQLInputObjectType, GraphQLString} from "graphql";

const UserKeyType = new GraphQLInputObjectType({
    name: 'UserKeyType',
    fields: {
        id: { type: GraphQLString },
    },
});
export default UserKeyType;