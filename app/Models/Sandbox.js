'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Sandbox extends Model {
  static get primaryKey() {
    return 'id';
  }

  static get visible() {
    return ['sid', 'status', 'likes', 'visits', 'user', 'id'];
  }
}

module.exports = Sandbox;
