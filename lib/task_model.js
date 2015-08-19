var _ = require('underscore')
var Kue = require('./kue')

var TaskModel = {
  listAll: function(done) {
    Kue.kue.Job.rangeByType('fell_asleep_aid', 'delayed', 0, 100, 'asc', done)
  },
  removeJob: function(id) {
    if (!id) return

    Kue.kue.Job.get(id, function(err, job) {
      if (err) return
      job.remove(_.noop)
    })
  },
  findExisting: function(jobType, done) {
    Kue.kue.Job.rangeByType(jobType, 'delayed', 0, 1000, 'asc', done)
  }
}

module.exports = TaskModel
