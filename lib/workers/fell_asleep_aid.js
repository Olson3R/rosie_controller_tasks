var Promise = require('bluebird')
var _ = require('underscore')
var Kue = require('../kue')
var TaskModel = require('../task_model')

var FellAsleepAid = {
  jobType: 'fell_asleep_aid',
  ZwaveModel: null,
  RemoteModel: null,
  setup: function(ZwaveModel, RemoteModel) {
    FellAsleepAid.ZwaveModel = ZwaveModel
    FellAsleepAid.RemoteModel = RemoteModel
    Kue.queue.process('fell_asleep_aid', 1, function(job, done) {
      console.log('FellAsleepAid: begin')
      turnOffLights()
      turnOffDevices()
      FellAsleepAid.createNext()
      console.log('FellAsleepAid: end')
      done()
    })
  },
  create: function(data) {
    return new Promise(function(resolve, reject) {
      findExisting(function(err, jobs) {
        _.each(jobs, function(job) {
          job.remove(_.noop)
        })
        resolve(create(data))
      })
    })
  },
  createNext: function() {
    findExisting(function(err, jobs) {
      if (jobs.length === 0) {
        create()
      }
    })
  }
}

function turnOffLights() {
  _.each(FellAsleepAid.ZwaveModel.lights(), function(light) {
    light.turnOff()
  })
}

function turnOffDevices() {
  FellAsleepAid.RemoteModel.sendCommand('receiver', 'power off')
  FellAsleepAid.RemoteModel.sendCommand('tv', 'power off')
}

function create(data) {
  return new Promise(function(resolve, reject) {
    var promote_at = toDate(_.result(data, 'promote_at')) || nextRunAt()
    var job = Kue.queue.create(FellAsleepAid.jobType)
      .delay(promote_at)
      .removeOnComplete(true)
      .save(function(err) {
        if (err) {
          reject(err)
        } else {
          resolve(job)
        }
      })
  })
}

function findExisting(done) {
  TaskModel.findExisting(FellAsleepAid.jobType, done)
}

function nextRunAt() {
  var date = new Date()
  if (date.getHours() >= 2) {
    date.setDate(date.getDate() + 1)
  }
  date.setHours(2, 0, 0, 0)
  return date
}

function toDate(timestampInt) {
  timestampInt = parseInt(timestampInt)
  if (!timestampInt) { return null }
  return new Date(timestampInt)
}

module.exports = FellAsleepAid
