'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  db.createTable('video', {
        columns: {
          id: {type: 'int', primaryKey: true, autoIncrement: true},
          title: {type: 'string', length: 50},
          description: {type: 'string', length: 250},
          genre: {type: 'string', length: 30},
          image_path: {type: 'string', length: 80},
          video_path: {type: 'string', length: 80},
          unix_timestamp: {type: 'timestamp', defaultValue: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP'},
        },
        ifNotExists: true
      }, function (err) {
        if (err) return callback(err);
        return callback();
      }
  );
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
