'use strict';
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {

  email: {
      type: DataTypes.STRING,
          validate:{
            isEmail:{
              msg:'Invalid Email Adress'
            }
          }

  },
    name: {
      type: DataTypes.STRING,
      validate:{
        len: {
          args:[1,99],
          msg:'Invalid user name.Must be between 1 and 99 characters'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate:{
        len:{
          args:[8,99],
          msg:'Password Must be at Least 8 Characters'
        }
      }

  }}, {
    hooks:{
      beforeCreate: function(pendingUser,options){
        if (pendingUser && pendingUser.password){
          var hash = bcrypt.hashSync(pendingUser.password,12);
          pendingUser.password = hash;
        }
      }
    }
  });
  user.associate = function(models) {
    // associations can be defined here

  };
  user.prototype.validPassword = function(passwordTyped){
    return bcrypt.compareSync(passwordTyped,this.password);
  }  
  return user;
};