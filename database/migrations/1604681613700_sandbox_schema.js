'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class SandboxSchema extends Schema {
  up() {
    this.dropIfExists('sandboxes');
    this.create('sandboxes', (table) => {
      table.increments();
      table.timestamps();
      table.string('sid').unique();
      table.string('user_id').nullable().defaultTo(null);
      table.bigInteger('sandbox_status').defaultTo(0);
      table.bigInteger('visits').defaultTo(0);
      table.bigInteger('likes').defaultTo(0);
    });
  }

  down() {
    this.drop('sandboxes');
  }
}

module.exports = SandboxSchema;
