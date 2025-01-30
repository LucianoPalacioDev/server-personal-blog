const {Post} = require('../models');
const {Op} = require('sequelize');

const POST_PAGE_SIZE = 10;

exports.createPost = async (req, res) => {
  try {
    const {title, content} = req.body;
    const userId = req.user?.id;

    if (!title) {
      return res.status(400).send({
        success: false,
        message: 'Please, enter a not empty title!',
      });
    }

    if (!content) {
      return res.status(400).send({
        success: false,
        message: 'Please, enter a not empty content!',
      });
    }

    await Post.create({
      title,
      content,
      user_id: userId,
    });

    res.status(201).send({success: true});
  } catch (error) {
    console.log('Error trying to create a new post: ', error);
    res
      .status(400)
      .send({success: false, message: 'Something went wrong trying to create a new post'});
  }
};

exports.updatePost = async (req, res) => {
  try {
    const id = req.params.id;
    const {title, content} = req.body;
    const currentUserId = req.user?.id;

    if (!title) {
      return res.status(400).send({
        success: false,
        message: 'Please, enter a not empty title!',
      });
    }

    if (!content) {
      return res.status(400).send({
        success: false,
        message: 'Please, enter a not empty content!',
      });
    }

    const post = await Post.findOne({
      where: {id: id},
    });

    if (!post) {
      res.status(404).json({success: false, message: 'Post not found!'});
      return;
    }

    if (post?.user_id !== currentUserId) {
      return res.status(403).json({success: false, message: 'Not authorized to edit this post!'});
    }

    const [updated] = await Post.update(
      {title, content},
      {
        where: {id: id},
      },
    );
    if (updated) {
      res.status(200).json({success: true});
      return;
    } else {
      console.log('Error trying to update the post.');
      res
        .status(500)
        .json({success: false, message: 'Something went wrong trying to delete the post'});
    }
  } catch (error) {
    console.log('Error trying to update the post: ', error);
    res
      .status(500)
      .json({success: false, message: 'Something went wrong trying to delete the post'});
  }
};

exports.deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    const currentUserId = req.user?.id;

    const post = await Post.findOne({
      where: {id: id},
    });

    if (!post) {
      res.status(404).json({success: false, message: 'Post not found!'});
      return;
    }

    if (post?.user_id !== currentUserId) {
      return res.status(403).json({success: false, message: 'Not authorized to delete this post!'});
    }

    const deleted = await Post.destroy({
      where: {id: id},
    });
    if (deleted) {
      res.status(200).json({success: true});
      return;
    }
    console.log('Error trying to delete the post.');
    res
      .status(500)
      .json({success: false, message: 'Something went wrong trying to delete the post'});
  } catch (error) {
    console.log('Error trying to delete the post: ', error);
  }
};

exports.getAllPostsByUser = async (req, res) => {
  try {
    const currentUserId = req.user?.id;
    const userIdOwner = req.params.id;
    const posts = await Post.findAll({
      where: {
        user_id: userIdOwner,
      },
    });

    res.status(200).send({success: true, posts, isOwner: currentUserId === Number(userIdOwner)});
  } catch (error) {
    console.log('Error trying to get the all posts: ', error);
    res
      .status(400)
      .send({success: false, message: 'Something went wrong trying to get the all posts'});
  }
};

exports.getAllPostsByUserFiltered = async (req, res) => {
  try {
    const currentUserId = req.user?.id;
    const userIdOwner = req.params.id;
    const searchText = req.query.searchText;

    let whereQuery = {
      user_id: userIdOwner,
    };

    if (searchText) {
      whereQuery = {
        ...whereQuery,
        [Op.or]: [
          {title: {[Op.like]: `%${searchText}%`}},
          {content: {[Op.like]: `%${searchText}%`}},
        ],
      };
    }

    const posts = await Post.findAll({
      where: whereQuery,
    });

    res.status(200).send({success: true, posts, isOwner: currentUserId === Number(userIdOwner)});
  } catch (error) {
    console.log('Error trying to get the all posts filtered: ', error);
    res
      .status(400)
      .send({success: false, message: 'Something went wrong trying to get the all posts filtered'});
  }
};

exports.getPostsByUserFilteredPaginated = async (req, res) => {
  try {
    const currentUserId = req.user?.id;
    const userIdOwner = req.params.id;
    const searchText = req.query.searchText;

    const page = Number(req.query.page) || 1;
    const limit = POST_PAGE_SIZE;
    const offset = (page - 1) * limit;

    let whereQuery = {
      user_id: userIdOwner,
    };

    if (searchText) {
      whereQuery = {
        ...whereQuery,
        [Op.or]: [
          {title: {[Op.like]: `%${searchText}%`}},
          {content: {[Op.like]: `%${searchText}%`}},
        ],
      };
    }

    const {count, rows: posts} = await Post.findAndCountAll({
      where: whereQuery,
      limit: limit,
      offset: offset,
    });

    const hasMore = (offset + limit) < count;

    res.status(200).send({
      success: true,
      posts,
      isOwner: currentUserId === Number(userIdOwner),
      hasMore: hasMore,
    });
  } catch (error) {
    console.log('Error trying to get the all posts filtered and paginated: ', error);
    res.status(400).send({
      success: false,
      message: 'Something went wrong trying to get the all posts filtered and paginated',
    });
  }
};
