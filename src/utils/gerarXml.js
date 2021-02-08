const { create } = require("xmlbuilder2")
const moment = require('moment')
const md5  = require("md5")

const ns1 = 'http://schemas.xmlsoap.org/soap/envelope/'
const ansSchema = 'http://www.ans.gov.br/padroes/tiss/schemas'
const sch = "http://www.w3.org/2000/09/xmldsig"

module.exports = {


 XMLSTATUS (codigoOpe, ans = "343889",numGuia, matricula,rn = "N", nomeBeneficiario="NomeBeneficiario", nomeContratado="NomeClinica"){
  
  const sequencial = Math.floor(Math.random() * 10000);  
  const data = moment().format("yyyy-MM-DD")
  const hora =  moment().format("HH:mm:ss")
  const version= "3.04.00"
  
  if(codigoOpe === undefined) return "Informar codigo da operadora"
    if(numGuia === undefined) return   "Informar numero da guia"
      if(matricula === undefined) return  "Informar matricula"

        const dataToXml = {
          type:"SOLICITA_STATUS_AUTORIZACAO",
          seq:sequencial,
          date:data,
          time : hora,
          codigoOpe,
          ans,
          version,
          ans2 : ans,
          numGuia,
          matricula,
          rn,
          nomeBeneficiario,
          codigoOpe2 : codigoOpe,
          nomeContratado
        }
// gerar hash
const hashValue =  md5(objToString(dataToXml))

// monta xml
const doc = create()
.ele(ns1, 'soapenv:Envelope').att({ 'xmlns:ans': ansSchema, 'xmlns:xd':   sch})
.ele(ns1, 'Header').up()
.ele(ns1, "Body")
.ele(ansSchema, "solicitacaoStatusAutorizacaoWS")
.ele("cabecalho")
.ele("identificacaoTransacao")
.ele("tipoTransacao").txt(dataToXml.type).up()
.ele("sequencialTransacao").txt(dataToXml.seq).up()
.ele("dataRegistroTransacao").txt(dataToXml.date).up()
.ele("horaRegistroTransacao").txt(dataToXml.time).up().up()
.ele("origem")
.ele("identificacaoPrestador")
.ele("codigoPrestadorNaOperadora").txt(dataToXml.codigoOpe).up().up().up()
.ele("destino")
.ele("registroANS").txt(dataToXml.ans).up().up()
.ele("Padrao").txt(dataToXml.version).up().up()
.ele("solicitacaoStatusAutorizacao" )
.ele("identificacaoSolicitacao")
.ele('registroANS').txt(dataToXml.ans2).up()
.ele("numeroGuiaPrestador").txt(dataToXml.numGuia).up().up()
.ele("dadosBeneficiario")
.ele("numeroCarteira").txt(dataToXml.matricula).up()
.ele("atendimentoRN").txt(dataToXml.rn).up()
.ele("nomeBeneficiario").txt(dataToXml.nomeBeneficiario).up().up()
.ele("dadosContratado")
.ele("codigoPrestadorNaOperadora").txt(dataToXml.codigoOpe2).up()
.ele("nomeContratado").txt(dataToXml.nomeContratado).up().up().up()
.ele("hash").txt(hashValue)
.doc()
const xmlString = doc.end({ headless: true, prettyPrint: true });
// console.log(xmlString)
return xmlString
},


XMLELEGIBILIDADE(codigoOpe, matricula,nomeBeneficiario="NomeBeneficiario", nomeContratado="NomeClinica"){

  const sequencial = Math.floor(Math.random() * 10000);  
  const data =  moment().format("yyyy-MM-DD")
  const hora =  moment().format("HH:00:00")
  const version= "3.04.00"
  const ans = "343889"


  const dataToXml = {
    type: "VERIFICA_ELEGIBILIDADE",
    seq: sequencial,
    date: data,
    time : hora,
    codigoOpe,
    ans ,
    version,
    codigoOpe2 : codigoOpe,
    nomeContratado,
    matricula,
    nomeBeneficiario,
  }

  const hashValue =  md5(objToString(dataToXml))
    
  const doc = create()
  .ele(ns1, 'soapenv:Envelope').att({ 'xmlns:ans': ansSchema, 'xmlns:xd': sch})
  .ele(ns1, 'Header').up()
  .ele(ns1, "Body")
  .ele(ansSchema, "pedidoElegibilidadeWS")
  .ele("cabecalho")
  .ele("identificacaoTransacao")
  .ele("tipoTransacao").txt(dataToXml.type).up()
  .ele("sequencialTransacao").txt(dataToXml.seq).up()
  .ele("dataRegistroTransacao").txt(dataToXml.date).up()
  .ele("horaRegistroTransacao").txt(dataToXml.time).up().up()
  .ele("origem")
  .ele("identificacaoPrestador")
  .ele("codigoPrestadorNaOperadora").txt(dataToXml.codigoOpe).up().up().up()
  .ele("destino")
  .ele("registroANS").txt(dataToXml.ans).up().up()
  .ele("Padrao").txt(dataToXml.version).up().up()
  .ele("pedidoElegibilidade" )
  .ele("dadosPrestador")
  .ele("codigoPrestadorNaOperadora").txt(dataToXml.codigoOpe2).up()
  .ele("nomeContratado").txt(dataToXml.nomeContratado).up().up()
  .ele("numeroCarteira").txt(dataToXml.matricula).up()
  .ele("nomeBeneficiario").txt(dataToXml.nomeBeneficiario).up().up()
  .ele("hash").txt(hashValue)
  .doc()
  const xmlString = doc.end({ headless: true, prettyPrint: true });
  // console.log(xmlString)
  return xmlString
}
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
