require("dotenv").config();
const soapRequest = require('easy-soap-request');

const parser = require('fast-xml-parser');


const sampleHeaders = {
	'Content-Type': 'text/xml;charset=UTF-8',
	'Authorization': `Basic ${process.env.AUTH}`
};
var options = {
	attributeNamePrefix : "@_",
    attrNodeName: "attr", //default is 'false'
    textNodeName : "#text",
    ignoreAttributes : true,
    ignoreNameSpace : true,
    allowBooleanAttributes : false,
    parseNodeValue : true,
    parseAttributeValue : false,
    trimValues: true,
    cdataTagName: "__cdata", //default is 'false'
    cdataPositionChar: "\\c",
    parseTrueNumberOnly: false,
    arrayMode: false, //"strict"
    stopNodes: ["parse-me-as-string"]
};
module.exports = {
	async consulta_status(xml, callback){
		const url = process.env.URL_HML_STATUS
		
		try{
			const { response } =  await soapRequest({ url: url, headers: sampleHeaders, xml: xml, timeout: 10000 })
			const { body } = response
			const json = parser.parse(body, options)
			const obj = JSON.stringify(json)
			const pars = JSON.parse(obj)
			const toAPi = pars.Envelope.Body.situacaoAutorizacaoWS.situacaoAutorizacao
			callback(null,toAPi)

		}catch(err) {
			callback(err, null)
		}
	},
	async consulta_elegibilidade(xml, callback){
		const url = process.env.URL_HML_ELEGIBILIDADE
		
		try{
			const { response } =  await soapRequest({ url: url, headers: sampleHeaders, xml: xml, timeout: 10000 })
			const { body } = response
			const json = parser.parse(body, options)
			const obj = JSON.stringify(json)
			const pars = JSON.parse(obj)
			const toAPi = pars.Envelope.Body.respostaElegibilidadeWS.respostaElegibilidade

			
			callback(null,toAPi)

		}catch(err) {
			callback(err, null)
		}
	}
}


