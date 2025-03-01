const router = require('express').Router();
const { User, Review, Comment } = require('../../models')

//  This is the 'get' route 
router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            attributes: {exclude: ['user_id']},
            include: [
              {
              model: Review,
              attributes: {exclude: ['pairing_id', 'user_id']}
              },
              {
              model: User,
              attributes: {exclude: ['id', 'password']}
              },
            ]
        });

        const comments = await commentData.map((comment) => comment.get({ plain: true }));

        res.status(200).json(comments)
    } catch (err) {
        res.status(500).json(err);
    }
});

//  This is the 'post' route 
router.post('/', async (req, res) => {
    try {
        const commentData = await Comment.create({
          comment_text: req.body.comment_text
        });
        
        res.status(200).json(commentData)
    } catch(err) {
        res.status(500).json(err);
    }
});

//  This is the 'get' route 
router.get('/:id', async (req, res) => {
    try {
        const commentData = await Comment.findByPk(req.params.id);

        if (!commentData) {
            res.status(404).json({ message: 'No comment found with that id' });
            return;
        };

        res.status(200).json(commentData)
    } catch (err) {
        res.status(500).json(err);
    }
});

//  This is the 'put' route 
router.put('/:id', async (req, res) => {
    try{
      const commentData = await Comment.update(req.body, {
        where: {id: req.params.id}
      });
  
      if (!commentData) {
        res.status(404).json({message: "No comments found with that id"});
        return;
      };
  
      res.status(202).json(commentData);
    } catch (err) {
      res.status(500).json(err);
    }
});

//  This is the 'delete' route - id
router.delete('/:id', async (req, res) => {
    try{
      const commentData = await Comment.destroy({
        where: {id: req.params.id}
      });
  
      if (!commentData) {
        res.status(404).json({message: 'No comments found with that id'});
        return;
      };
  
      res.status(200).json(commentData);
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router ;