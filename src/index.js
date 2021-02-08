const { create,fragment} = require("xmlbuilder2")
const md5  = require("md5")

const ns1 = 'http://schemas.xmlsoap.org/soap/envelope/'
const xsi = 'http://www.unimedbh.com.br/ws/tipos'
const sch = "http://www.unimedbh.com.br/schemas"
const sch1 = "http://www.ans.gov.br/padroes/tiss/schemas"


const type  = "SOLIC_AUTORIZACAO_DISPONIVEL"

const doc = create()
  .ele(ns1, 'soapenv:Envelope').att({ 'xmlns:tip': xsi, 'xmlns:sch': sch, 'xmlns:sch1': sch1 })
  .ele(ns1, 'Header').up()
  .ele(ns1, "Body")
  .ele(xsi, "consultaSolicitacao")
  .ele("" ,"cabecalho")
  .ele(sch, "identificacaoTransacao")
  .ele("tipoTransacao").txt(type).up()
  .ele("sequencialTransacao").txt(1).up()
  .ele("dataRegistroTransacao").txt("23").up()
  .ele("horaRegistroTransacao").txt("34").up().up()
  .ele(sch,"origem")
  .ele("codigoPrestadorNaOperadora")
  .ele(sch1, "codigoPrestadorNaOperadora").txt(122).up().up().up()
  .ele(sch, "destino")
  .ele("registroANS").txt(343889).up().up()
  .ele(sch, "Padrao").txt("3.04.00").up()
  .ele(sch,"identificacaoSoftwareGerador")
  .ele(sch1,"nomeAplicativo").up()
  .ele("versaoAplicativo").up()
  .ele("fabricanteAplicativo").up().up().up()
  .ele('', "consultaSolicitacoesDisponiveis" )
  .ele(sch, "identificacaoBeneficiario")
  .ele(sch1,"numeroCarteira").txt().up()
  .ele("nomeBeneficiario").txt().up()
  .ele("nomePlano").txt().up().up()
  .ele(sch, "profissionalSolicitante")
  .ele(sch1, "identificacao")
  .ele("codigoPrestadorNaOperadora").txt().up().up()
  .ele("nomeContratado").txt().up().up().up()
  .ele('', "hash")
  const hash = fragment().txt(md5(doc));
  doc.import(hash)
  .doc()
  


const xmlString = doc.end({ headless: true, prettyPrint: true });

console.log(xmlString, md5(doc));