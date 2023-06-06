
const BaseController = require("../models/base.models");
const handle = require("../../handlers/handlers");
const listHomestay = require("../models/list.models")

class ListController extends BaseController {
    async showListHomestay(req, res) {
        let homeStays = await listHomestay.getList()
        let html = '';
        homeStays.forEach((homeStay, index) => {
            html += `<tr>`;
            html += `<th>${index+1}</th>`
            html += `<th>${homeStay.Name}</th>`
            html += `<th>${homeStay.City}</th>`
            html += `<th>${homeStay.Price}</th>`
            html += `<th><a onclick="return confirm('Are you sure?')" href="delete?ID=${homeStay.ID}" class="btn btn-primary m-1">Delete</a><a href="update?ID=${homeStay.ID}" class="btn btn-danger m-1">Update</a><a href="detail?ID=${homeStay.ID}" class="btn btn-primary m-1">Detail</a></th>`
            html += `</tr>`
        })
        let data = await handle.getTemplate('./view/list.html');
        data = data.replace('{list-homestay}', html);
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    }
}
module.exports = new ListController();