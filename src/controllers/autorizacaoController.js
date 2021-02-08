require("dotenv").config();
const xml = require("../utils/gerarXml")
const {consulta_status,consulta_elegibilidade} = require("../utils/soap.js")

class AutorizacaoController{
	
	async statusAuto (req, res){
		const {codOpera, ans, numGuia, matricula,rn,nomeBeneficiario,nomeContratado} = req.body

		// if(!codOpera) return res.send("Favor informar codigo codOpera")
		// if(!numGuia) return res.send("Favor informar numero guia")
		// if(!matricula) return  res.send("Favor informar a matricula")
		
		const xmlGerado = xml.XMLSTATUS(codOpera, ans, numGuia, matricula, rn, nomeBeneficiario, nomeContratado)	
		await consulta_status(xmlGerado, (err, data)=>{
			if(err) {

				return res.send(err)
			}
			res.send(data)
		})

	}
	async elegibilidade(req, res) {

		const {codOpera, matricula,nomeBeneficiario,nomeContratado} = req.body
		const xmlGerado = xml.XMLELEGIBILIDADE(codOpera, matricula,  nomeBeneficiario, nomeContratado)
		await consulta_elegibilidade(xmlGerado, (err, data)=>{
			if(err) {
				
				return res.send(err)
			}
			res.send(data)
		})	

	}
}




module.exports = new AutorizacaoController()