const BaseModel = require('./base.models');
class DetailModels extends BaseModel{
    async getDetail(id){
        let sql = `SELECT * FROM Homestay WHERE ID ='${id}'`
        return this.querySql(sql);
    }
}
module.exports = new DetailModels();