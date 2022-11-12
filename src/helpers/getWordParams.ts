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

  const [passportInfo, issuePassportDate] = variousInfo?.[0]
    ?.replace(/,\s*$/, "")
    ?.replace("выдан ", "")
    ?.split(", ");

  const passportInfoSplit = passportInfo?.split(" ");
  const passportType = passportInfoSplit?.join(" ");
  const [passportSeries, passportNumber] = passportInfoSplit?.splice(
    passportInfoSplit.length - 2,
    2
  );
  const [surname, name, patronymic] = firstFileParse?.[sj + 1]?.split(" ");
  const [dateBirth, cityBirth] =
    variousInfo[variousInfo.length - 1]?.split(", ");
  const [passportIssuedBy, codePassportIssuedBy] = variousInfo
    ?.splice(1, variousInfo.length - 2)
    ?.join(" ")
    ?.split(", к/п ");

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
