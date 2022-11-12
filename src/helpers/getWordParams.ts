import pdfParse from "pdf-parse";

const getWordParams = async (firstFile: Buffer, secondFile: Buffer) => {
  const firstFileParse = (await pdfParse(firstFile)).text.trim().split("\n");
  const secondFileParse = (await pdfParse(secondFile)).text
    .replace(/\s/g, " ")
    .trim()
    .split(" ");

  const sj = firstFileParse.findIndex(
    (el) => el === "СУБЪЕКТ КРЕДИТНОЙ ИСТОРИИ"
  );
  const di = firstFileParse.findIndex(
    (el) => el === "Документ, удостоверяющий личностьДата и место рождения"
  );
  const ai = firstFileParse.findIndex(
    (el) => el === "Адрес проживанияАдрес регистрации"
  );

  const variousInfo = firstFileParse?.splice(di + 1, ai - di - 1);
  const v = variousInfo?.[0]
    ?.replace(/,\s*$/, "")
    ?.replace("выдан ", "")
    ?.split(", ");
  const passportInfo = v?.[0];
  const issuePassportDate = v?.[1];
  const passportInfoSplit = passportInfo?.split(" ");
  const vv = passportInfoSplit?.splice(passportInfoSplit.length - 2, 2);
  const passportSeries = vv?.[0];
  const passportNumber = vv?.[1];
  const passportType = passportInfoSplit?.join(" ");
  const vvv = firstFileParse?.[sj === -1 ? -1 : sj + 1]?.split(" ");
  const surname = vvv?.[0];
  const name = vvv?.[1];
  const patronymic = vvv?.[2];
  const vvvv = variousInfo?.[variousInfo?.length - 1]?.split(", ");
  const dateBirth = vvvv?.[0];
  const cityBirth = vvvv?.[1];
  const vvvvv = variousInfo
    ?.splice(1, variousInfo?.length - 2)
    ?.join(" ")
    ?.split(", к/п ");
  const passportIssuedBy = vvvvv?.[0];
  const codePassportIssuedBy = vvvvv?.[1];

  return {
    name: name ?? "",
    surname: surname ?? "",
    patronymic: patronymic ?? "",
    passportType: passportType ?? "",
    issuePassportDate: issuePassportDate ?? "",
    dateBirth: dateBirth ?? "",
    cityBirth: cityBirth ?? "",
    passportSeries: passportSeries ?? "",
    passportNumber: passportNumber ?? "",
    passportIssuedBy: passportIssuedBy ?? "",
    codePassportIssuedBy: codePassportIssuedBy ?? "",
  };
};

export default getWordParams;
