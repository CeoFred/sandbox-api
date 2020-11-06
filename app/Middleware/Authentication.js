/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
'use strict';
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const axios = require('axios');

class Authentication {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({request, response}, next) {
    const Logger = use('Logger');

    Logger.notice('request url is %s', request.url());
    // call next to advance the request
    let token = request.header('Authorization');
    const userkid = request.post('kid');

    if (token) {
      try {
        token = token.replace('Bearer', '').trim();
        const data = JSON.stringify({'kid': userkid.kid});

        const config = {
          method: 'post',
          url: 'https://api.secure.codemarka.dev/api/v1/auth/user/token/verify',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          data: data,
        };

        const user = await axios(config);
        request.user = user.data;
        await next();
      } catch (error) {
        Logger.error(error);
        return response.status(401).send({message: 'Something went wrong', status: 401});
      }
    } else {
      await next();
    }
  }
}

module.exports = Authentication;
