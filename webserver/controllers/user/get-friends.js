'use strict';

const UserModel = require('../../../models/user-model');

async function getFriends(req, res, next) {
  const { uuid } = req.claims;

  try {
    const allFriendsResults = await UserModel.findOne({ uuid });
    const friendsUuids = allFriendsResults.friends.map(f => f.uuid); // [uuid1, uuid2, ..., uuid n]

    const filterRequests = {
      $and: [
        {
          uuid: {
            $in: friendsUuids,
          },
          $and:
            [
              { 'friends.confirmedAt': { $ne: null } },
              { 'friends.rejectedAt': null },
            ],
        }],
    };

    const projectionFriendsData = {
      uuid: 1,
      avatarUrl: 1,
      fullName: 1,
      _id: 0,
    };

    const users = await UserModel.find(filterRequests, projectionFriendsData).lean();
    return res.send({
      data: users,
    });
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

module.exports = getFriends;
