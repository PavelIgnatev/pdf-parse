// @ts-nocheck
import { Request, Response } from "express";
import Zipper from "adm-zip";
export default async (_: Request, res: Response) => {
  const zip = new Zipper();
  const fileName = "documents.zip";
  const fileType = "application/zip";
  const params = global?.params;

  try {
    zip.addLocalFile(__dirname + `/../../files/НБКИ-${params?.surname ?? ""}-${params?.name ?? ""}-${params?.patronymic ?? ""}.docx`);
    zip.addLocalFile(__dirname + `/../../files/ОКБ-${params?.surname ?? ""}-${params?.name ?? ""}-${params?.patronymic ?? ""}.docx`);
  } catch (error) {
    console.log(error);
    res.status(400).end({ message: "Not found word files, repeat later" });
  }

  res.writeHead(200, {
    "Content-Disposition": `attachment; filename="${fileName}"`,
    "Content-Type": fileType,
  });

  return res.end(zip.toBuffer());
};
