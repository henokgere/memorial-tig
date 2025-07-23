const User = require("../../users/models/userModel");
const Memorial = require("../../memorials/models/Memorial");
const Article = require("../../articles/models/Article");
const Book = require("../../books/models/Books");

exports.getStats = async (req, res) => {
  try {
    const [userCount, memorialCount, articleCount, bookCount] = await Promise.all([
      User.countDocuments(),
      Memorial.countDocuments(),
      Article.countDocuments({ status: 'published' }),
      Book.countDocuments()
    ]);

    res.status(200).json({
      success: true,
      data: {
        users: userCount,
        memorials: memorialCount,
        articles: articleCount,
        books: bookCount
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error while fetching stats"
    });
  }
};
