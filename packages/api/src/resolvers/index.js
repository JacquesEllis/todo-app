const helloResolver = require('./queries/hello');

const resolvers = {
  Query: {
    ...helloResolver.Query,
  },
};

module.exports = resolvers;
