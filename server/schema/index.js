const merge = require('lodash/merge')
const {store} = require('../store')

const modules = [
  require('./root'), // must come first
  require('./todos'),
  require('./users'),
]

module.exports = {
  typeDefs: modules.map(({typeDefs}) => typeDefs),
  resolvers: merge(...modules.map(({resolvers}) => resolvers)),
}
