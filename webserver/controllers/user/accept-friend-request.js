'use strict';

const Joi = require('joi');
const UserModel = require('../../../models/user-model');

async function validate(payload) {
  const schema = {
    uuid: Joi.string().guid({
      version: ['uuidv4'],
    }),
  };
  return Joi.validate(payload, schema);
}

async function acceptFriendRequest(req, res, next) {
  const { uuid: me } = req.claims;
  const { uuid } = req.body;

  try {
    await validate({ uuid });
  } catch (e) {
    res.status(400).send(e.message);
  }

  const filter = {
    uuid: me,
    'friends.uuid': uuid,
    'friends.confirmedAt': null,
  };

  const dateNow = Date.now();

  const op = {
    $set: {
      'friends.$.confirmedAt': dateNow,
    },
  };

  try {
    await UserModel.findOneAndUpdate(filter, op);
    const friendData = await UserModel.findOneAndUpdate({ uuid },
      {
        $push: {
          friends: {
            uuid: me,
            createdAt: dateNow,
            confirmedAt: dateNow,
          },
        },
      });
    return res.status(200).send(friendData);
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

module.exports = acceptFriendRequest;
