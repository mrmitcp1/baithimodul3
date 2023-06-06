const BaseModel = require('./base.models');
class ListModels extends BaseModel {
        async getList(){
            let sql = `SELECT ID,Name,City,Price FROM Homestay limit 5;`
            return await this.querySql(sql)
        }
}
module.exports = new ListModels();