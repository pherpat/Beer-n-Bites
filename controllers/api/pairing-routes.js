const router = require('express').Router();
const { User, Pairing, Review, Comment } = require('../../models');

//  This is the 'get' route 
router.get('/', async (req, res) => {
    try {
        const pairingData = await Pairing.findAll({
            include: [
              {
                model: User,
                attributes: {exclude: ['password']}
              },
              {
                model: Review,
                attributes: {exclude: ['id']}
              }
            ]
        });

        const pairings = await pairingData.map((pairing) => pairing.get({ plain: true}));

        res.status(200).json(pairings);
    } catch (err) {
        res.status(500).json(err);
    }
});
//  This is the 'post' route 
router.post('/', async (req, res) => {
    try {
        const pairingData = await Pairing.create({
          beer_id: req.body.beer_id,
          beer_name: req.body.beer_name,
          beer_img: req.body.beer_img,
          dish_id: req.body.dish_id,
          dish_name: req.body.dish_name,
          dish_img: req.body.dish_img,
          dish_link: req.body.dish_link,
          user_id: req.session.user_id
        });
        
        res.status(200).json(pairingData);
    } catch(err) {
        res.status(500).json(err);
    }
});
//  This is the 'get' route by id
router.get('/:id', async (req, res) => {
    try {
        const pairingData = await Pairing.findByPk(req.params.id);

        if (!pairingData) {
            res.status(404).json({ message: 'No pairing found with that id' });
            return;
        };

        res.status(200).json(pairingData);
    } catch (err) {
        res.status(500).json(err);
    }
});
//  This is the 'put' route 
router.put('/:id', async (req, res) => {
    try{
      const pairingData = await Pairing.update(req.body, {
        where: {id: req.params.id}
      });
  
      if (!pairingData) {
        res.status(404).json({message: "No pairing found with that id"});
        return;
      };
  
      res.status(202).json(pairingData);
    } catch (err) {
      res.status(500).json(err);
    }
});
//  This is the 'delete' route 
router.delete('/:id', async (req, res) => {
    try{
      const pairingData = await Pairing.destroy({
        where: {id: req.params.id}
      });
  
      if (!pairingData) {
        res.status(404).json({message: 'No pairing found with that id'});
        return;
      };
  
      res.status(200).json(pairingData);
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router ;