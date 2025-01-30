const {Post} = require('../models');
const user = require('../models/user');

exports.createPost = async (req, res) => {
  try {
    const {title, content} = req.body;
    const userId = req.user?.id;

    if (!title) {
      return res.status(400).send({
        message: 'Please, enter a not empty title!',
      });
    }

    if (!content) {
      return res.status(400).send({
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

    if (!title) {
      return res.status(400).send({
        message: 'Please, enter a not empty title!',
      });
    }

    if (!content) {
      return res.status(400).send({
        message: 'Please, enter a not empty content!',
      });
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
    const userId = req.user?.id;
    const posts = await Post.findAll({
      where: {
        user_id: userId,
      },
    });
    res.status(200).send({success: true, posts});
  } catch (error) {
    console.log('Error trying to get the all posts: ', error);
    res
      .status(400)
      .send({success: false, message: 'Something went wrong trying to get the all posts'});
  }
};
