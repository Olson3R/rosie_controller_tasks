var Kue = {
  kue: require('kue'),
  queue: null,
  setup: function(options) {
    Kue.queue = Kue.kue.createQueue()
    Kue.kue.app.listen(options.KUE_LISTEN_PORT)

    Kue.queue.on('job enqueue', function(id, type) {
      console.log('Job %s got queued of type %s', id, type)
    })
  },
  stop: function() {
    console.log('Kue: stopping...')
    Kue.queue.shutdown( 5000, function(err) {
      console.log('Kue: stopped', err||'')
    })
  }
}

module.exports = Kue
