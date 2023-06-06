const url = require('url');
const qs = require('qs');
const BaseController = require("../models/base.models");
const handle = require("../../handlers/handlers");
const homestayToUpdate = require('../models/update.models');

class HomeStayUpdate extends BaseController{
    async showFormUpdate(req,res){
        let ID = url.parse(req.url, true).query.ID;
       let homestay = await homestayToUpdate.updateHomestay(ID)

        let data = await handle.getTemplate('./view/update.html');
        data = data.replace('{Name}', `<input type="text" class="form-control" name="nameUpdate" value="${homestay[0].Name}" placeholder="Update HomeStay Name">`);
        data = data.replace('{City}', `<input type="text" class="form-control" name="cityUpdate" value="${homestay[0].City}" placeholder="Update City">`);
        data = data.replace('{Bedrooms}', `<input type="number" name ="bedroomsUpdate" class="form-control" value="${homestay[0].Bedrooms}" placeholder="Update Bedrooms">`);
        data = data.replace('{Price}', `<input type="number" name="priceUpdate" class="form-control" value="${homestay[0].Price}" placeholder="Update Price">`);
        data = data.replace('{Toilet}', `<input type="text" name="toiletUpdate" class="form-control" value="${homestay[0].Toilet}" placeholder="Update Toilet">`);
        data = data.replace('{Describes}', `<input type="text" name="descriptionUpdate" class="form-control" value="${homestay[0].Describes}" placeholder="Update Describes">`);
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    }
    updateHomestay(req, res){
        let id = url.parse(req.url, true).query.ID;
        let data = '';
        req.on('data', chunk => data += chunk)
        req.on('end', async () => {
            let homestay = qs.parse(data);
            const sql = `UPDATE Homestay
                     SET Name = '${homestay.nameUpdate}', 
                         City = '${homestay.cityUpdate}',
                         Bedrooms = '${homestay.bedroomsUpdate}', 
                         Price = '${homestay.priceUpdate}',
                         Toilet = '${homestay.toiletUpdate}', 
                         Describes ='${homestay.descriptionUpdate}'
                     WHERE ID = '${id}';`
            await this.querySql(sql);
            res.writeHead(301,{'Location': '/'});
            res.end();
        })
    }
}
module.exports = new HomeStayUpdate();