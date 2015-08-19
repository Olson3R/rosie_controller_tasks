# rosie_controller_tasks
A plugin for the [Rosie controller](https://github.com/Olson3R/rosie_controller) application that allows for the creation and scheduling of tasks. Adds /tasks endpoints.

# Dependencies
1. [Kue](https://github.com/Automattic/kue) requires [redis](http://redis.io/)
2. [rosie_controller_remotes](https://github.com/Olson3R/rosie_controller_remotes)
3. [rosie_controller_zwave](https://github.com/Olson3R/rosie_controller_zwave)

# Configuration
1. On the [rosie_controller](https://github.com/Olson3R/rosie_controller) application, run `npm install rosie_controller_tasks --save`
2. Add and configure the plugin in the controllers rejoice configuration file.
```
"rosie_controller_tasks": {
  "KUE_LISTEN_PORT": 4002
}
```
