const Jimdb = require('@jd/jmfe-node-jimdb')
const { getRedisConfig } = require('../config')
const { Store } = require("koa-session2")

class RedisStore extends Store {
  constructor() {
    super()
    this.redis = new Jimdb(getRedisConfig()).getClient().on('error', function (err) {
      console.log(err)
    })
  }
  async get(sid, ctx) {
    let data = await this.redis.get(`SESSION:${sid}`);
    return JSON.parse(data);
  }
  async set (session, { sid = this.getID(24), maxAge = 1000000 } = {}, ctx) {
    try {
      await this.redis.set(`SESSION:${sid}`, JSON.stringify(session), 'EX', maxAge / 1000);
    } catch (e) { }
    return sid;
  }
  async destroy(sid, ctx) {
    return await this.redis.del(`SESSION:${sid}`);
  }
}
module.exports = RedisStore