'use strict';

var express = require('express');
var controller = require('./sitemap.controller');

var router = express.Router();

router.get('/', controller.index);
// router.get('/:id', controller.show);
router.get('/name/:domain', controller.show);
router.post('/', controller.crawl);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.post('/deleteUrl', controller.destroy);

module.exports = router;