const url = require('url');
const deleteHomestay = require('../models/delete.models');

class DeleteController {
    async deleteHomestay(req, res) {
        let ID = url.parse(req.url, true).query.ID;
        await deleteHomestay.deleteHomeStay(ID)
        res.writeHead(301, {'Location': '/'})
        res.end();
    }
}
module.exports = new DeleteController();