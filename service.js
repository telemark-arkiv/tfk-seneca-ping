'use strict'

var Seneca = require('seneca')
var Mesh = require('seneca-mesh')
var Ping = require('./lib/ping')
var envs = process.env

var options = {
  seneca: {
    tag: envs.TFK_SENECA_PING_TAG || 'tfk-seneca-ping'
  },
  mesh: {
    auto: true,
    listen: [
      {pin: 'cmd:ping, type:test', model: 'observe'}
    ]
  },
  ping: {
    url: envs.TFK_SENECA_PING_URL || 'http://ping.no'
  },
  isolated: {
    host: envs.TFK_SENECA_PING_HOST || 'localhost',
    port: envs.TFK_SENECA_PING_PORT || 8000
  }
}

var Service = Seneca(options.seneca)

if (envs.TFK_SENECA_PING_ISOLATED) {
  Service.listen(options.isolated)
} else {
  Service.use(Mesh, options.mesh)
}

Service.use(Ping, options.ping)
