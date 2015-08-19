var _ = require('underscore')
var Task = require('./task_model')

var workers = {
  fell_asleep_aid: require('./workers/fell_asleep_aid')
}

var routes = function(server) {

  server.route({
    method: 'GET',
    path: '/queue',
    config: {
      handler: function(req, res) {
        Task.listAll(function(err, jobs) {
          res(jobs)
        })
      }
    }
  })

  server.route({
    method: 'POST',
    path: '/queue',
    config: {
      handler: function(req, res) {
        var jobData = req.payload
        var worker = _.result(workers, jobData.type)
        if (worker) {
          worker.create(jobData)
            .then(function(job) {
              res(job).code(201)
            })
            .catch(function(err) {
              res(err).code(500)
            })
        } else {
          res('invalid_job_type').code(422)
        }
      }
    }
  })

  server.route({
    method: 'PUT',
    path: '/queue/{id}',
    config: {
      handler: function(req, res) {
        var jobData = req.payload
        var worker = _.result(workers, jobData.type)
        if (worker) {
          worker.create(jobData)
            .then(function(job) {
              res(job).code(201)
            })
            .catch(function(err) {
              res(err).code(500)
            })
        } else {
          res('invalid_job_type').code(422)
        }
      }
    }
  })

  server.route({
    method: 'DELETE',
    path: '/queue/{id}',
    config: {
      handler: function(req, res) {
        Task.removeJob(req.params.id)
        res().code(204)
      }
    }
  })
}

module.exports = routes
