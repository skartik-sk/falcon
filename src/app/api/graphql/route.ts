

// pages/api/graphql.js
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { ethers } from 'ethers';
import { graphql } from 'graphql';
import cors from 'cors';
import { NextRequest, NextResponse } from 'next/server';

// Define your provider and contract details
const provider = new ethers.JsonRpcProvider('https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID');
const contractAddress = '0xYourContractAddress';
const contractABI = [
  'function myFunction() view returns (string)',
];

const contract = new ethers.Contract(contractAddress, contractABI, provider);

// Define GraphQL Schema
const { GraphQLObjectType, GraphQLSchema, GraphQLString } = require('graphql');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    myContractData: {
      type: GraphQLString,
      resolve: async () => {
        // Replace with the actual contract call
        const data = await contract.myFunction();
        return data;
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {},
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

// Set up the GraphQL server using express
const app = express();

app.use(cors());
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

export default (req:NextRequest, res:NextResponse) => {

  app(req, res);
};
