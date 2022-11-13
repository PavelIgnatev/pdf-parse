// @ts-nocheck
import { Document, Packer, Paragraph, TextRun, PageBreak, Table, TableRow, TableCell, AlignmentType, UnderlineType } from "docx";

import { promises } from "fs";

import { wordParams } from "../shared/types";

const generateSecondWord = async (params: wordParams) => {

  const paragraph = (text, size, aligment) => {
    return new Paragraph({
      children: [new TextRun({
        text: text,
        
        size: size
      })],
      alignment: aligment,
    })
  }
  const paragraphUnderline = (text, size, aligment) => {
    return new Paragraph({
      children: [new TextRun({
        text: text,
        underline: {
          type: UnderlineType.SINGLE,
          color: "000000",
        },
        size: size
      })],
      alignment: aligment,
    })
  }

  const paragraphBold = (text, size, aligment) => {
    return new Paragraph({
      children: [new TextRun({
        text: text,
        size: size,
        bold:true,
      })],
      alignment: aligment,
    })
  }

  const paragraphItalic = (text, size, aligment) => {
    return new Paragraph({
      children: [new TextRun({
        text: text,
        italics: true,
        size: size,
      })],
      alignment: aligment,
    })
  }

  const rowGap = () => {
    return new Paragraph({
      children: [],
    })
  }


  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          paragraph("Генеральному директору", 28, AlignmentType.RIGHT),
          paragraph("АО «НБКИ» Викулину А.Ю.", 28, AlignmentType.RIGHT),
          paragraph("121069, г.Москва, Скатертный пер., д.20, стр.1", 28, AlignmentType.RIGHT),
          rowGap(),
          paragraphBold("Форма № ОСП-1ФИЗ утв. 26,03.2018 г.", 28, AlignmentType.CENTER),
          paragraphBold("Заявление Субъекта кредитной истории", 28, AlignmentType.CENTER),
          paragraphBold("о внесении изменений и/или дополнений в кредитную историю", 28, AlignmentType.CENTER),
          rowGap(),
          paragraph("Я,", 28, AlignmentType.LEFT),
          paragraphUnderline(`${params.surname}`, 28, AlignmentType.LEFT),
          paragraphItalic("(фамилия)", 28, AlignmentType.LEFT),
          rowGap(),
          paragraphUnderline(`${params.name}`, 28, AlignmentType.LEFT),
          paragraphItalic("(имя)", 28, AlignmentType.LEFT),
          rowGap(),
          paragraphUnderline(`${params.patronymic}`, 28, AlignmentType.LEFT),
          paragraphItalic("(отчество)", 28, AlignmentType.LEFT),
          paragraphUnderline(`${params.dateBirth}   ${params.cityBirth}`, 28, AlignmentType.LEFT),
          paragraphItalic("(дата и место рождения)", 28, AlignmentType.LEFT),
          paragraph(`Документ удостоверяющий личность` , 28, AlignmentType.LEFT),
          paragraph(" (согласно действующему законодательству)", 28, AlignmentType.LEFT),
          rowGap(),
          paragraphUnderline(`${params.passportType}                          ${params.passportSeries}                                      ${params.passportNumber} `, 28, AlignmentType.LEFT),
          paragraphItalic("Тип документа                                      (серия)                                      (номер)", 28, AlignmentType.LEFT),
          paragraphUnderline(`${params.issuePassportDate}     ${params.passportIssuedBy}` , 28, AlignmentType.LEFT),
          paragraphItalic("(дата и место выдачи)", 28, AlignmentType.LEFT),
          paragraph("___________________________________________________________________________________________________", 28, AlignmentType.CENTER),
          rowGap(),
          paragraph("и дополнительные данные:", 28, AlignmentType.LEFT),
          paragraph("___________________________________________________________________________________________________", 28, AlignmentType.CENTER),
          paragraphItalic("(адрес регистрации)", 28, AlignmentType.LEFT),
          paragraph("___________________________________________________________________________________________________", 28, AlignmentType.CENTER),
          paragraphItalic("(телефон)", 28, AlignmentType.LEFT),
          paragraph("прошу внести изменения и/или дополнения в мою кредитную историю.", 28, AlignmentType.LEFT),
          rowGap(),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Данные требующие внесения изменений и/или дополнений в кредитную историю ',
                size: 28,
              }),
              new TextRun({
                text: '(укажите, с какой именно информацией в Вашей кредитной истории Вы не согласны)',
                size: 28,
                italics:true
              }),
            ],
            alignment: AlignmentType.LEFT,
          }),
          rowGap(),
          new Paragraph({
            children: [
              new TextRun({
                text: '☐ ',
                size: 46,
              }),
              new TextRun({
                text: 'В кредитной истории содержатся не мои паспортные данные;',
                size: 28,
              }),
            ],
            alignment: AlignmentType.LEFT,
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: '☐ ',
                size: 46,
              }),
              new TextRun({
                text: 'В личных данных, содержащихся в моей кредитной истории, - фамилия (имя, отчество, дата рождения, место рождения, пол, гражданство, серия или номер паспорт, орган его выдавший, дата выдачи, адрес прописки) - допущена ошибка. ',
                size: 28,
              }),
              new TextRun({
                text: '(ниже опишите ошибку).',
                size: 28,
                italics:true
              }),
            ],
            alignment: AlignmentType.LEFT,
          }),
          paragraph("___________________________________________________________________________________________________", 28, AlignmentType.CENTER),
          paragraph("___________________________________________________________________________________________________", 28, AlignmentType.CENTER),
          paragraph("___________________________________________________________________________________________________", 28, AlignmentType.CENTER),
          paragraph("___________________________________________________________________________________________________", 28, AlignmentType.CENTER),
          paragraph("___________________________________________________________________________________________________", 28, AlignmentType.CENTER),
          new Paragraph({
            children: [
              new TextRun({
                text: '☐ ',
                size: 46,
              }),
              new TextRun({
                text: 'В кредитной истории содержатся сведения о том, что банк сделал запрос моей кредитной истории. В данный банк я не обращался, согласия на получение своей кредитной истории я не давал. ',
                size: 28,
              }),
              new TextRun({
                text: '(ниже опишите ошибку, наименование кредитной организации, выполнивший запрос).',
                size: 28,
                italics:true
              }),
            ],
            alignment: AlignmentType.LEFT,
          }),
          paragraph("___________________________________________________________________________________________________", 28, AlignmentType.CENTER),
          paragraph("___________________________________________________________________________________________________", 28, AlignmentType.CENTER),
          paragraph("___________________________________________________________________________________________________", 28, AlignmentType.CENTER),
          paragraph("___________________________________________________________________________________________________", 28, AlignmentType.CENTER),
          paragraph("___________________________________________________________________________________________________", 28, AlignmentType.CENTER),
          paragraph("___________________________________________________________________________________________________", 28, AlignmentType.CENTER),
          new PageBreak(),
          new Paragraph({
            children: [
              new TextRun({
                text: '☐ ',
                size: 46,
              }),
              new TextRun({
                text: 'В кредитной истории содержатся сведения о кредите, согласие на передачу данных о котором я не давал',
                size: 28,
              }),
            ],
            alignment: AlignmentType.LEFT,
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: '☐ ',
                size: 46,
              }),
              new TextRun({
                text: 'В данных о полученных мною кредитах содержатся ошибки.',
                size: 28,
              }),
            ],
            alignment: AlignmentType.LEFT,
          }),
          paragraphItalic("(Ниже укажите наименование кредитной организации, сумму (размер/лимит) кредита, дату выдачи и/или номер счета (номер счета из кредитной истории) и выберите (опишите) тип ошибки)", 28, AlignmentType.LEFT),
          paragraph("___________________________________________________________________________________________________", 28, AlignmentType.CENTER),
          paragraph("___________________________________________________________________________________________________", 28, AlignmentType.CENTER),
          paragraph("___________________________________________________________________________________________________", 28, AlignmentType.CENTER),
          paragraph("___________________________________________________________________________________________________", 28, AlignmentType.CENTER),
          paragraph("___________________________________________________________________________________________________", 28, AlignmentType.CENTER),
          paragraph("___________________________________________________________________________________________________", 28, AlignmentType.CENTER),
          new Paragraph({
            children: [
              new TextRun({
                text: '     ◯ ',
                size: 42,
              }),
              new TextRun({
                text: "Кредит погашен мною в полном объеме;",
                size: 28,
              }),
            ],
            alignment: AlignmentType.LEFT,
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: '     ◯ ',
                size: 40,
              }),
              new TextRun({
                text: "Данные о просрочках указаны неверно. ",
                size: 28,
              }),
              new TextRun({
                text: "ниже укажите с какими просрочками Вы не согласны, их продолжительность и период.",
                size: 28,
                italics:true
              }),
            ],
            alignment: AlignmentType.LEFT,
          }),
          paragraph("___________________________________________________________________________________________________", 28, AlignmentType.CENTER),
          paragraph("___________________________________________________________________________________________________", 28, AlignmentType.CENTER),
          paragraph("___________________________________________________________________________________________________", 28, AlignmentType.CENTER),
          paragraph("___________________________________________________________________________________________________", 28, AlignmentType.CENTER),
          new Paragraph({
            children: [
              new TextRun({
                text: '     ◯ ',
                size: 42,
              }),
              new TextRun({
                text: "В кредитной истории содержатся сведения о кредите, который я не оформлял",
                size: 28,
              }),
            ],
            alignment: AlignmentType.LEFT,
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: '     ◯ ',
                size: 42,
              }),
              new TextRun({
                text: "В кредитной истории содержатся две одинаковые записи о кредитах, в действительности кредит один.",
                size: 28,
              }),
            ],
            alignment: AlignmentType.LEFT,
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: '     ◯ ',
                size: 42,
              }),
              new TextRun({
                text: "Другое:",
                size: 28,
              }),
            ],
            alignment: AlignmentType.LEFT,
          }),
          paragraph("___________________________________________________________________________________________________", 28, AlignmentType.CENTER),
          paragraph("___________________________________________________________________________________________________", 28, AlignmentType.CENTER),
          paragraph("___________________________________________________________________________________________________", 28, AlignmentType.CENTER),
          paragraph("___________________________________________________________________________________________________", 28, AlignmentType.CENTER),
          paragraph("___________________________________________________________________________________________________", 28, AlignmentType.CENTER),
          paragraph("___________________________________________________________________________________________________", 28, AlignmentType.CENTER),
          paragraph("___________________________________________________________________________________________________", 28, AlignmentType.CENTER),
          paragraph("___________________________________________________________________________________________________", 28, AlignmentType.CENTER),
          paragraph("___________________________________________________________________________________________________", 28, AlignmentType.CENTER),
          paragraph("___________________________________________________________________________________________________", 28, AlignmentType.CENTER),
          paragraph("Прошу сообщить о результате рассмотрения настоящего заявления по следующему почтовому/электронному адресу:", 28, AlignmentType.LEFT),
          paragraph("___________________________________________________________________________________________________", 28, AlignmentType.CENTER),
          paragraph("___________________________________________________________________________________________________", 28, AlignmentType.CENTER),
          paragraph("___________________________________________________________________________________________________", 28, AlignmentType.CENTER),
          paragraph("     Подписывая данное заявление, я даю АО «НБКИ» свое согласие на обработку вышеуказанных персональных данных, а именно: сбор, запись, систематизацию, накопление, хранение, уточнение(обновление, изменение), извлечение, использование, блокирование, удаление, уничтожение персональных данных, в том числе с использованием средств автоматизации. Настоящее согласие дается с целью запроса и выдачи мне кредитной истории и действует 50 дней с момента получения АО «НБКИ» данного заявления.", 24, AlignmentType.LEFT),
          rowGap(),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Настоящее согласие действует на обработку персональных данных, осуществляемую ',
                size: 28,
              }),
              new TextRun({
                text: "без использования средств автоматизации: ",
                size: 28,
                bold:true
              }),
              new TextRun({
                text: "☐ ",
                size: 46,
                bold:true
              }),
              new TextRun({
                text: "согласен",
                size: 28,
                bold:true
              }),
            ],
            alignment: AlignmentType.LEFT,
          }),
          rowGap(),
          paragraph("___________________________________________________________________________________________________", 28, AlignmentType.CENTER),
          paragraphItalic("Дата                                                                   Подпись                                             Расшифровка подписи", 28, AlignmentType.CENTER),

        ],
      },
    ],
  });

  await Packer.toBuffer(doc).then(async (buffer) => {
    await promises.writeFile(__dirname + "/../files/first.docx", buffer);
  });
};

export default generateSecondWord;
