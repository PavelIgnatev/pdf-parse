// @ts-nocheck
import {
  Document,
  WidthType,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  AlignmentType,
  UnderlineType,
  HeightRule,
  VerticalAlign,
  ShadingType
} from "docx";
import { promises } from "fs";

import { wordParams } from "../shared/types";

const generateFirstWord = async (params: wordParams) => {
  const pageWidth = 4505 * 2;
  const row = (firstText, children) => {
    return new TableRow({
      children: [
        new TableCell({
          shading: {
            type: ShadingType.SOLID,
            color: "f2f2f2",
          },
          children: [
            new Paragraph({
              children: [
                new TextRun({font: "Calibri",
                  text: firstText,
                  bold: true,
                  size: 22,
                  
                }),
              ],
            }),
          ],
          margins: {
            left: 100,
          },
        }),
        new TableCell({
          children: children,
          margins: {
            left: 100,
          },
        }),
      ],
    });
  };
  const paragraph = (text, size, aligment) => {
    return new Paragraph({
      children: [
        new TextRun({font: "Calibri",
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
        new TextRun({font: "Calibri",
          text: text,
          size: size,
          bold: true,
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
      columnWidths: [pageWidth],
      rows: [
        new TableRow({
          children: [
            new TableCell({
              width: {
                size: pageWidth,
                type: WidthType.DXA,
              },
              children: children,
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

  const personalInfoTable = new Table({
    columnWidths: [(pageWidth) / 4, ((pageWidth) / 4) * 3],
    rows: [
      row("Фамилия", [
        new Paragraph({
          children: [
            new TextRun({font: "Calibri",
              text: params.surname,
              size: 22,
            }),
          ],
        }),
      ]),
      row("Имя", [
        new Paragraph({
          children: [
            new TextRun({font: "Calibri",
              text: params.name,
              size: 22,
            }),
          ],
        }),
      ]),
      row("Отчество", [
        new Paragraph({
          children: [
            new TextRun({font: "Calibri",
              text: params.patronymic,
              size: 22,
            }),
          ],
        }),
      ]),
      row("Дата рождения", [
        new Paragraph({
          children: [
            new TextRun({font: "Calibri",
              text: params.dateBirth,
              size: 22,
            }),
          ],
        }),
      ]),
      row("Место рождения", [
        new Paragraph({
          children: [
            new TextRun({font: "Calibri",
              text: params.cityBirth,
              size: 22,
            }),
          ],
        }),
      ]),
      row("Название документа", [
        new Table({
          columnWidths: [pageWidth / 4, pageWidth / 4, pageWidth / 4],
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  
                  borders: {
                    top: {
                      size: 0,
                      color: "FFFFFF",
                    },
                    left: {
                      size: 0,
                      color: "FFFFFF",
                    },
                    bottom: {
                      size: 0,
                      color: "FFFFFF",
                    },
                  },
                  margins: {
                    right: 500,
                    left: 500,
                  },
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({font: "Calibri",
                          text: params.passportType?.replace('гражданина РФ', ''),
                          size: 22,
                        }),
                      ],
                    }),
                  ],
                }),
                new TableCell({
                  shading: {
                    type: ShadingType.SOLID,
                    color: "f2f2f2",
                  },
                  borders: {
                    top: {
                      size: 0,
                      color: "FFFFFF",
                    },
                    left: {
                      size: 0,
                      color: "FFFFFF",
                    },
                    bottom: {
                      size: 0,
                      color: "FFFFFF",
                    },
                  },
                  margins: {
                    right: 100,
                    left: 100,
                  },
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({font: "Calibri",
                          text: `Серия и номер`,
                          bold: true,
                          size: 22,
                        }),
                      ],
                    }),
                  ],
                }),
                new TableCell({
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
                    bottom: {
                      size: 0,
                      color: "FFFFFF",
                    },
                  },
                  margins: {
                    right: 100,
                    left: 100,
                  },
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({font: "Calibri",
                          text: `${params.passportSeries} ${params.passportNumber}`,
                          size: 22,
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ]),
      row("Наименование органа, выдавшего документ", [
        new Paragraph({
          children: [
            new TextRun({font: "Calibri",
              text: params.passportIssuedBy,
              size: 22,
            }),
          ],
        }),
      ]),
      row("Дата выдачи", [
        new Table({
          columnWidths: [pageWidth / 4, pageWidth / 4, pageWidth / 4],
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  borders: {
                    top: {
                      size: 0,
                      color: "FFFFFF",
                    },
                    left: {
                      size: 0,
                      color: "FFFFFF",
                    },
                    bottom: {
                      size: 0,
                      color: "FFFFFF",
                    },
                  },
                  margins: {
                    right: 650,
                    left: 100,
                  },
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({font: "Calibri",
                          text: params.issuePassportDate,
                          size: 22,
                        }),
                      ],
                    }),
                  ],
                }),
                new TableCell({
                  shading: {
                    type: ShadingType.SOLID,
                    color: "f2f2f2",
                  },
                  borders: {
                    top: {
                      size: 0,
                      color: "FFFFFF",
                    },
                    left: {
                      size: 0,
                      color: "FFFFFF",
                    },
                    bottom: {
                      size: 0,
                      color: "FFFFFF",
                    },
                  },
                  margins: {
                    right: 100,
                    left: 100,
                  },
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({font: "Calibri",
                          text: `Код подразделения`,
                          bold: true,
                          size: 22,
                        }),
                      ],
                    }),
                  ],
                }),
                new TableCell({
                  borders: {
                    top: {size: 0, color: "FFFFFF",},
                    left: {size: 0,color: "FFFFFF",},
                    right: {size: 0,color: "FFFFFF",},
                    bottom: {size: 0,color: "FFFFFF",},
                  },
                  margins: {
                    right: 100,
                    left: 100,
                  },
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({font: "Calibri",
                          text: params.codePassportIssuedBy,
                          size: 22,
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ]),
    ],
  });

  const notificationTable = new Table({
    columnWidths:[pageWidth],
    rows:[
      new TableRow({

        children:[
          new TableCell({
            children: [
              new Table({
                columnWidths:[pageWidth/2,pageWidth/2],
                borders: {
                  top: {size: 0, color: "FFFFFF",},
                  left: {size: 0,color: "FFFFFF",},
                  right: {size: 0,color: "FFFFFF",},
                  bottom: {size: 0,color: "FFFFFF",},
                },  
                rows:[
                  new TableRow({
                    height:{
                      value:800,
                      rule:HeightRule.EXACT
                    },
                    children:[
                      new TableCell({
                        children: [paragraphBold("Электронный адрес")],
                        verticalAlign: VerticalAlign.CENTER,
                        margins: {
                          left: 400,
                        },
                        width: {size: pageWidth/2,type: WidthType.DXA},
                        shading: {
                          type: ShadingType.SOLID,
                          color: "f2f2f2",
                        },
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({
                            children:[
                              new TextRun({font: "Calibri",text: "Лично в офисе Бюро",bold: true}),
                              new TextRun({font: "Calibri",text: "(контактная информация для уведомления о готовности ответа)"}),
                            ],
                          }),
                        ],
                        shading: {
                          type: ShadingType.SOLID,
                          color: "f2f2f2",
                        },
                        margins: {
                          left: 340,
                        },
                        verticalAlign: VerticalAlign.BOTTOM,
                        width: {size: pageWidth/2,type: WidthType.DXA}
                      }),
                    ]
                  })
            
                ]
              })
            ],
          }),
        ]
      }),
      new TableRow({
        children:[
          new TableCell({
            children: [
              new Table({
                columnWidths:[pageWidth/2,pageWidth/2],
                borders: {
                  top: {size: 0, color: "FFFFFF",},
                  left: {size: 0,color: "FFFFFF",},
                  right: {size: 0,color: "FFFFFF",},
                  bottom: {size: 0,color: "FFFFFF",},
                },
                rows:[
                  new TableRow({
                    height:{
                      value:450,
                      rule:HeightRule.EXACT
                    },
                    children:[
                      new TableCell({
                        children: [paragraphBold("Email:")],
                        width: {size: pageWidth/2,type: WidthType.DXA},
                        verticalAlign: VerticalAlign.BOTTOM,
                        margins: {
                          left: 100,
                        },
                      }),
                      new TableCell({
                        children: [paragraphBold("Email:")],
                        width: {size: pageWidth/2,type: WidthType.DXA},
                        verticalAlign: VerticalAlign.BOTTOM,
                        margins: {
                          left: 100,
                        },
                      }),
                    ]
                  })
            
                ]
              })
            ],
          }),
        ]
      }),
      new TableRow({
        height:{
          value:450,
          rule:HeightRule.EXACT
        },
        children:[
          new TableCell({
            margins: {
              left: 400,
            },
            children: [
              new Paragraph({
                children:[
                  new TextRun({font: "Calibri",text: "Почтовый адрес ",bold: true}),
                  new TextRun({font: "Calibri",text: "(Внимание! Сроки доставки уточняйте у ФГУП «Почта России»)"}),
                ],
              })
            ],
            width: {size: pageWidth,type: WidthType.DXA},
            verticalAlign: VerticalAlign.BOTTOM,
            shading: {
              type: ShadingType.SOLID,
              color: "f2f2f2",
            },
          }),
        ]
      }),
      new TableRow({
        children:[
          new TableCell({
            children: [
              new Table({
                columnWidths:[pageWidth/2,pageWidth/2],
                borders: {
                  top: {size: 0, color: "FFFFFF",},
                  left: {size: 0,color: "FFFFFF",},
                  right: {size: 0,color: "FFFFFF",},
                  bottom: {size: 0,color: "FFFFFF",},
                },
                rows:[
                  new TableRow({
                    height:{
                      value:450,
                      rule:HeightRule.EXACT
                    },
                    children:[
                      new TableCell({
                        children: [paragraphBold("Индекс")],
                        width: {size: pageWidth/2,type: WidthType.DXA},
                        verticalAlign: VerticalAlign.BOTTOM,
                        margins: {
                          left: 100,
                        },
                      }),
                      new TableCell({
                        children: [paragraphBold("Город")],
                        width: {size: pageWidth/2,type: WidthType.DXA},
                        verticalAlign: VerticalAlign.CENTER,
                        margins: {
                          left: 100,
                        },
                      }),
                    ]
                  })
            
                ]
              })
            ],
          }),
        ]
      }),
      new TableRow({
        children:[
          new TableCell({
            children: [
              new Table({
                columnWidths:[pageWidth/2,pageWidth/2],
                borders: {
                  top: {size: 0, color: "FFFFFF",},
                  left: {size: 0,color: "FFFFFF",},
                  right: {size: 0,color: "FFFFFF",},
                  bottom: {size: 0,color: "FFFFFF",},
                },
                rows:[
                  new TableRow({
                    height:{
                      value:450,
                      rule:HeightRule.EXACT
                    },
                    children:[
                      new TableCell({
                        children: [paragraphBold("Улица")],
                        width: {size: pageWidth/2,type: WidthType.DXA},
                        verticalAlign: VerticalAlign.BOTTOM,
                        margins: {
                          left: 100,
                        },
                      }),
                      new TableCell({
                        children: [paragraphBold("Номер дома")],
                        width: {size: pageWidth/2,type: WidthType.DXA},
                        verticalAlign: VerticalAlign.CENTER,
                        margins: {
                          left: 100,
                        },
                      }),
                    ]
                  })
            
                ]
              })
            ],
          }),
        ]
      }),
      new TableRow({
        children:[
          new TableCell({
            children: [
              new Table({
                columnWidths:[pageWidth/2,pageWidth/2],
                borders: {
                  top: {size: 0, color: "FFFFFF",},
                  left: {size: 0,color: "FFFFFF",},
                  right: {size: 0,color: "FFFFFF",},
                  bottom: {size: 0,color: "FFFFFF",},
                },
                rows:[
                  new TableRow({
                    height:{
                      value:450,
                      rule:HeightRule.EXACT
                    },
                    children:[
                      new TableCell({
                        children: [paragraphBold("Строение")],
                        width: {size: pageWidth/2,type: WidthType.DXA},
                        verticalAlign: VerticalAlign.BOTTOM,
                        margins: {
                          left: 100,
                        },
                      }),
                      new TableCell({
                        children: [paragraphBold("Номер квартиры")],
                        width: {size: pageWidth/2,type: WidthType.DXA},
                        verticalAlign: VerticalAlign.CENTER,
                        margins: {
                          left: 100,
                        },
                      }),
                    ]
                  })
            
                ]
              })
            ],
          }),
        ]
      }),
    ]
  })

  const doc = new Document({
    compatibility: {
    },
    sections: [
      {
        properties: {},
        children: [
          paragraphBold("АО «ОКБ»", 22, AlignmentType.RIGHT),
          rowGap(),
          paragraphBold(
            "Заявление о внесении изменений и (или) дополнений в кредитную историю для физических лиц",
            28,
            AlignmentType.CENTER
          ),
          paragraphBold(
            "(Заполняется печатными буквами)",
            22,
            AlignmentType.CENTER
          ),
          rowGap(),
          paragraph(
            "    В соответствии с Федеральным Законом от 30.12.2004 г. №218-ФЗ «О кредитных историях» прошу провести дополнительную проверку информации, входящей в состав моей кредитной истории.",
            20,
            AlignmentType.LEFT
          ),
          rowGap(),
          new Paragraph({
            children: [
              new TextRun({font: "Calibri",
                text: "Информация, входящая в состав титульной части кредитной истории, указанная на основании ",
                bold: true,
                size: 20,
              }),
              new TextRun({font: "Calibri",
                text: "действующего документа",
                underline: {
                  type: UnderlineType.SINGLE,
                  color: "000000",
                },
                bold: true,
                size: 20,
              }),
              new TextRun({font: "Calibri",
                text: " удостоверяющего личность:",
                bold: true,
                size: 20,
              }),
            ],
            alignment: AlignmentType.LEFT,
          }),
          rowGap(),
          personalInfoTable, // таблица с персональными данными
          rowGap(),
          paragraphBold(
            "Данные верны   ______________________________________________",
            18,
            AlignmentType.RIGHT
          ),
          paragraph(
            "/подпись уполномоченного сотрудника",
            18,
            AlignmentType.RIGHT
          ),
          paragraph(
            "при приеме заявления лично в офисе АО «ОКБ»/",
            18,
            AlignmentType.RIGHT
          ),
          rowGap(),
          new Paragraph({
            children: [
              new TextRun({font: "Calibri",
                text: "Выберите ",
                bold: true,
                size: 22,
              }),
              new TextRun({font: "Calibri",
                text: "один",
                underline: {
                  type: UnderlineType.SINGLE,
                  color: "000000",
                },
                bold: true,
                italics: true,
                size: 22,
              }),
              new TextRun({font: "Calibri",
                text: " из способов получения уведомления о результатах рассмотрения заявления:",
                bold: true,
                size: 22,
              }),
            ],
            alignment: AlignmentType.LEFT,
          }),
          rowGap(),
          notificationTable, // вторая таблица
          rowGap(),
          rowGap(),
          rowGap(),
          rowGap(),
          rowGap(),
          rowGap(),
          rowGap(),
          rowGap(),
          rowGap(),
          rowGap(),
          rowGap(),
          rowGap(),
          rowGap(),
          rowGap(),
          rowGap(),
          paragraph(
            "Прошу внести следующие изменения и/или дополнения в мою кредитную историю, так как в ней содержатся неверные данные:",
            22,
            AlignmentType.LEFT
          ),
          rowGap(),
          paragraphBold(
            "1. Укажите наименование организации, передающей в АО «ОКБ» некорректную информацию",
            22,
            AlignmentType.LEFT
          ),
          paragraphBold(
            "о Вашей кредитной истории, И/ИЛИ наименование организации, совершившей неправомерный запрос Вашей кредитной истории *:",
            22,
            AlignmentType.LEFT
          ),
          rowGap(),
          new Paragraph({
            children:params.resultOKB.split('|').map(el=>
              new TextRun({
                font: "Calibri",
                text: el,
                size: 22,
                underline: {
                  type: UnderlineType.SINGLE,
                },
                break: 1,
              })
            ),
          }),
          paragraphBold(
            "2. Укажите номер кредитного договора (счета), сумму (размер/лимит) кредита и дату выдачи кредита И/ИЛИ дату неправомерного запроса кредитной истории И/ИЛИ номер и дату оспариваемой информации о заявлении и решении (вся необходимая информация указана",
            22,
            AlignmentType.LEFT
          ),
          paragraphBold(
            "в Вашем кредитном отчете АО «ОКБ») *:",
            22,
            AlignmentType.LEFT
          ),
          paragraphBold(
            "(В случае, если договор (запрос или заявка) был оформлен на предыдущий паспорт, то в данном разделе также требуется указать серию, номер и дату выдачи предыдущего паспорта)",
            20,
            AlignmentType.LEFT
          ),
          rowGap(),
          renderLine([new Paragraph("")]),
          renderLine([new Paragraph("")]),
          renderLine([new Paragraph("")]),
          rowGap(),
          paragraphBold(
            "3.Укажите информацию, в отношении которой необходимо провести проверку (что именно",
            22,
            AlignmentType.LEFT
          ),
          paragraphBold(
            "организации необходимо изменить в Вашей кредитной истории) *: ",
            22,
            AlignmentType.LEFT
          ),

          new Paragraph({
            children: [
              new TextRun({font: "Calibri",
                text: "(Если Вы не согласны с указанными в Вашей кредитной истории просрочками, то в заявлении необходимо указать ",
                size: 20,
              }),
              new TextRun({font: "Calibri",
                text: "период или месяц и год каждой просрочки, с которой Вы не согласны, ",
                size: 20,
                bold: true,
              }),
              new TextRun({font: "Calibri",
                text: "на основании кредитного отчета, полученного в АО «ОКБ»)",
                size: 20,
              }),
            ],
            alignment: AlignmentType.LEFT,
          }),
          rowGap(),
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
          renderLine([new Paragraph("")]),
          renderLine([new Paragraph("")]),
          rowGap(),
          rowGap(),
          rowGap(),
          paragraph(
            "Я проинформирован о том, что обновление кредитной истории в оспариваемой части производится только в случае подтверждения источником формирования/пользователем кредитной истории заявления субъекта кредитной истории, в случае не подтверждения – изменения в кредитную историю не вносятся. О результатах рассмотрения указанного заявления бюро кредитных историй обязано в письменной форме сообщить субъекту кредитной истории по истечении 20 рабочих дней (до 01.01.2022 по истечении 30 календарных дней) со дня его получения. Бюро кредитных историй не обязано проводить в дальнейшем проверку ранее оспариваемой, но получившей подтверждение информации, содержащейся в кредитной истории. Результаты рассмотрения заявления субъекта кредитной истории зависят от источника/пользователя кредитной истории. Бюро не вправе вносить изменения в кредитную историю, если информация не подтверждена источником формирования/пользователем кредитной истории. В случае отказа источника формирования/пользователя кредитной истории внести изменения в кредитную историю, субъект кредитной истории вправе обратить в суд к данному источнику формирования/пользователю кредитной истории. В случае если Бюро отказывает в проведении проверки заявления о внесении изменений и (или) дополнений в кредитную историю, субъект кредитной истории вправе обжаловать данный отказ в судебном порядке. ",
            18,
            AlignmentType.LEFT
          ),
          rowGap(),
          paragraphBold(
            "Дата __________                  Подпись __________________________",
            24,
            AlignmentType.LEFT
          ),
          paragraph(
            "      /дата заполнения анкеты/ .                                   /подпись заявителя, не обязательно/",
            16,
            AlignmentType.LEFT
          ),
          rowGap(),
          rowGap(),
          paragraph(
            "* Поля являются обязательными для заполнения. Отсутствие информации, позволяющей идентифицировать конкретное кредитное обязательство/запрос/информацию о заявлении и решении (наименование Источника формирования кредитной истории/Пользователя кредитной истории, номер кредитного договора(счета) кредитного обязательства/дата запроса), а также отсутствие информации об оспариваемых данных, является основанием для отказа в рассмотрении данного заявления. ",
            16,
            AlignmentType.LEFT
          ),
          rowGap(),
        ],
      },
    ],
  });

  await Packer.toBuffer(doc).then(async (buffer) => {
    await promises.writeFile(__dirname + `/../files/ОКБ-${params?.surname ?? ""}-${params?.name ?? ""}-${params?.patronymic ?? ""}.docx`, buffer);
  });
};

export default generateFirstWord;
//
