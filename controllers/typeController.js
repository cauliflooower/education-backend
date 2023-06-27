const {Type} = require('../models')
const ApiError = require('../error/ApiError');

class TypeController {
    async create(req, res) {
        const {name} = req.body
        const type = await Type.create({name})
        return res.json(type)
    }

    async getAll(req, res) {
        const types = await Type.findAll()
        return res.json(types)
    }

    async deleteOne(req, res){
        try{
            const id = parseInt(req.params.id)
            await Type.destroy({
                where: {
                    id
                }
            }) 
            res.json("Queestion delete")
        }catch(err){
            res.json(err)
        }
    }
    async updateOne(req, res){
        try{
            const {name} = req.body
            const id = parseInt(req.params.id)
            await Type.update({name}, {
                where: {
                  id
                }
              })
              res.json("update")
        }catch(err){
            res.json(err)
        }
    }

}

module.exports = new TypeController()