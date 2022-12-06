const { STRING } = require("sequelize")

module.exports = (Sequelize, DataTypes) => {

    let Student = Sequelize.define('Student', {

        name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        starID: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true

        },

        present: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    })

    //Force specifies whether to drop the table or not 
    // True = drop table every time app restarts. Need this setting if table schema changed.
    // false = keep table

    Student.sync( {force: false} ).then( () => {
        console.log(' Synced student table ')
    })

    return Student

 
}