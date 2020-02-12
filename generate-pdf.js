var fonts = {
  Roboto: {
    normal: 'fonts/Roboto-Regular.ttf',
    bold: 'fonts/Roboto-Medium.ttf',
    italics: 'fonts/Roboto-Italic.ttf',
    bolditalics: 'fonts/Roboto-MediumItalic.ttf'
  }
};

function cm2pt (cm) {
  var pointRatio = 2.8346456692913384;
  return cm*10*pointRatio
}

const fs = require('fs');
// const jsPDF = require('jspdf/dist/jspdf.node.min');
const words = JSON.parse(fs.readFileSync("words.json")).words;
var PdfPrinter = require('pdfmake');
var printer = new PdfPrinter(fonts);
const lang = ['pl','en','es','fr','de','hu'];
// const langCodes = ['pl','en-us','es','fr','de','hu'];


// Default export is a4 paper, portrait, using milimeters for units
// var doc = new jsPDF({
//   unit:'cm',
//   orientation:'l'
// });
// doc.setFontSize(12);
// for(let i=0; i<5; i++){
//   for(let j=0; j<5; j++){
//     doc.setLanguage('pl-pl');
//     doc.text(words[i][lang[j]], 3+(i*6), 2.1+(j*4.2), {align:'center'});
//   }
//}

var docDefinition = {
  content:[
    {
      table:{
        widths:['*','*','*','*','*'],
        heights:function(row){return cm2pt(4.2)},
        body:[],
      },
      paddingLeft: function(i, node) { return 0; },
      paddingRight: function(i, node) { return 0; },
      paddingTop: function(i, node) { return 0; },
      paddingBottom: function(i, node) { return 0; },
      layout: 'noBorders'
    }
  ],
  styles:{
    word: {
      alignment: 'left',
      fontSize: 12
    }
  },
  pageOrientation: 'landscape',
  pageMargins: [ 0,0,0,0 ],
};
for(let i=0; i<5; i++) {
  docDefinition.content[0].table.body.push([]);
  for (let j = 0; j < 5; j++) {
    docDefinition.content[0].table.body[i].push({
      text:words[i][lang[j]],
      alignment: 'center',
      fontSize: 12,
      margin:[0,41.7,0,0]
    });
    // docDefinition.content.push({
    //   text:words[i][lang[j]],
    //   absolutePosition:{
    //     x:(3 + (i * 16))*10,
    //     y:(2.1 + (j * 4.2))*10
    //   },
    //   style:'word'
    // });
  }
}

var pdfDoc = printer.createPdfKitDocument(docDefinition, {});
pdfDoc.pipe(fs.createWriteStream('output.pdf'));
pdfDoc.end();
// doc.save('a4.pdf')

delete global.window;
delete global.navigator;
delete global.btoa;