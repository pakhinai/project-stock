module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('Admin', {
        username: {
            type: DataTypes.STRING(255),
            uniqe: true
        },
        password: {
            type: DataTypes.STRING(255)
        },
    },{
        tableName: 'admin',
    })

    return model
}