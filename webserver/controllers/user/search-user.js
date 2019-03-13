'use strict';

const Joi = require('joi');
const UserModel = require('../../../models/user-model');

async function validate(payload) {
  const schema = {
    q: Joi.string().min(3).max(30).required(),
  };
  return Joi.validate(payload, schema);
}

async function searchUser(req, res, next) {
  const { q } = req.query;

  try {
    await validate({ q });
  } catch (e) {
    return res.status(400).send();
  }

  try {
    const users = await UserModel.find({ $text: { $search: q } });

    return res.send(users);
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

module.exports = searchUser;
