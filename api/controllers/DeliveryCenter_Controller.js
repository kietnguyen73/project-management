const DeliveryCenterManager = require('../managers/DeliveryCenterManager');
const deliveryCenterManager = new DeliveryCenterManager();
const hasPermission = require('../policies/hasPermission');

class DeliveryCenterController {

    async findDeliveryCenterById(req, res, next) {
        
        hasPermission(req, res, next);
    
        let deliveryCenterId = req.params.id;

        try {
            let deliveryCenter = await deliveryCenterManager.getDeliveryCenterById(deliveryCenterId);
            if (deliveryCenter.length === 0) {
                return res.status(200).json({ message: "Cannot find deliveryCenter" });
            }
            return res.status(200).json({ deliveryCenter });
    
        } catch (err) {
            return res.status(500).json({ message: err });
        }
    }

    findAll(req, res, next) {

        hasPermission(req, res, next);

        deliveryCenterManager.getAllDeliveryCenter()
            .then(deliveryCenter => {
                return res.status(200).json({ deliveryCenter });
            })
            .catch(err => {
                return res.status(500).json({ message: err });
            });
    }

    createDeliveryCenter(req, res, next) {
       
        hasPermission(req, res, next);

        deliveryCenterManager.insertDeliveryCenter(req.body)
        .then(result => {
            return res.status(200).json({ message: "Inserted deliveryCenter successfully" });
        })
        .catch(err => {
            return res.status(500).json({ message: err });
        });
    }


    deleteDeliveryCenter(req, res, next) {
        
        hasPermission(req, res, next);

        let deliveryCenterId = req.params.id;

        deliveryCenterManager.removeDeliveryCenter(deliveryCenterId)
            .then(result => {
                if (result[0] === 1) {
                    return res.status(200).json({ message: "Deleted deliveryCenter successfully" });
                }
                return res.status(500).json({ message: "Deleted deliveryCenter failed" });
            })
            .catch(err => {
                return res.status(500).json({ message: err });
            });
    }

    
    async updateDeliveryCenter(req, res, next) {

        hasPermission(req, res, next);

        let deliveryCenterId = req.params.id;
        console.log(deliveryCenterId);
    
        try {
            let deliveryCenter = await deliveryCenterManager.getDeliveryCenterById(deliveryCenterId);
            if (deliveryCenter.length === 0) {
                return res.status(200).json({ message: "Cannot find deliveryCenter" });
            }
    
            //if deliveryCenter found, update deliveryCenter information
            deliveryCenterManager.updateDeliveryCenterById(deliveryCenterId, req.body)
                    .then(result => {
                        console.log(result[0]);
                        if (result[0] === 1) {
                            return res.status(200).json({ message: "Updated deliveryCenter successfully" });
                        }
                        return res.status(500).json({ message: "Updated deliveryCenter failed" });
    
                    })
                    .catch(err => {
                        return res.status(500).json({ message: err });
                    });
    
        } catch (err) {
            return res.status(500).json({ message: err });
        }
    
    }


}

module.exports = DeliveryCenterController;