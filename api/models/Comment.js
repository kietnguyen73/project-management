module.exports = function(database, Sequelize) {
    const Comment = database.define('comment', {
        commentId : {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'comment_id'
        },
        message: {
            type: Sequelize.STRING(100),
            allowNull: true,
            field: 'message'
        },
        attachedImage: {
            type: Sequelize.TEXT,
            allowNull: true,
            field: 'attached_image'
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
        }
    }, {
        timestamps: false
    });
    return Comment;
}