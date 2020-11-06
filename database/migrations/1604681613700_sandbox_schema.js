'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class SandboxSchema extends Schema {
  up() {
    this.create('sandboxes', (table) => {
      table.increments();
      table.timestamps();
      table.string('sid');
      table.string('user');
      table.bigInteger('status');
      table.bigInteger('visits');
      table.bigInteger('likes');
    });
  }

  down() {
    this.drop('sandboxes');
  }
}

module.exports = SandboxSchema;
