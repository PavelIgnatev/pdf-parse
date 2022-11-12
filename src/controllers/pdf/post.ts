// @ts-nocheck
import { Request, Response } from "express";

import generateFirstWord from "../../helpers/generateFirstWord";
import generateSecondWord from "../../helpers/generateSecondWord";
import getWordParams from "../../helpers/getWordParams";

export default async (req: Request, res: Response) => {
  const firstFile = req.files?.first;
  const secondFile = req.files?.second;

  if (!req.files || !firstFile || !secondFile) {
    return res.status(400).end();
  }

  const params = await getWordParams(firstFile, secondFile);

  console.log(params);

  await generateFirstWord(params);
  await generateSecondWord(params);

  return res.status(200).send({ firstFile, secondFile });
};
