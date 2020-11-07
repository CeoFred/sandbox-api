'use strict';
const shortuuid = require('short-uuid');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with sandboxes
 */
const SandBox = use('App/Models/Sandbox');
const Logger = use('Logger');

class SandBoxController {
  /**
   * Show a list of all sandboxes.
   * GET sandboxes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({request, response, view}) {
  }

  /**
   * API to be used for creating a new sandbox.
   * POST api/v1/sandbox/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({request, response, view}) {
    async function generateSID() {
      const sid = shortuuid.generate();
      const sidExists = await SandBox.findBy('sid', sid);
      if (sidExists) {
        return await generateSID();
      }
      return await sid;
    }
    const sid = await generateSID();

    const sandbox = new SandBox();

    sandbox.sid = sid;
    sandbox.visits = 0;
    sandbox.likes = 0;
    sandbox.status = 0;
    sandbox.user = request.user ? request.user.kid : null;

    try {
      await sandbox.save();
      return response.status(201).send({id: sandbox.sid, message: 'created'});
    } catch (error) {
      Logger.error(error);
      return response.status(500).send(error);
    }
  }

  /**
   * Create/save a new sandbox.
   * POST sandboxes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({request, response}) {
  }

  /**
   * Display a single sandbox.
   * GET sandboxes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({params, request, response, view}) {
  }

  /**
   * Render a form to update an existing sandbox.
   * GET sandboxes/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({params, request, response, view}) {
  }

  /**
   * Update sandbox details.
   * PUT or PATCH sandboxes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({params, request, response}) {
  }

  /**
   * Delete a sandbox with id.
   * DELETE sandboxes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({params, request, response}) {
  }
}

module.exports = SandBoxController;
