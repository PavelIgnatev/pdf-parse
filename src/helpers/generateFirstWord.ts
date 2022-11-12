// @ts-nocheck
import { Document, Packer, Paragraph, TextRun } from "docx";
import { promises } from "fs";

import { wordParams } from "../shared/types";

const generateFirstWord = async (params: wordParams) => {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: Object.keys(params).map(
          (el) =>
            new Paragraph({
              children: [
                new TextRun({
                  text: `${el}: ${params?.[el]}`,
                  bold: true,
                }),
              ],
            })
        ),
      },
    ],
  });

  await Packer.toBuffer(doc).then(async (buffer) => {
    await promises.writeFile(__dirname + "/../files/first.docx", buffer);
  });
};

export default generateFirstWord;
