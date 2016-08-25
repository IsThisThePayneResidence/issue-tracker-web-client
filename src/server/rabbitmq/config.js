module.exports.config = {
  env: 'prod',
  app: 'it.simcord.com',
  hostname: 'simcord.com',
  
  port: '1488',

  rabbitmq: {
    uri: 'amqp://localhost',
    projects: {
      feed: {
        exchange: 'e.p.all.feed',
        queue: 'q.p.client.feed',
        rk: 'r.p.daemon.#'
      },
      forward: {
        rk: 'r.p.daemon.command-client-web'
      }
    },
    issues: {
      feed: {
        exchange: 'e.i.all.feed',
        queue: 'q.i.client.feed',
        rk: 'r.i.daemon.#'
      },
      forward: {
        rk: 'r.i.daemon.command-client-web'
      }
    },
    users: {
      feed: {
        exchange: 'e.u.all.feed',
        queue: 'q.u.client.feed',
        rk: 'r.u.daemon.#'
      },
      forward: {
        rk: 'r.u.daemon.command-client-web'
      }
    },
    status: {
      feed: {
        exchange: 'e.s.all.feed',
        queue: 'q.s.client.feed',
        rk: 'r.s.daemon.#'
      },
      forward: {
        rk: 'r.s.daemon.command-client-web'
      }
    },
    forward: 'e.all.all.forward',
    encoding: 'utf8'
  },
  // rabbitmq.encoding: 'utf8',
  // rabbitmq.uri: process.env.RABBIT_URI || 'amqp://localhost',
  // rabbitmq.queue: 'myqueue',
  
  // mongo database
  // mongo: {},
  // mongo.uri: process.env.MONGO_URI || 'localhost',
  // mongo.db: 'mydb',
  
  // logs. Log to files. In dev and testing will just log to the console
  logstreams: [
    // log INFO and above to a file
    {
      level: 'info',
      type: 'rotating-file',
      path: 'logs/it-web-client.log',
      period: '1d',   // daily rotation
      count: 3        // keep 3 back copies
    },
    // log ERROR and above to a file
    {
      level: 'error',
      type: 'rotating-file',
      path: 'logs/it-web-client-error.log',
      period: '1d',   // daily rotation
      count: 3        // keep 3 back copies
    }
  ]
};