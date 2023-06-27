const {Message} = require('../models')
const ApiError = require('../error/ApiError');

class MessageController {
    async create(req, res) {
        const {name, mail, tel, text} = req.body
        const message = await Message.create({name, mail, tel, text})
        return res.json(message)
    }

    async getAll(req, res) {
        const messages = await Message.findAll()
        return res.json(messages)
    }
    async deleteOne(req, res){
        try{
            const id = parseInt(req.params.id)
            await Message.destroy({
                where: {
                    id
                }
            }) 
            res.json("Queestion delete")
        }catch(err){
            res.json(err)
        }
    }
}

module.exports = new MessageController()