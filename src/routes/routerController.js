
const autorizacaoRoute = require('express').Router();
const autorizacaoController = require("../controllers/autorizacaoController")

autorizacaoRoute.post("/status" ,autorizacaoController.statusAuto)
autorizacaoRoute.post("/elegibilidade", autorizacaoController.elegibilidade)

const routerController = (app) => {
	app.use(autorizacaoRoute)

}

module.exports = routerController