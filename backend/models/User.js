module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('User', {
        username: {
            type: DataTypes.STRING(255),
            uniqe: true
        },
        password: {
            type: DataTypes.STRING(255)
        },
        email: {
            type: DataTypes.STRING(255)
        }
    },{
        tableName: 'users',
    })

    return model
}