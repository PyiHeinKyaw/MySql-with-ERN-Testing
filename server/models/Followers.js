module.exports = (sequelize, DataTypes) => {
    const Followers = sequelize.define("Followers", {
        followerId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    })

    return Followers
}