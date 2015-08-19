var Kue = require('./kue')
var FellAsleepAid = require('./workers/fell_asleep_aid')
var routes = require('./routes')

var Tasks = function(server, options) {
  Kue.setup(options)
  FellAsleepAid.setup(
    server.plugins['rosie_controller_zwave']['ZwaveModel'],
    server.plugins['rosie_controller_remotes']['RemoteModel']
  )
  routes(server)
}

Tasks.stop = function() {
  Kue.stop()
}

module.exports = Tasks
