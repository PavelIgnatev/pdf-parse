import { Document, Packer, Paragraph, TextRun } from "docx";
import { promises } from "fs";

import { wordParams } from "../shared/types";

const generateFirstWord = async (params: wordParams) => {
  const { name, surname, patronymic } = params;

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun("Hello World"),
              new TextRun({
                text: surname,
                bold: true,
              }),
              new TextRun({
                text: name,
                bold: true,
              }),
              new TextRun({
                text: patronymic,
                bold: true,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun("Hello World"),
              new TextRun({
                text: surname,
                bold: true,
              }),
              new TextRun({
                text: name,
                bold: true,
              }),
              new TextRun({
                text: patronymic,
                bold: true,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun("Hello World"),
              new TextRun({
                text: surname,
                bold: true,
              }),
              new TextRun({
                text: name,
                bold: true,
              }),
              new TextRun({
                text: patronymic,
                bold: true,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun("Hello World"),
              new TextRun({
                text: surname,
                bold: true,
              }),
              new TextRun({
                text: name,
                bold: true,
              }),
              new TextRun({
                text: patronymic,
                bold: true,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun("Hello World"),
              new TextRun({
                text: surname,
                bold: true,
              }),
              new TextRun({
                text: name,
                bold: true,
              }),
              new TextRun({
                text: patronymic,
                bold: true,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun("Hello World"),
              new TextRun({
                text: surname,
                bold: true,
              }),
              new TextRun({
                text: name,
                bold: true,
              }),
              new TextRun({
                text: patronymic,
                bold: true,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun("Hello World"),
              new TextRun({
                text: surname,
                bold: true,
              }),
              new TextRun({
                text: name,
                bold: true,
              }),
              new TextRun({
                text: patronymic,
                bold: true,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun("Hello World"),
              new TextRun({
                text: surname,
                bold: true,
              }),
              new TextRun({
                text: name,
                bold: true,
              }),
              new TextRun({
                text: patronymic,
                bold: true,
              }),
            ],
          }),

          new Paragraph({
            children: [
              new TextRun("Hello World"),
              new TextRun({
                text: surname,
                bold: true,
              }),
              new TextRun({
                text: name,
                bold: true,
              }),
              new TextRun({
                text: patronymic,
                bold: true,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun("Hello World"),
              new TextRun({
                text: surname,
                bold: true,
              }),
              new TextRun({
                text: name,
                bold: true,
              }),
              new TextRun({
                text: patronymic,
                bold: true,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun("Hello World"),
              new TextRun({
                text: surname,
                bold: true,
              }),
              new TextRun({
                text: name,
                bold: true,
              }),
              new TextRun({
                text: patronymic,
                bold: true,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun("Hello World"),
              new TextRun({
                text: surname,
                bold: true,
              }),
              new TextRun({
                text: name,
                bold: true,
              }),
              new TextRun({
                text: patronymic,
                bold: true,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun("Hello World"),
              new TextRun({
                text: surname,
                bold: true,
              }),
              new TextRun({
                text: name,
                bold: true,
              }),
              new TextRun({
                text: patronymic,
                bold: true,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun("Hello World"),
              new TextRun({
                text: surname,
                bold: true,
              }),
              new TextRun({
                text: name,
                bold: true,
              }),
              new TextRun({
                text: patronymic,
                bold: true,
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
