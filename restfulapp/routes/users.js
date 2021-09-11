var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
	res.send('respond with a resource');
});

/* GET user list. */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});
/*
 * POST to AddUser.
 */
router.post('/adduser', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/*
 * PUT to updateuser.
 */

router.put('/updateuser/:id', function(req, res) {
	var db = req.db;
	var collection = db.get('userlist');
	var userToUpdate = req.params.id;
	var doc = { $set: req.body};
	collection.updateById(userToUpdate, doc ,function(err, result) {
		res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
	});
});

/*
 * DELETE to deleteuser.
 */
router.delete('/deleteuser/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    var userToDelete = req.params.id;
    collection.remove({ '_id' : userToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});

module.exports = router;
