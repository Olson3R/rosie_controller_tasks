var Tasks = require('./lib/tasks')

var register = function(server, options, next) {
  tasks = new Tasks(server, options)
  server.expose('tasks', tasks)
  server.on('stop', function() {
    tasks.stop()
  })

  return next()
}

register.attributes = {
  pkg: require('./package.json')
}

module.exports = register
