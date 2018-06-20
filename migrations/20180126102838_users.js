
exports.up = function(knex, Promise) {
     return knex.schema.createTable('users', table => {
          table.increments('id').primary();
          table.string('firstName').notNullable()
          table.string('lastName').notNullable()
          table.string('phoneNumber').notNullable()
          table.string('email').unique();
          table.string('password').notNullable()
          table.string('tempToken').notNullable()
          table.boolean('isVerified').notNullable()
          table.integer('teamId').notNullable()
          table.string('ip').notNullable()
          table.boolean('blackList').notNullable()
          table.timestamp('createdAt').default(knex.fn.now())
          table.string('timeStamp').default(knex.fn.now())
      });
};

//table.boolean('userId').references('id).inTable('users)

exports.down = function(knex, Promise) {
     return knex.schema.dropTable('users');
};
