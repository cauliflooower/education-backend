const sequelize = require('./db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Valanters = sequelize.define('valanters', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    surname: {type: DataTypes.STRING, allowNull: false},
    otchestvo: {type: DataTypes.STRING, allowNull: false},
    group: {type: DataTypes.INTEGER, allowNull: false},
})

const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Society = sequelize.define('society', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    surname: {type: DataTypes.STRING, allowNull: false},
    group: {type: DataTypes.INTEGER, allowNull: false},
})

const Message = sequelize.define('messages', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.TEXT},
    mail: {type: DataTypes.TEXT},
    tel: {type: DataTypes.STRING},
    text: {type: DataTypes.TEXT},
    author: {type: DataTypes.STRING},
})

const Informs = sequelize.define('informs', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.TEXT, allowNull: true},
    text: {type: DataTypes.TEXT, allowNull: true},
    img: {type: DataTypes.STRING},
})


Type.hasMany(Informs)
Informs.belongsTo(Type)

module.exports = {
    User,
    Type,
    Society,
    Message,
    Valanters,
    Informs
}