class BaseHandler {

    constructor(server, modelName) {
        this.server = server;
        this.modelName = modelName;
    }

    dispatch(route, options) {
        return this.trigger.bind(this, options.method);
    }

    trigger(method, request, reply) {
        this.em = request.getDbManager();
        return this[method].call(this, request, reply);
    }

    getModel() {
        return this.em.getModel(this.modelName)
    }

    getModelByName(modelname) {
        return this.em.getModel(modelname)
    }

    getSequelize() {
        return this.em.sequelize;
    }
    
    
    create = async (request, reply) => {        
        let params = request.payload;
        try {
            const data = await this.getModel().create(params);
            return reply({ data: data});
        } catch (error) {
            //return res.status(500).json({ error: error.message });
            return reply({ code: 2, msg: error.message }).code(500);
        }
   };
  
    getAll = async (request, reply) => {
        try {
        const datas = await this.getModel().findAll();
        return reply({ data: datas});
        } catch (error) {
        //return res.status(500).send(error.message);
        return reply({ code: 2, msg: error.message }).code(500);
        }
   };
  
    getById = async (request, reply) => {
        try {
            const { id } = request.payload;
            const data = await this.getModel().findOne({
                where: { id: id }
            });
            if (data) {
                return reply({ data:data });
            }
            return reply({ code: 2, msg: "Data with the specified ID does not exists" }).code(404);
            //return res.status(404).send("Post with the specified ID does not exists");       
        } catch (error) {
            return reply({ code: 2, msg: error.message }).code(500);
        }
    };
  
    update = async (request, reply) => {
        try {
        const { id } = request.params;
        const [updated] = await this.getModel().update(request.payload, {
            where: { id: id }
        });
        if (updated) {
            const updatedData = await this.getModel().findOne({ where: { id: id } });
            return reply({ data: updatedData });
        }
        return reply({ code: 2, msg: "Data not found" }).code(401);
        } catch (error) {
            return reply({ code: 2, msg: error.message }).code(500);
        }
    };
  
    remove = async (request, reply) => {
        try {
        const { id } = request.payload;
        const deleted = await this.getModel().destroy({
            where: { id: id }
        });
        if (deleted) {
            return reply({ msg: "Data deleted" });
        }
        return reply({ code: 2, msg: "Data not found" }).code(401);
        } catch (error) {
            return reply({ code: 2, msg: error.message }).code(500);
        }
    };
}

module.exports = BaseHandler;