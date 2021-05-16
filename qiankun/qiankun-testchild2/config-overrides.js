
module.exports = {
  webpack: (config) => {
    config.output.library = 'qiankun-testchild2'
    config.output.libraryTarget = 'umd'
    config.output.publicPath = 'http://localhost:9726'
    return config
  },
  devServer: (configFunction) => {
    // devServer要求返回一个函数
    return function(proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost)
      // 以下端口修改直接写在.env文件中，默认会去这个文件中拿环境变量
      config.headers = {
        'Access-Control-Allow-Origin': '*'
      }
      return config
    }
  }
}