'use strict';

const Joi = require('joi');
const UserModel = require('../../../models/user-model');

async function validate(payload) {
  const schema = {
    friend: Joi.string().guid({
      version: ['uuidv4'],
    }),
  };
  return Joi.validate(payload, schema);
}

async function friendRequest(req, res, next) {
  const { claims } = req;
  const { friend } = req.body;

  try {
    await validate({ friend });
  } catch (e) {
    return res.status(400).send(e.message);
  }

  if (claims.uuid === friend) {
    return res.status(403).send();
  }

  try {
    const friendRequestToAdd = {
      createdAt: Date.now(),
      confirmedAt: null,
      rejectedAt: null,
      uuid: claims.uuid,
    };

    // const friendData = await UserModel.update({ uuid: friend },
    //   { $push: { friends: friendRequestToAdd } });

    const friendData = await UserModel.findOneAndUpdate({ uuid: friend },
      { $push: { friends: friendRequestToAdd } });

    return res.status(200).send(friendData);
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

module.exports = friendRequest;
