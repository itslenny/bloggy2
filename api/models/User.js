/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var bcrypt = require('bcrypt');

module.exports = {

  attributes: {
    email:{
      type:'email',
      required:true,
      unique:true
    },
    firstName:{
      type:'string'
    },
    lastName:{
      type:'string'
    },
    password:{
      type:'string',
      minLength: 6,
      required: true
    },

    comments:{
      collection:'Comment',
      via:'user'
    },

    fullName: function(){
      return this.firstName+' '+this.lastName;
    },

    //override built-in toJSON method and remove password
    toJSON: function(){
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }

  },
  beforeCreate: function(values, callback) {
    bcrypt.hash(values.password,10,function(err,hash){
      if(err) return callback(err);
      values.password = hash;
      callback();
    });
  }


};

