// @ts-nocheck
import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, AlignmentType, UnderlineType } from "docx";
import { promises } from "fs";

import { wordParams } from "../shared/types";

const generateFirstWord = async (params: wordParams) => {

  const personalInfoTable = new Table({
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({
              children: [new TextRun({
                text: `Фамилия`,
                bold: true,
                size: 22
              })]
            })],
          }),
          new TableCell({
            children: [new Paragraph({
              children: [new TextRun({
                text: params.surname,
                size: 22
              })]
            })],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({
              children: [new TextRun({
                text: `Имя`,
                bold: true,
                size: 22
              })]
            })],
          }),
          new TableCell({
            children: [new Paragraph({
              children: [new TextRun({
                text: params.name,
                size: 22
              })]
            })],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({
              children: [new TextRun({
                text: `Отчество`,
                bold: true,
                size: 22
              })]
            })],
          }),
          new TableCell({
            children: [new Paragraph({
              children: [new TextRun({
                text: params.patronymic,
                size: 22
              })]
            })],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({
              children: [new TextRun({
                text: `Дата рождения`,
                bold: true,
                size: 22
              })]
            })],
          }),
          new TableCell({
            children: [new Paragraph({
              children: [new TextRun({
                text: params.dateBirth,
                size: 22

              })]
            })],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({
              children: [new TextRun({
                text: `Место рождения`,
                bold: true,
                size: 22
              })]
            })],
          }),
          new TableCell({
            children: [new Paragraph({
              children: [new TextRun({
                text: params.cityBirth,
                size: 22

              })]
            })],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({
              children: [new TextRun({
                text: `Название документа`,
                bold: true,
                size: 22
              })]
            })],
          }),
          new TableCell({
            children: [new Paragraph({
              children: [new TextRun({
                text: params.passportType,
                size: 22

              })]
            })],
          }),
          new TableCell({
            children: [new Paragraph({
              children: [new TextRun({
                text: `Серия и номер`,
                bold: true,
                size: 22
              })]
            })],
          }),
          new TableCell({
            children: [new Paragraph({
              children: [new TextRun({
                text: `${params.passportSeries} ${params.passportNumber}`,
                size: 22

              })]
            })],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({
              children: [new TextRun({
                text: `Наименование органа, выдавшего документ`,
                bold: true,
                size: 22
              })]
            })],
          }),
          new TableCell({
            children: [new Paragraph({
              children: [new TextRun({
                text: params.passportIssuedBy,
                size: 22
              })]
            })],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({
              children: [new TextRun({
                text: `Дата выдачи`,
                bold: true,
                size: 22
              })]
            })],
          }),
          new TableCell({
            children: [new Paragraph({
              children: [new TextRun({
                text: params.issuePassportDate,
                size: 22

              })]
            })],
          }),
          new TableCell({
            children: [new Paragraph({
              children: [new TextRun({
                text: `Код подразделения`,
                bold: true,
                size: 22
              })]
            })],
          }),
          new TableCell({
            children: [new Paragraph({
              children: [new TextRun({
                text: params.codePassportIssuedBy,
                size: 22

              })]
            })],
          }),
        ],
      }),
    ]
  });

  const notificationTable = new Table({
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({
              children: [new TextRun({
                text: `Электронный адрес`,
                bold: true,
                size: 22
              })]
            })],
          }),
          new TableCell({
            children: [],
          }),
          new TableCell({
            children: [new Paragraph({
              children: [
                new TextRun({
                  text: `Лично в офисе Бюро `,
                  bold: true,
                  size: 22
                }),
                new TextRun({
                  text: `(контактная информация для уведомления о готовности ответа)`,
                  size: 18
                }),
            ]
            })],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({
              children: [new TextRun({
                text: `Email:`,
                bold: true,
                size: 22
              })]
            })],
          }),
          new TableCell({
            children: [new Paragraph({
              children: [new TextRun({
                text: `Email:`,
                bold: true,
                size: 22
              })]
            })],
          }),
        ]
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({
              children: [
                new TextRun({
                  text: `Почтовый адрес `,
                  bold: true,
                  size: 22
                }),
                new TextRun({
                  text: `(Внимание! Сроки доставки уточняйте у ФГУП «Почта России»)`,
                  size: 18
                }),
              ]
            })],
          }),
        ]
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({
              children: [new TextRun({
                text: `Индекс`,
                bold: true,
                size: 22
              })]
            })],
          }),
          new TableCell({
            children: [new Paragraph({
              children: [new TextRun({
                text: `Город`,
                bold: true,
                size: 22
              })]
            })],
          }),
        ]
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({
              children: [new TextRun({
                text: `Улица`,
                bold: true,
                size: 22
              })]
            })],
          }),
          new TableCell({
            children: [new Paragraph({
              children: [new TextRun({
                text: `Номер дома`,
                bold: true,
                size: 22
              })]
            })],
          }),
        ]
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({
              children: [new TextRun({
                text: `Строение`,
                bold: true,
                size: 22
              })]
            })],
          }),
          new TableCell({
            children: [new Paragraph({
              children: [new TextRun({
                text: `Номер квартиры`,
                bold: true,
                size: 22
              })]
            })],
          }),
        ]
      }),
    ]
  })

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [new TextRun({
              text: "АО «ОКБ»",
              bold: true,
              size: 22
            })],
            alignment: AlignmentType.RIGHT,
          }),
          new Paragraph({
            children: [new TextRun({
              text: "Заявление о внесении изменений и (или) дополнений в кредитную историю для физических лиц",
              bold: true,
              size: 28
            })],
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            children: [new TextRun({
              text: "(Заполняется печатными буквами)",
              bold: true,
              size: 22
            })],
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            children: [], // отступ
          }),
          new Paragraph({
            children: [new TextRun({
              text: "В соответствии с Федеральным Законом от 30.12.2004 г. №218-ФЗ «О кредитных историях» прошу провести дополнительную проверку информации, входящей в состав моей кредитной истории.",
              size: 20
            })],
            alignment: AlignmentType.LEFT,
          }),
          new Paragraph({
            children: [], // отступ
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Информация, входящая в состав титульной части кредитной истории, указанная на основании ",
                bold: true,
                size: 20
              }),
              new TextRun({
                text: "действующего документа",
                underline: {
                  type: UnderlineType.SINGLE,
                  color: "000000",
                },
                bold: true,
                size: 20,

              }),
              new TextRun({
                text: " удостоверяющего личность:",
                bold: true,
                size: 20
              }),
            ],
            alignment: AlignmentType.LEFT,
          }),
          new Paragraph({
            children: [], // отступ
          }),
          personalInfoTable, // таблица с персональными данными
          new Paragraph({
            children: [new TextRun({
              text: "Данные верны   ______________________________________________",
              size: 18,
              bold: true
            })],
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "/подпись уполномоченного сотрудника",
                size: 18,
              }),
            ],
            alignment: AlignmentType.RIGHT,
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "при приеме заявления лично в офисе АО «ОКБ»/",
                size: 18,
              }),
            ],
            alignment: AlignmentType.RIGHT,
          }),
          new Paragraph({
            children: [], // отступ
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Выберите ",
                bold: true,
                size: 22
              }),
              new TextRun({
                text: "один",
                underline: {
                  type: UnderlineType.SINGLE,
                  color: "000000",
                },
                bold: true,
                italics: true,
                size: 22,

              }),
              new TextRun({
                text: " из способов получения уведомления о результатах рассмотрения заявления:",
                bold: true,
                size: 22
              }),
            ],
            alignment: AlignmentType.LEFT,
          }),
          new Paragraph({
            children: [], // отступ
          }),
          notificationTable, // вторая таблица
          new Paragraph({
            children: [], // отступ
          }),
          new Paragraph({
            children: [], // отступ
          }),
          new Paragraph({
            children: [], // отступ
          }),
          new Paragraph({
            children: [], // отступ
          }),
          new Paragraph({
            children: [], // отступ
          }),
          new Paragraph({
            children: [], // отступ
          }),
          new Paragraph({
            children: [new TextRun({
              text: "Прошу внести следующие изменения и/или дополнения в мою кредитную историю, так как в ней содержатся неверные данные:",
              size: 22
            })],
            alignment: AlignmentType.LEFT,
          }),
          new Paragraph({
            children: [], // отступ
          }),
          new Paragraph({
            children: [new TextRun({
              text: "1. Укажите наименование организации, передающей в АО «ОКБ» некорректную информацию",
              size: 22,
              bold:true
            })],
            alignment: AlignmentType.LEFT,
          }),
          new Paragraph({
            children: [new TextRun({
              text: "о Вашей кредитной истории, И/ИЛИ наименование организации, совершившей неправомерный запрос Вашей кредитной истории *:",
              size: 22,
              bold:true
            })],
            alignment: AlignmentType.LEFT,
          }),
          new Paragraph({
            children: [], // отступ
          }),
          new Paragraph({
            children: [], // отступ
          }),
          new Paragraph({
            children: [], // отступ
          }),
          new Paragraph({
            children: [], // отступ
          }),
          new Paragraph({
            children: [], // отступ
          }),
          new Paragraph({
            children: [new TextRun({
              text: "2. Укажите номер кредитного договора (счета), сумму (размер/лимит) кредита и дату выдачи кредита И/ИЛИ дату неправомерного запроса кредитной истории И/ИЛИ номер и дату оспариваемой информации о заявлении и решении (вся необходимая информация указана",
              size: 22,
              bold:true
            })],
            alignment: AlignmentType.LEFT,
          }),
          new Paragraph({
            children: [new TextRun({
              text: "в Вашем кредитном отчете АО «ОКБ») *:",
              size: 22,
              bold:true
            })],
            alignment: AlignmentType.LEFT,
          }),
          new Paragraph({
            children: [new TextRun({
              text: "(В случае, если договор (запрос или заявка) был оформлен на предыдущий паспорт, то в данном разделе также требуется указать серию, номер и дату выдачи предыдущего паспорта)",
              size: 20,
            })],
            alignment: AlignmentType.LEFT,
          }),
          new Paragraph({
            children: [], // отступ
          }),
          new Paragraph({
            children: [new TextRun({
              text: "_____________________________________________________________________________________",
              size: 22,
            })],
            alignment: AlignmentType.LEFT,
          }),
          new Paragraph({
            children: [], // отступ
          }),
          new Paragraph({
            children: [], // отступ
          }),
          new Paragraph({
            children: [new TextRun({
              text: "3.Укажите информацию, в отношении которой необходимо провести проверку (что именно",
              size: 22,
              bold:true
            })],
            alignment: AlignmentType.LEFT,
          }),
          new Paragraph({
            children: [new TextRun({
              text: "организации необходимо изменить в Вашей кредитной истории) *: ",
              size: 22,
              bold:true
            })],
            alignment: AlignmentType.LEFT,
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "(Если Вы не согласны с указанными в Вашей кредитной истории просрочками, то в заявлении необходимо указать ",
                size: 20,
              }),
              new TextRun({
                text: "период или месяц и год каждой просрочки, с которой Вы не согласны, ",
                size: 20,
                bold:true,
              }),
              new TextRun({
                text: "на основании кредитного отчета, полученного в АО «ОКБ»)",
                size: 20,
              }),
          ],
            alignment: AlignmentType.LEFT,
          }),
          new Paragraph({
            children: [], // отступ
          }),
          new Paragraph({
            children: [], // отступ
          }),
          new Paragraph({
            children: [], // отступ
          }),
          new Paragraph({
            children: [], // отступ
          }),
          new Paragraph({
            children: [], // отступ
          }),
          new Paragraph({
            children: [], // отступ
          }),
          new Paragraph({
            children: [], // отступ
          }),
          new Paragraph({
            children: [], // отступ
          }),
          new Paragraph({
            children: [], // отступ
          }),
          new Paragraph({
            children: [], // отступ
          }),
          new Paragraph({
            children: [], // отступ
          }),
          new Paragraph({
            children: [], // отступ
          }),
          new Paragraph({
            children: [], // отступ
          }),
          new Paragraph({
            children: [], // отступ
          }),
          new Paragraph({
            children: [new TextRun({
              text: "Я проинформирован о том, что обновление кредитной истории в оспариваемой части производится только в случае подтверждения источником формирования/пользователем кредитной истории заявления субъекта кредитной истории, в случае не подтверждения – изменения в кредитную историю не вносятся. О результатах рассмотрения указанного заявления бюро кредитных историй обязано в письменной форме сообщить субъекту кредитной истории по истечении 20 рабочих дней (до 01.01.2022 по истечении 30 календарных дней) со дня его получения. Бюро кредитных историй не обязано проводить в дальнейшем проверку ранее оспариваемой, но получившей подтверждение информации, содержащейся в кредитной истории. Результаты рассмотрения заявления субъекта кредитной истории зависят от источника/пользователя кредитной истории. Бюро не вправе вносить изменения в кредитную историю, если информация не подтверждена источником формирования/пользователем кредитной истории. В случае отказа источника формирования/пользователя кредитной истории внести изменения в кредитную историю, субъект кредитной истории вправе обратить в суд к данному источнику формирования/пользователю кредитной истории. В случае если Бюро отказывает в проведении проверки заявления о внесении изменений и (или) дополнений в кредитную историю, субъект кредитной истории вправе обжаловать данный отказ в судебном порядке. ",
              size: 18,
            })],
            alignment: AlignmentType.LEFT,
          }),
          new Paragraph({
            children: [], // отступ
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Дата __________                  Подпись ____________________________",
                size: 24,
                bold:true
              }),
            ],
            alignment: AlignmentType.LEFT,
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "      /дата заполнения анкеты/ .                                   /подпись заявителя, не обязательно/",
                size: 16,
              }),
            ],
            alignment: AlignmentType.LEFT,
          }),
          new Paragraph({
            children: [], // отступ
          }),
          new Paragraph({
            children: [], // отступ
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "* Поля являются обязательными для заполнения. Отсутствие информации, позволяющей идентифицировать конкретное кредитное обязательство/запрос/информацию о заявлении и решении (наименование Источника формирования кредитной истории/Пользователя кредитной истории, номер кредитного договора(счета) кредитного обязательства/дата запроса), а также отсутствие информации об оспариваемых данных, является основанием для отказа в рассмотрении данного заявления. ",
                size: 16,
              }),
            ],
            alignment: AlignmentType.LEFT,
          }),
          new Paragraph({
            children: [], // отступ
          }),
        ],
      },
    ],
  });

  await Packer.toBuffer(doc).then(async (buffer) => {
    await promises.writeFile(__dirname + "/../files/second.docx", buffer);
  });
};

export default generateFirstWord;
// 