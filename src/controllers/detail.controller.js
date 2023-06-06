const url = require('url');
const BaseController = require("../models/base.models");
const handle = require("../../handlers/handlers");
const detailHomestay = require('../models/detail.models');

class DetailController extends BaseController{

    async showDetail(req, res){
        let id = url.parse(req.url, true).query.ID;
        let dataHomestay= await detailHomestay.getDetail(id);
        let homestayName = dataHomestay[0].Name;
        let homestayCity = dataHomestay[0].City;
        let homestayBedrooms = dataHomestay[0].Bedrooms;
        let homestayToilet= dataHomestay[0].Toilet;
        let homestayPrice = dataHomestay[0].Price;
        let homestayDescribes = dataHomestay[0].Describes;
        let data = await handle.getTemplate('./view/detail.html');
        data = data.replace('{nameHomestay}',homestayName );
        data = data.replace('{City}',homestayCity);
        data = data.replace('{Bedrooms}',homestayBedrooms);
        data = data.replace('{Toilet}',homestayToilet);
        data = data.replace('{Price}',homestayPrice);
        data = data.replace('{describes}',homestayDescribes);
        res.writeHead(200, {'Content-type': 'text/html'});
        res.write(data);
        res.end();
    }
}
module.exports = new DetailController();