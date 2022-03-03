module.exports = (sequelize, DataTypes) => {
    const Comments = sequelize.define("Comments", {
        commentBody: {
            type: DataTypes.TEXT('long'),
            allowNull: false
        },
    })
    return Comments
}