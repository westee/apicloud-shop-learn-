/*
 * APICloud JavaScript Library
 * Copyright (c) 2014 apicloud.com
 */
(function(window){
    var u = {};
    var db
    var dbName = 'xudong'
    var dbPath = 'fs://xudong.db'
    var tableName = 'shoppingCart'


    u.init = function(){
      if(db){
        return
      }
      db = api.require("db");
    }

    u.open = function(){
      u.init()
      var ret = db.openDatabaseSync({
          name: dbName,
          path: dbPath
      });
      if(!ret.status){
        db.executeSqlSync({
            name: dbName,
            sql: 'CREATE TABLE' + tableName + '(wareId varchar(32), wareCount INT'
        });
      }
    }

    u.select = function(wareId_){ // 按照id查询
      u.init()
      var sql = "SELECT * FROM" + tableName  // 不传id就查询全部数据
      if(wareId_){
        sql = 'SELECT * FROM' + tableName + 'WHERE wareId=\"' + wareId_ + '\"'
      }
      return db.selectSqlSync({
          name: dbName,
          sql: sql
      });
    }

    u.update = function(wareId_, wareCount_){
      u.init()
      db.executeSqlSync({
          name: dbName,
          // 当wareId = wareId_ 更新wareCount = wareCount_
          sql: 'UPDATE' + tableName 'SET wareCount=' + wareCount_ 'WHERE wareId=\"' + wareId_+ '\"'
      });

    }

    u.insert = function(wareId_, wareCount_){
      u.init()
      return db.executeSqlSync({
          name: dbName,
          sql: 'INSERT INTO' + tableName + '(wareId_, wareCount_) VALUES(\"' + wareId_ + '\", wareCount_)'
      });

    }

    window.$api = u;

})(window);
