// Comment seeds

const sequelize = require("../config/connection");
const { Comment } = require("../models");

const comments = [
  {
      body: "Amazing!",
      blogId: 1,
      userId: 1
  },
  {
      body: "Cool!",
      blogId: 3,
      userId: 2
  },
  {
      body: "Agree!",
      blogId: 4,
      userId: 1
  },
  {
      body: "Helps a lot!",
      blogId: 2,
      userId: 3
  },

]

const seedComments = async () => {
    try {
        await Comment.bulkCreate(comments);
        console.log('Comments seeded successfully!');
    } catch (err) {
        console.error('Error seeding comments:', err);
    }
};

module.exports = seedComments;
