const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');

const jwt_auth = require('../middleware/jwt_auth');

const User = require('../models/User');
const Profile = require('../models/Profile');
const Post = require('../models/Post');


// @route   GET /posts
// @desc    Get all posts
// @access  PUBLIC
router.get('/', async (req, res) => {
    
    try 
    {
        const posts = await Post.find().sort({date: -1});

        res.json(posts);
    }
    catch(error)
    {
        console.error(error.message);
        res.status(500).send('Server Error!');
    }
});

// @route   GET /posts/:post_id
// @desc    Get specific post by ID
// @access  PUBLIC
router.get('/:post_id', async (req, res) => {
    
    try 
    {
        const post = await Post.findById(req.params.post_id);

        if (!post)
            return res.status(404).json({msg:'Post not found!'});

        res.json(post);
    }
    catch(error)
    {
        console.error(error.message);

        if (error.kind === 'ObjectId')
            return res.status(404).json({msg:'Post not found!'});

        res.status(500).send('Server Error!');
    }
});


// @route   POST /posts
// @desc    Make a new post
// @access  PRIVATE
router.post('/', [jwt_auth,
    check('text', 'Text required!').not().isEmpty()
], async (req, res) => {

    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty())
        return res.status(400).json({errors:validationErrors.array()});

    try {
        const user = await User.findById(req.loggedUser.id).select('-password');

        const post = new Post({
            user: req.loggedUser.id,
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
        });

        const savePost = await post.save();

        res.json(savePost);
    }
    catch(error)
    {
        console.error(error.message);
        res.status(500).send('Server Error!');
    }
    
});

// @route   DELETE /posts/:post_id
// @desc    Delete post by ID
// @access  PRIVATE
router.delete('/:post_id', jwt_auth, async (req, res) => {

    try 
    {
        const postToDelete = await Post.findById(req.params.post_id);

        // Check if post exists in the DB first
        if (!postToDelete)
            return res.status(404).json({msg:'Post not found!'});

        // Check if user owns this post and is authenticated to delete it
    
        if (postToDelete.user.toString() !== req.loggedUser.id)
            return res.status(401).json({msg:'Unauthorized'});
        else
            {
                await postToDelete.remove();
    
                res.json('Post deleted!');
            }    
    }
    catch(error)
    {
        console.error(error.message);

        if (error.kind === 'ObjectId')
            return res.status(404).json({msg:'Post not found!'});

        res.status(500).send('Server Error!');
    }
    
});

// @route   PUT /posts/like/:post_id
// @desc    Like a post by ID
// @access  PRIVATE
router.put('/like/:post_id', jwt_auth, async (req, res) => {
    try 
    {
        const post = await Post.findById(req.params.post_id);
        
        // Check if post already liked
        if (post.likes.filter(like => like.user_id.toString() === req.loggedUser.id).length > 0)
            return res.status(400).json({msg:'You already liked this post!'});

        post.likes.unshift({user_id: req.loggedUser.id});

        await post.save();

        res.json(post.likes);
    }
    catch(error)
    {
        console.error(error.message);
        res.status(500).send('Server Error!');
    }
});

// @route   PUT /posts/unlike/:post_id
// @desc    Unlike a post by ID
// @access  PRIVATE
router.put('/unlike/:post_id', jwt_auth, async (req, res) => {
    try 
    {
        const post = await Post.findById(req.params.post_id);
        
        // Check if post already liked
        if (post.likes.filter(like => like.user_id.toString() === req.loggedUser.id).length === 0)
            return res.status(400).json({msg:'You already unliked this post!'});


        const index = post.likes.map(like => like.user_id.toString()).indexOf(req.loggedUser.id);

        post.likes.splice(index, 1);

        await post.save();

        res.json(post.likes);
    }
    catch(error)
    {
        console.error(error.message);
        res.status(500).send('Server Error!');
    }
});

// @route   POST /posts/comment/:post_id
// @desc    Comment on post by ID
// @access  PRIVATE
router.post('/comment/:post_id', [jwt_auth, 
    check('text', 'Text required!').not().isEmpty(),
], async (req, res) => {

    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty())
        return res.status(400).json({errors:validationErrors.array()});

    
    try
    {
        const user = await User.findById(req.user.id).select('-password');
        const post = await Post.findById(req.params.id);
    
        const comment = {
            user: req.loggedUser.id,
            text: req.body.text,
            name: user.name,
            avatar: user.avatar
        };
    
        post.comments.unshift(comment);
    
        await post.save();
    
        res.json(post.comments);
    }
    catch(error)
    {
        console.error(error.message);
        res.status(500).send('Server Error!');
    }
    
});

// @route   POST /posts/comment/:post_id/:comment_id
// @desc    Delete a comment by ID
// @access  PRIVATE
router.delete('/comment/:post_id/:comment_id', jwt_auth, async (req, res) => {
    try
    {
        const post = await Post.findById(req.params.post_id);

        // Get comment from the Post
        const comment = post.comments.find(comment => comment.id === req.params.comment_id);

        // Check if comment exists on the post
        if (!comment)
            return res.status(404).json({msg:'Comment not found!'});

        // Make sure user owns the comment
        if (comment.user_id.toString() !== req.user.id)
            return res.status(401).json({msg:'Unauthorized'})

        const index = post.comments.map(comment => comment.user_id.toString()).indexOf(req.loggedUser.id);
        
        post.comments.splice(index, 1);

        await post.save();

        res.json(post.comments);
        
    }
    catch(error)
    {
        console.error(error.message);
        res.status(500).send('Server Error!');
    }
});

module.exports = router;