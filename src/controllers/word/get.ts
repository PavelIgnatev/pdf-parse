import { Request, Response } from "express";
import Zipper from "adm-zip";

export default async (_: Request, res: Response) => {
  const zip = new Zipper();
  const fileName = "documents.zip";
  const fileType = "application/zip";

  try {
    zip.addLocalFile(__dirname + "/../../files/first.docx");
    zip.addLocalFile(__dirname + "/../../files/second.docx");
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
