// @ts-nocheck
import {
  Document,
  WidthType,
  BorderStyle,
  Packer,
  Paragraph,
  TextRun,
  PageBreak,
  Table,
  TableRow,
  TableCell,
  AlignmentType,
  UnderlineType,
} from "docx";

import { promises } from "fs";

import { wordParams } from "../shared/types";

const generateFirstWord = async (params: wordParams) => {
  const sizes = 22;
  const paragraph = (text, size, aligment) => {
    return new Paragraph({
      children: [
        new TextRun({
          text: text,

          size: size,
        }),
      ],
      alignment: aligment,
    });
  };

  const paragraphBold = (text, size, aligment) => {
    return new Paragraph({
      children: [
        new TextRun({
          text: text,
          size: size,
          bold: true,
        }),
      ],
      alignment: aligment,
    });
  };

  const paragraphItalic = (text, size, aligment) => {
    return new Paragraph({
      children: [
        new TextRun({
          text: text,
          italics: true,
          size: size,
        }),
      ],
      alignment: aligment,
    });
  };

  const rowGap = () => {
    return new Paragraph({
      children: [],
    });
  };

  const renderLine = (children) =>
    new Table({
      rows: [
        new TableRow({
          children: [
            new TableCell({
              width: {
                size: 4505 * 2,
                type: WidthType.DXA,
              },
              children,
              borders: {
                top: {
                  size: 0,
                  color: "FFFFFF",
                },
                left: {
                  size: 0,
                  color: "FFFFFF",
                },
                right: {
                  size: 0,
                  color: "FFFFFF",
                },
              },
            }),
          ],
        }),
      ],
    });

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          paragraph("Генеральному директору", sizes, AlignmentType.RIGHT),
          paragraph("АО «НБКИ» Викулину А.Ю.", sizes, AlignmentType.RIGHT),
          paragraph(
            "121069, г.Москва, Скатертный пер., д.20, стр.1",
            sizes,
            AlignmentType.RIGHT
          ),
          rowGap(),
          paragraphBold(
            "Форма № ОСП-1ФИЗ утв. 26,03.2018 г.",
            sizes,
            AlignmentType.CENTER
          ),
          paragraphBold(
            "Заявление Субъекта кредитной истории",
            sizes,
            AlignmentType.CENTER
          ),
          paragraphBold(
            "о внесении изменений и/или дополнений в кредитную историю",
            sizes,
            AlignmentType.CENTER
          ),
          rowGap(),
          paragraph("Я,", sizes, AlignmentType.LEFT),
          renderLine([paragraphBold(`${params.surname}`)]),
          paragraphItalic("(фамилия)", sizes, AlignmentType.LEFT),
          rowGap(),
          renderLine([paragraphBold(params.name)]),
          paragraphItalic("(имя)", sizes, AlignmentType.LEFT),
          rowGap(),
          renderLine([paragraphBold(params.patronymic)]),
          paragraphItalic("(отчество)", sizes, AlignmentType.LEFT),
          rowGap(),
          renderLine([
            paragraphBold(`Родился ${params.dateBirth} в ${params.cityBirth}`),
          ]),

          paragraphItalic("(дата и место рождения)", sizes, AlignmentType.LEFT),
          paragraph(
            `  Документ удостоверяющий личность`,
            sizes,
            AlignmentType.LEFT
          ),
          paragraph(
            "  (согласно действующему законодательству)",
            sizes,
            AlignmentType.LEFT
          ),
          rowGap(),
          new Table({
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: {
                      size: 4505 * 2,
                      type: WidthType.DXA,
                    },
                    children: [
                      paragraphBold(params.passportType, sizes, AlignmentType.LEFT),
                    ],
                    borders: {
                      bottom: {
                        size: 0,
                        color: "FFFFFF",
                      },
                      left: {
                        size: 0,
                        color: "FFFFFF",
                      },
                      right: {
                        size: 0,
                        color: "FFFFFF",
                      },
                      top: {
                        size: 0,
                        color: "FFFFFF",
                      },
                    },
                  }),
                  new TableCell({
                    width: {
                      size: 4505 * 2,
                      type: WidthType.DXA,
                    },
                    children: [
                      paragraphBold(
                        params.passportSeries,
                        sizes,
                        AlignmentType.LEFT
                      ),
                    ],
                    borders: {
                      top: {
                        size: 0,
                        color: "FFFFFF",
                      },
                      bottom: {
                        size: 0,
                        color: "FFFFFF",
                      },
                      left: {
                        size: 0,
                        color: "FFFFFF",
                      },
                      right: {
                        size: 0,
                        color: "FFFFFF",
                      },
                    },
                  }),
                  new TableCell({
                    width: {
                      size: 4505 * 2,
                      type: WidthType.DXA,
                    },
                    children: [
                      paragraphBold(
                        params.passportNumber,
                        sizes,
                        AlignmentType.LEFT
                      ),
                    ],
                    borders: {
                      top: {
                        size: 0,
                        color: "FFFFFF",
                      },
                      bottom: {
                        size: 0,
                        color: "FFFFFF",
                      },
                      left: {
                        size: 0,
                        color: "FFFFFF",
                      },
                      right: {
                        size: 0,
                        color: "FFFFFF",
                      },
                    },
                  }),
                ],
              }),
            ],
          }),
          new Table({
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: {
                      size: 4505 * 2,
                      type: WidthType.DXA,
                    },
                    children: [
                      paragraphItalic(
                        "Тип документа",
                        sizes,
                        AlignmentType.LEFT
                      ),
                    ],
                    borders: {
                      bottom: {
                        size: 0,
                        color: "FFFFFF",
                      },
                      left: {
                        size: 0,
                        color: "FFFFFF",
                      },
                      right: {
                        size: 0,
                        color: "FFFFFF",
                      },
                    },
                  }),
                  new TableCell({
                    width: {
                      size: 4505 * 2,
                      type: WidthType.DXA,
                    },
                    children: [
                      paragraphItalic("(серия)", sizes, AlignmentType.LEFT),
                    ],
                    borders: {
                      bottom: {
                        size: 0,
                        color: "FFFFFF",
                      },
                      left: {
                        size: 0,
                        color: "FFFFFF",
                      },
                      right: {
                        size: 0,
                        color: "FFFFFF",
                      },
                    },
                  }),
                  new TableCell({
                    width: {
                      size: 4505 * 2,
                      type: WidthType.DXA,
                    },
                    children: [
                      paragraphItalic("(номер)", sizes, AlignmentType.LEFT),
                    ],
                    borders: {
                      bottom: {
                        size: 0,
                        color: "FFFFFF",
                      },
                      left: {
                        size: 0,
                        color: "FFFFFF",
                      },
                      right: {
                        size: 0,
                        color: "FFFFFF",
                      },
                    },
                  }),
                ],
              }),
            ],
          }),
          rowGap(),
          renderLine([
            paragraphBold(
              `ВЫДАН ${params.passportIssuedBy}, ${params.issuePassportDate}`
            ),
          ]),
          paragraphItalic("(дата и место выдачи)", sizes, AlignmentType.LEFT),
          rowGap(),
          paragraph("и дополнительные данные:", sizes, AlignmentType.LEFT),
          renderLine([new Paragraph("")]),
          paragraphItalic("(адрес регистрации)", sizes, AlignmentType.LEFT),
          renderLine([new Paragraph("")]),
          paragraphItalic("(телефон)", sizes, AlignmentType.LEFT),
          paragraph(
            "прошу внести изменения и/или дополнения в мою кредитную историю.",
            sizes,
            AlignmentType.LEFT
          ),
          rowGap(),
          new Paragraph({
            children: [
              new TextRun({
                text: "Данные требующие внесения изменений и/или дополнений в кредитную историю ",
                size: sizes,
              }),
              new TextRun({
                text: "(укажите, с какой именно информацией в Вашей кредитной истории Вы не согласны)",
                size: sizes,
                italics: true,
              }),
            ],
            alignment: AlignmentType.LEFT,
          }),
          rowGap(),
          new Paragraph({
            children: [
              new TextRun({
                text: "☐ ",
              }),
              new TextRun({
                text: "В кредитной истории содержатся не мои паспортные данные;",
                size: sizes,
              }),
            ],
            alignment: AlignmentType.LEFT,
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "☐ ",
              }),
              new TextRun({
                text: "В личных данных, содержащихся в моей кредитной истории, - фамилия (имя, отчество, дата рождения, место рождения, пол, гражданство, серия или номер паспорт, орган его выдавший, дата выдачи, адрес прописки) - допущена ошибка. ",
                size: sizes,
              }),
              new TextRun({
                text: "(ниже опишите ошибку).",
                size: sizes,
                italics: true,
              }),
            ],
            alignment: AlignmentType.LEFT,
          }),
          renderLine([new Paragraph("")]),
          renderLine([new Paragraph("")]),
          renderLine([new Paragraph("")]),
          renderLine([new Paragraph("")]),
          renderLine([new Paragraph("")]),
          new Paragraph({
            children: [
              new TextRun({
                text: "☐ ",
              }),
              new TextRun({
                text: "В кредитной истории содержатся сведения о том, что банк сделал запрос моей кредитной истории. В данный банк я не обращался, согласия на получение своей кредитной истории я не давал. ",
                size: sizes,
              }),
              new TextRun({
                text: "(ниже опишите ошибку, наименование кредитной организации, выполнивший запрос).",
                size: sizes,
                italics: true,
              }),
            ],
            alignment: AlignmentType.LEFT,
          }),
          renderLine([new Paragraph("")]),
          renderLine([new Paragraph("")]),
          renderLine([new Paragraph("")]),
          renderLine([new Paragraph("")]),
          renderLine([new Paragraph("")]),
          renderLine([new Paragraph("")]),
          new Paragraph({
            children: [
              new TextRun({
                text: "☐ ",
              }),
              new TextRun({
                text: "В кредитной истории содержатся сведения о кредите, согласие на передачу данных о котором я не давал",
                size: sizes,
              }),
            ],
            alignment: AlignmentType.LEFT,
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "☐ ",
              }),
              new TextRun({
                text: "В данных о полученных мною кредитах содержатся ошибки.",
                size: sizes,
              }),
            ],
            alignment: AlignmentType.LEFT,
          }),
          rowGap(),
          paragraphItalic(
            "(Ниже укажите наименование кредитной организации, сумму (размер/лимит) кредита, дату выдачи и/или номер счета (номер счета из кредитной истории) и выберите (опишите) тип ошибки)",
            sizes,
            AlignmentType.LEFT
          ),
          renderLine([new Paragraph("")]),
          renderLine([new Paragraph("")]),
          renderLine([new Paragraph("")]),
          renderLine([new Paragraph("")]),
          renderLine([new Paragraph("")]),
          renderLine([new Paragraph("")]),
          rowGap(),
          new Paragraph({
            children: [
              new TextRun({
                text: "      ◯ ",
              }),
              new TextRun({
                text: "Кредит погашен мною в полном объеме;",
                size: sizes,
              }),
            ],
            alignment: AlignmentType.LEFT,
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "      ◯ ",
              }),
              new TextRun({
                text: "Данные о просрочках указаны неверно. ",
                size: sizes,
              }),
              new TextRun({
                text: "ниже укажите с какими просрочками Вы не согласны, их продолжительность и период.",
                size: sizes,
                italics: true,
              }),
            ],
            alignment: AlignmentType.LEFT,
          }),
          renderLine([new Paragraph("")]),
          renderLine([new Paragraph("")]),
          renderLine([new Paragraph("")]),
          renderLine([new Paragraph("")]),
          rowGap(),
          new Paragraph({
            children: [
              new TextRun({
                text: "      ◯ ",
              }),
              new TextRun({
                text: "В кредитной истории содержатся сведения о кредите, который я не оформлял",
                size: sizes,
              }),
            ],
            alignment: AlignmentType.LEFT,
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "      ◯ ",
              }),
              new TextRun({
                text: "В кредитной истории содержатся две одинаковые записи о кредитах, в действительности кредит один.",
                size: sizes,
              }),
            ],
            alignment: AlignmentType.LEFT,
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "      ◯ ",
              }),
              new TextRun({
                text: "Другое:",
                size: sizes,
              }),
            ],
            alignment: AlignmentType.LEFT,
          }),
          renderLine([new Paragraph("")]),
          renderLine([new Paragraph("")]),
          renderLine([new Paragraph("")]),
          renderLine([new Paragraph("")]),
          renderLine([new Paragraph("")]),
          renderLine([new Paragraph("")]),
          renderLine([new Paragraph("")]),
          renderLine([new Paragraph("")]),
          renderLine([new Paragraph("")]),
          renderLine([new Paragraph("")]),
          paragraph(
            "Прошу сообщить о результате рассмотрения настоящего заявления по следующему почтовому/электронному адресу:",
            sizes,
            AlignmentType.LEFT
          ),
          renderLine([new Paragraph("")]),
          renderLine([new Paragraph("")]),
          renderLine([new Paragraph("")]),
          renderLine([new Paragraph("")]),
          renderLine([new Paragraph("")]),
          paragraph(
            "              Подписывая данное заявление, я даю АО «НБКИ» свое согласие на обработку вышеуказанных персональных данных, а именно: сбор, запись, систематизацию, накопление, хранение, уточнение(обновление, изменение), извлечение, использование, блокирование, удаление, уничтожение персональных данных, в том числе с использованием средств автоматизации. Настоящее согласие дается с целью запроса и выдачи мне кредитной истории и действует 50 дней с момента получения АО «НБКИ» данного заявления.",
            18,
            AlignmentType.LEFT
          ),
          rowGap(),
          new Paragraph({
            children: [
              new TextRun({
                text: "            Настоящее согласие действует на обработку персональных данных, осуществляемую \n",
                size: sizes,
              }),
            ],
            alignment: AlignmentType.LEFT,
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "            без использования средств автоматизации: ",
                size: sizes,
                bold: true,
              }),
              new TextRun({
                text: "☐ ",
                bold: true,
              }),
              new TextRun({
                text: "согласен",
                size: sizes,
                bold: true,
              }),
            ],
            alignment: AlignmentType.LEFT,
          }),
          rowGap(),
          rowGap(),
          new Table({
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: {
                      size: 4505 * 2,
                      type: WidthType.DXA,
                    },
                    children: [
                      paragraphItalic("Дата", sizes, AlignmentType.LEFT),
                    ],
                    borders: {
                      bottom: {
                        size: 0,
                        color: "FFFFFF",
                      },
                      left: {
                        size: 0,
                        color: "FFFFFF",
                      },
                      right: {
                        size: 0,
                        color: "FFFFFF",
                      },
                    },
                  }),
                  new TableCell({
                    width: {
                      size: 4505 * 2,
                      type: WidthType.DXA,
                    },
                    children: [
                      paragraphItalic("Подпись", sizes, AlignmentType.LEFT),
                    ],
                    borders: {
                      bottom: {
                        size: 0,
                        color: "FFFFFF",
                      },
                      left: {
                        size: 0,
                        color: "FFFFFF",
                      },
                      right: {
                        size: 0,
                        color: "FFFFFF",
                      },
                    },
                  }),
                  new TableCell({
                    width: {
                      size: 4505 * 2,
                      type: WidthType.DXA,
                    },
                    children: [
                      paragraphItalic(
                        "Расшифровка подписи",
                        sizes,
                        AlignmentType.LEFT
                      ),
                    ],
                    borders: {
                      bottom: {
                        size: 0,
                        color: "FFFFFF",
                      },
                      left: {
                        size: 0,
                        color: "FFFFFF",
                      },
                      right: {
                        size: 0,
                        color: "FFFFFF",
                      },
                    },
                  }),
                ],
              }),
            ],
          }),
        ],
      },
    ],
  });

  await Packer.toBuffer(doc).then(async (buffer) => {
    await promises.writeFile(__dirname + "/../files/first.docx", buffer);
  });
};

export default generateFirstWord;
