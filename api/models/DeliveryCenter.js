module.exports = function(database, Sequelize) {
    const DeliveryCenter = database.define('delivery_center', {
        deliveryCenterId : {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'delivery_center_id'
        },
        deliveryCenterName : {
            type: Sequelize.STRING(100),
            allowNull: false,
            unique: true,
            field: 'delivery_center_name'
        },
        createdDate: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: () => {
                return Sequelize.NOW;
            },
            field: 'created_date'
        },
        updatedDate: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: () => {
                return Sequelize.NOW;
            },
            field: 'updated_date'
        },
        isDeleted: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            field: 'is_deleted'
        },
        createdBy: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: '1',
            field: 'created_by'
        }
        
    }, {
        timestamps: false
    });
    return DeliveryCenter;
}