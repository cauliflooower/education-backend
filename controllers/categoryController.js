const uuid = require('uuid')
const path = require('path');
const {Informs} = require('../models')
const ApiError = require('../error/ApiError');

class categoryController {
    async create(req, res, next) {
        try {
            let {title, text, typeId} = req.body
            const {img} = req.files
            if(img === null){
                const device = await Informs.create({title, text, typeId, img: null});
                return res.json(device)
            } else{
                let fileName = uuid.v4() + ".jpg"
                img.mv(path.resolve(__dirname, '..', 'static', fileName))
                const device = await Informs.create({title, text, typeId, img: fileName});
                return res.json(device)
            }
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res) {
        const category = await Informs.findAll()
        return res.json(category)
    }

    async getOne(req, res) {
        let {typeId} = req.query
        let {id} = req.params
            const device = await Informs.findAll({where: {typeId: id}})
            return res.json(device)
    }
    async deleteOne(req, res){
        try{
            const id = parseInt(req.params.id)
            await Informs.destroy({
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
            const {title, text, typeId} = req.body
            // const {img} = req.files
            // let fileName = uuid.v4() + ".jpg"
            // img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const id = parseInt(req.params.id)
            await Informs.update({title, text, typeId}, {
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

module.exports = new categoryController()