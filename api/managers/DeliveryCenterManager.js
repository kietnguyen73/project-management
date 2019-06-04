const db = require('../models/associations/model-associations');
const DeliveryCenter = db.DeliveryCenter;

class DeliveryCenterManager {
    
    insertDeliveryCenter(deliveryCenter) {
        return DeliveryCenter.create(deliveryCenter);
    }

    removeDeliveryCenter(deliveryCenterId) {
        return DeliveryCenter.update({
            isDeleted: 1
        }, {
            where: {
                deliveryCenterId: deliveryCenterId
            }
        });
    }

    getAllDeliveryCenter() {
        return DeliveryCenter.findAll({
            where: {
                isDeleted: 0
            }
        });
    }

    getDeliveryCenterById(deliveryCenterId) {
        return DeliveryCenter.findAll({
            where: {
                deliveryCenterId: deliveryCenterId
            }
        });
    }

    updateDeliveryCenterById(deliveryCenterId, employee) {
        return DeliveryCenter.update(
           employee
        , {
            where: {
                deliveryCenterId: deliveryCenterId
            }
        });
    }
}

module.exports = DeliveryCenterManager;