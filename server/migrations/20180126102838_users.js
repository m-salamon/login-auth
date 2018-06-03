
exports.up = function(knex, Promise) {
     return knex.schema.createTable('users', table => {
          table.increments('id').primary();
          table.string('firstName');
          table.string('lastName');
          table.string('phoneNumber');
          table.string('email').unique();
          table.string('password');
          table.string('tempToken');
          table.boolean('isVerified');
      });
};

exports.down = function(knex, Promise) {
     return knex.schema.dropTable('users');
};
