'use strict'

var envs = process.env
var pkg = require('../package.json')

module.exports = function (options) {
  var seneca = this

  seneca.add('cmd:ping, type:test', ping)

  return {
    name: envs.TFK_SENECA_PING_TAG || 'tfk-seneca-ping'
  }
}

function ping (args, callback) {
  var result = {
    system: pkg.name,
    version: pkg.version,
    ping: 'pong',
    data: args
  }

  callback(null, result)
}
