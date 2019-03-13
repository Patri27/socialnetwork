'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const postSchema = new Schema({
  owner: String,
  author: String,
  content: String,
  likes: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  comments: [{
    author: String,
    comment: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  ],
  deletedAt: Date,
});

// var Tank = mongoose.model('Tank', schema);
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
