exports.up = function(knex) {
    return knex.schema
      .createTable('users', users => {
          users.increments('id');
          users.string('username', 30)
            .notNullable()
            .unique();
          users.string('password', 30)
            .notNullable();
          users.string('department', 30)
      })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users')
  };
