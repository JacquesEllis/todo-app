const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type Task {
    id: ID!
    title: String!
    completed: Boolean!
    createdAt: String!
    completedAt: String
  }

  input CreateTaskInput {
    title: String!
  }

  type Query {
    tasks: [Task!]!
  }

  type Mutation {
    createTask(input: CreateTaskInput!): Task!
    markComplete(id: ID!, completed: Boolean!): Task!
    deleteTask(id: ID!): Boolean!
  }
`;

const resolvers = {
  Query: {
    tasks: () => [],
  },
  Mutation: {
    createTask: (_, { input }) => ({
      id: Date.now().toString(),
      title: input.title,
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null,
    }),
    markComplete: (_, { id, completed }) => ({
      id,
      title: 'Task',
      completed,
      createdAt: new Date().toISOString(),
      completedAt: completed ? new Date().toISOString() : null,
    }),
    deleteTask: () => true,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

if (require.main === module) {
  server.listen().then(({ url }) => {
    console.log(`API running at ${url}`);
  });
}

module.exports = { server };
