'use strict';

const UserModel = require('../../../models/user-model');

async function getUserProfile(req, res, next) {
  const { claims } = req;

  try {
    const userData = await UserModel.find({ uuid: claims.uuid }, '-_id -__v').lean();
    return res.status(200).send(userData);
  } catch (e) {
    return console.error(e);
  }
}

module.exports = getUserProfile;
