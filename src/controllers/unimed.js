const { create,fragment} = require("xmlbuilder2")
const md5  = require("md5")
const soapRequest = require('easy-soap-request');

const ns1 = 'http://schemas.xmlsoap.org/soap/envelope/'
const ans = 'http://www.ans.gov.br/padroes/tiss/schemas'
const sch = "http://www.w3.org/2000/09/xmldsig"
// const ans = "http://www.ans.gov.br/padroes/tiss/schemas"

// pegar dados para inserir no XMl
const data = {
type:"SOLICITA_STATUS_AUTORIZACAO",
 seq:"1",
 date:"2021-02-06",
 time : "17:00:00",
 codigoOpe : "00633003074001",
 ans : "343889",
 version  : "3.04.00",
 ans2 : "343889",
 numGuia : "5512458",
 matricula : "00060500010869017",
 rn : "N",
 nomeBeneficiario: "SIMONE FATIMA TOBIAS RETES",
 codigoOpe2 : "00633003074001",
 nomeContratado: "CENTRO ESPECIALIZADO EM ULTRASSONOGRAFIA"
}

function objToString (obj) {
    var str = '';
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            str += obj[p];
        }
    }
    return str;
}
// gerar hash
const hashValue =  md5(objToString(data))

// monta xml
const doc = create()
  .ele(ns1, 'soapenv:Envelope').att({ 'xmlns:ans': ans, 'xmlns:xd':   sch})
  .ele(ns1, 'Header').up()
  .ele(ns1, "Body")
  .ele(ans, "solicitacaoStatusAutorizacaoWS")
  .ele("cabecalho")
  .ele("identificacaoTransacao")
  .ele("tipoTransacao").txt(data.type).up()
  .ele("sequencialTransacao").txt(data.seq).up()
  .ele("dataRegistroTransacao").txt(data.date).up()
  .ele("horaRegistroTransacao").txt(data.time).up().up()
  .ele("origem")
  .ele("identificacaoPrestador")
  .ele("codigoPrestadorNaOperadora").txt(data.codigoOpe).up().up().up()
  .ele("destino")
  .ele("registroANS").txt(data.ans).up().up()
  .ele("Padrao").txt(data.version).up().up()
  .ele("solicitacaoStatusAutorizacao" )
  .ele("identificacaoSolicitacao")
  .ele('registroANS').txt(data.ans2).up()
  .ele("numeroGuiaPrestador").txt(data.numGuia).up().up()
  .ele("dadosBeneficiario")
  .ele("numeroCarteira").txt(data.matricula).up()
  .ele("atendimentoRN").txt(data.rn).up()
  .ele("nomeBeneficiario").txt(data.nomeBeneficiario).up().up()
  .ele("dadosContratado")
  .ele("codigoPrestadorNaOperadora").txt(data.codigoOpe2).up()
  .ele("nomeContratado").txt(data.nomeContratado).up().up().up()
  .ele("hash").txt(hashValue)
  .doc()
const xmlString = doc.end({ headless: true, prettyPrint: true });

const url = "https://servicoshml.unimedbh.com.br/stiss/api/v30400/basic/service/solicita-status-autorizacao?wsdl"
const user =Buffer.from("ws_integraceu:cTID7GNOKUUAubODanM6").toString("base64")
const pass = Buffer.from("cTID7GNOKUUAubODanM6").toString("base64")
const sampleHeaders = {
  'user-agent': 'sampleTest',
  'Content-Type': 'text/xml;charset=UTF-8',
  'Authorization': `Basic ${user}`
};



console.log(xmlString)
// soapRequest({ url: url, headers: sampleHeaders, xml: xmlString, timeout: 1000 }).then(data => console.log(data)).catch(err => console.log(err))
  
