const PORT = 3333;
const http = require('http');
const url = require("url");
const showHomeStay = require('./src/controllers/list.controller');
const detailHomeStay = require('./src/controllers/detail.controller')
const homestayAdd = require('./src/controllers/add')
const homestayUpdate = require('./src/controllers/update.controller')
const homestayDelete= require('./src/controllers/delete.controller')

const server = http.createServer((req, res) => {
    let urlPath = url.parse(req.url).pathname;
    switch (urlPath) {
        case '/':
             showHomeStay.showListHomestay(req, res).catch(err => {
                 console.log(err);})
            break;
        case '/add':
            if (req.method === 'GET') {
                homestayAdd.showFormAdd(req, res).catch(err => {
                    console.log(err);});
            } else {
                homestayAdd.addHomestay(req, res)
            }
            break;
        case '/update':
            if (req.method === 'GET') {
                homestayUpdate.showFormUpdate(req, res).catch(err => {
                    console.log(err);});
            } else {
                homestayUpdate.updateHomestay(req, res);
            }
            break;
        case '/delete':
            homestayDelete.deleteHomestay(req, res).catch(err => {
                console.log(err);});
            break;
        case '/detail':
            detailHomeStay.showDetail(req, res).catch(err => {
                console.log(err);})
            break;
        default:
            res.end();
    }
})
server.listen(PORT, 'localhost', () => {
    console.log(`listening on http://localhost:${PORT}`);
})