module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('Underamour', {
        name: {
            type: DataTypes.STRING(255),
        },
        image: {
            type: DataTypes.STRING(255)
        },
        price: {
            type: DataTypes.INTEGER
        },
        stock: {
            type: DataTypes.INTEGER
        }
    },{
        tableName: 'underarmour',
    })

    return model
}