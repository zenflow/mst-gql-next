module.exports = {
  webpack (config) {
    const result = {
      ...config,
      resolve: {
        ...(config.resolve || {}),
        alias: {
          ...(config.resolve && config.resolve.alias || {}),
          'mst-gql': '@zen_flow/mst-gql'
        }
      }
    }
    return result
  }
}
