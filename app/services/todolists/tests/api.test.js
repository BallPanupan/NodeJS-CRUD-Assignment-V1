/* eslint-env mocha */
'use strict'

const request = require('supertest')
const assert = require('chai').assert
const path = require('path')
const app = require(path.resolve('app'))
const Todolists  = require('../models/todolists')

describe('Todolists API', function () {
  it('should get todolists', async () => {
    const data = [{text: 1}, {text: 2}]
    const initData = await Promise.all(data.map(x => new Todolists(x).save()))

    const gateway = '/api/todolists'
    let response = await request(app)
      .get(gateway)
      .set('Accept', 'application/json')
      .expect(200)

    assert.equal(response.body.length, 2)
  })
})
