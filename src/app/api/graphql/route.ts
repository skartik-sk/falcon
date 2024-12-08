import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { ethers } from 'ethers';
import { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLInt, GraphQLList, GraphQLBoolean } from 'graphql';
import cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';
import { CONTRACT_ABI } from '@/app/lib/constant';

// Contract details from the provided ABI
const CONTRACT_ADDRESS = "0xD06BA77e347B7230622B0331A3ad69fd84424967";
// const CONTRACT_ABI = [
//   // Add the full ABI here (the one you provided)
// ];

// Configure the provider (replace with your preferred network provider)
const provider = new ethers.JsonRpcProvider('https://sepolia.infura.io/v3/fd3a6a11c50347e5b84c45ad93a3237e');
const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

// GraphQL Types
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
    status: { type: GraphQLInt },
    createdAt: { type: GraphQLInt }
  })
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    name: { type: GraphQLString },
    pinCode: { type: GraphQLInt },
    email: { type: GraphQLString },
    walletAddress: { type: GraphQLString },
    physicalAddress: { type: GraphQLString },
    isVerified: { type: GraphQLBoolean }
  })
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
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
    // getPostDetails: {
    //   type: PostType,
    //   args: { postId: { type: GraphQLInt } },
    //   resolve: async (_, { postId }) => {
    //     try {
    //       const postDetails = await contract.getPostDetails(postId);
    //       return postDetails;
    //     } catch (error) {
    //       console.error('Error fetching post details:', error);
    //       throw new Error('Failed to fetch post details');
    //     }
    //   }
    // },
    // getSuggestionDetails: {
    //   type: SuggestionType,
    //   args: { suggestionId: { type: GraphQLInt } },
    //   resolve: async (_, { suggestionId }) => {
    //     try {
    //       const suggestionDetails = await contract.getSuggestionDetails(suggestionId);
    //       return suggestionDetails;
    //     } catch (error) {
    //       console.error('Error fetching suggestion details:', error);
    //       throw new Error('Failed to fetch suggestion details');
    //     }
    //   }
    // },
    // getUserProfile: {
    //   type: UserType,
    //   args: { walletAddress: { type: GraphQLString } },
    //   resolve: async (_, { walletAddress }) => {
    //     try {
    //       const userProfile = await contract.users(walletAddress);
    //       return userProfile;
    //     } catch (error) {
    //       console.error('Error fetching user profile:', error);
    //       throw new Error('Failed to fetch user profile');
    //     }
    //   }
    // }
  }
});

// Mutations
const RootMutation = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    createPost: {
      type: GraphQLInt,
      args: {
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        imageUrl: { type: GraphQLString }
      },
      resolve: async (_, { title, description, imageUrl }, context) => {
        try {
          // Note: You'll need to handle wallet connection and signer in the frontend
          const signer = await provider.getSigner();
          const contractWithSigner = contract.connect(signer);
          const tx = await contractWithSigner.createPost(title, description, imageUrl);
          await tx.wait();
          return tx.value;
        } catch (error) {
          console.error('Error creating post:', error);
          throw new Error('Failed to create post');
        }
      }
    },
    addSuggestion: {
      type: GraphQLInt,
      args: {
        postId: { type: GraphQLInt },
        description: { type: GraphQLString }
      },
      resolve: async (_, { postId, description }, context) => {
        try {
          const signer = await provider.getSigner();
          const contractWithSigner = contract.connect(signer);
          const tx = await contractWithSigner.addSuggestion(postId, description);
          await tx.wait();
          return tx.value;
        } catch (error) {
          console.error('Error adding suggestion:', error);
          throw new Error('Failed to add suggestion');
        }
      }
    }
  }
});

// Create Schema
const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});

// Express and GraphQL setup
const app = express();

app.use(cors());
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Handle the request using the Express app
  app(req as any, res as any);
}