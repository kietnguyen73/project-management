const express = require('express');
const router = express.Router();
const DeliveryCenterController = require('../api/controllers/DeliveryCenter_Controller');
const deliveryCenterController = new DeliveryCenterController();
const Auth = require('../api/controllers/AuthController');


router.use(Auth.authenticate);

router.post('/', deliveryCenterController.createDeliveryCenter);

router.get('/', deliveryCenterController.findAll);

router.get('/:id', deliveryCenterController.findDeliveryCenterById);

router.put('/:id', deliveryCenterController.updateDeliveryCenter);

router.delete('/:id', deliveryCenterController.deleteDeliveryCenter);


module.exports = router;
