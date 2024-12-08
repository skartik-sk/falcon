import { NextApiRequest, NextApiResponse } from 'next';
import { ethers } from 'ethers';
import { graphqlHTTP } from 'express-graphql';
import express from 'express';
import cors from 'cors';
import { 
  GraphQLObjectType, 
  GraphQLSchema, 
  GraphQLString, 
  GraphQLList, 
  GraphQLInt, 
  GraphQLBoolean 
} from 'graphql';

// Import contract details
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '@/app/lib/constant';

// Set up provider and contract
const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL || 'https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID');
const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

// Define GraphQL types to match contract structure
const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: { type: GraphQLInt },
    creator: { type: GraphQLString },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    imageUrl: { type: GraphQLString },
    likedBy: { type: GraphQLList(GraphQLString) },
    dislikedBy: { type: GraphQLList(GraphQLString) },
    suggestionIds: { type: GraphQLList(GraphQLInt) },
    status: { type: GraphQLInt },
    createdAt: { type: GraphQLInt }
  })
});

const SuggestionType = new GraphQLObjectType({
  name: 'Suggestion',
  fields: () => ({
    id: { type: GraphQLInt },
    creator: { type: GraphQLString },
    postId: { type: GraphQLInt },
    description: { type: GraphQLString },
    likes: { type: GraphQLInt },
    dislikes: { type: GraphQLInt },
    status: { type: GraphQLInt }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    getAllPosts: {
      type: GraphQLList(PostType),
    getAllPosts: {
      type: GraphQLList(PostType),
      resolve: async () => {
        try {
          const posts = await contract.getAllPosts();
          return posts;
        } catch (error) {
          console.error('Error fetching posts:', error);
          throw new Error('Failed to fetch posts');
        }
      }
    },
    getPostDetails: {
      type: PostType,
      args: { 
        postId: { type: GraphQLInt } 
      },
      resolve: async (_, { postId }) => {
        try {
          const postDetails = await contract.getPostDetails(postId);
          return postDetails;
        } catch (error) {
          console.error('Error fetching post details:', error);
          throw new Error('Failed to fetch post details');
        }
      }
    },
    getSuggestionDetails: {
      type: SuggestionType,
      args: { 
        suggestionId: { type: GraphQLInt } 
      },
      resolve: async (_, { suggestionId }) => {
        try {
          const suggestionDetails = await contract.getSuggestionDetails(suggestionId);
          return suggestionDetails;
        } catch (error) {
          console.error('Error fetching suggestion details:', error);
          throw new Error('Failed to fetch suggestion details');
        }
      }
    }
  }
});

const RootMutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // You can add mutations for contract interactions here
    // For example:
    // createPost: {
    //   type: PostType,
    //   args: {
    //     title: { type: GraphQLString },
    //     description: { type: GraphQLString },
    //     imageUrl: { type: GraphQLString }
    //   },
    //   resolve: async (_, { title, description, imageUrl }) => {
    //     // Implement contract interaction logic
    //   }
    // }
  }
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
  mutation: RootMutation
});

// Express app for handling GraphQL
const app = express();
app.use(cors());

// GraphQL handler
const graphqlHandler = graphqlHTTP({
  schema,
  graphiql: process.env.NODE_ENV === 'development'
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Ensure the Express middleware is used
  return new Promise((resolve, reject) => {
    graphqlHandler(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}