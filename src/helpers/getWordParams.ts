import pdfParse from "pdf-parse";

const getWordParams = async (firstFile: Buffer, secondFile: Buffer) => {
  const firstFileParse = (await pdfParse(firstFile)).text.trim().split("\n");
  const secondFileParse = (await pdfParse(secondFile)).text
    .replace(/\s/g, " ")
    .trim()
    .split(" ");


  const chbStart = firstFileParse.findIndex(
    (el) => el === "В данном разделе содержится информация о том, кто и когда запрашивал вашу кредитную историю"
  );

  const chbEnd = firstFileParse.lastIndexOf('ИНФОРМАЦИЯ О ЗАЯВЛЕНИЯХ И РЕШЕНИЯХ');

  let creditHistoryBlock = firstFileParse.splice(chbStart, chbEnd - chbStart)

  const xxx = creditHistoryBlock.findIndex(
    (el) => el === "КО"
  );

  creditHistoryBlock = creditHistoryBlock.splice(xxx, chbEnd - xxx)

  let a = [];
  const creditHistoryBlockBanks = [];

  for (let i = 0; i < creditHistoryBlock.length; i++) {
    if (creditHistoryBlock[i + 1] === 'КО') {
      creditHistoryBlockBanks.push(a)
      a = []
    } else {
      a.push(creditHistoryBlock[i])
    }
  }
  const finalArray: any = {}


  for (let bank of creditHistoryBlockBanks) {
    for (let i = 0; i < bank.length; i++) {
      if (bank[i] === bank[i + 1]) {
        if (!finalArray[bank[1]]) {
          finalArray[bank[1]] = bank[i];
        } else {
          finalArray[bank[1]] += ', ' + bank[i];
        }
      }
    }
  }

  const chaStart = secondFileParse.findIndex(
    (el) => el === "Запросы"
  );
  const chaEnd = secondFileParse.lastIndexOf("Конец");

  let askCredit = secondFileParse.splice(chaStart, chaEnd - chaStart);

  let allBanks: string[] = [];

  askCredit.map((el, index) => {
    if (el === "Сокращ.") {
      let currentIndex = index;
      while (true) {
        if (askCredit[currentIndex] === "") {
          break;
        } else {
          currentIndex++;
        }
      }
      allBanks.push(askCredit.slice(index + 2, (askCredit[currentIndex + 1] === 'Фирмен.наименование:') ? currentIndex : (currentIndex + 3)).join(" "));
    }
  })
  allBanks = allBanks.filter((c, index) => {
    return allBanks.indexOf(c) === index;
  })
  const removeDuplicates = []
  for (let el of allBanks) {
    if (!el.includes("Гос.")) {
      removeDuplicates.push(el);
    }
  }
  const resultNBKI = removeDuplicates.join(", ") + "."

  //@ts-ignore
  const resultOKB = "";
  //@ts-ignore
  Object.keys(finalArray).forEach((el: any) => resultOKB += el + ' - ' + finalArray[el] + '; |');

  const sj = firstFileParse.findIndex(
    (el) => el === "Раздел содержит информацию о персональных данных, которые передают источники о субъекте кредитной истории"
  );
  const di = firstFileParse.findIndex(
    (el) => el === 'Адрес фактического проживания'
  );

  const variousInfo = [...firstFileParse]?.splice(sj, di - sj);

  const fio = variousInfo.findIndex(
    (el) => el === 'ФИО'
  );
  const db = variousInfo.findIndex(
    (el) => el === 'Дата и место рождения'
  );
  const doc = variousInfo.findIndex(
    (el) => el === 'Документ, удостоверяющий личность'
  );
  const adr = variousInfo.findIndex(
    (el) => el === 'Адрес регистрации¹'
  );
  const [surname, name, patronymic] = variousInfo[fio + 1].split(' ');
  let [dateBirth, cityBirth] = variousInfo.splice(db + 1, doc - db - 1).join(' ').split(', ');
  let [passportInfo, passportIssueInfo, codePassportIssuedBy] = variousInfo.splice(doc - 1, adr - doc - 1).join(' ').split(', ');
  const [passportType, _, passportSeries, passportNumber] = passportInfo.split(' ')
  const issuePassportDate = passportIssueInfo.replace('выдан ', '').split(' ')[0]
  const passportIssuedBy = passportIssueInfo.replace('выдан ', '').split(' ').slice(1).join(' ')
  codePassportIssuedBy = codePassportIssuedBy.replace('к/п ', '')

  

  const months = {
    'января': '01',
    'февраля': '02',
    'марта': '03',
    'апреля': '04',
    'мая': '05',
    'июня': '06',
    'июля': '07',
    'августа': '08',
    'сентября': '09',
    'октября': '10',
    'ноября': '11',
    'декабря': '12',
  }
  //@ts-ignore
  dateBirth = dateBirth.split(' ')
  //@ts-ignore
  dateBirth[1] = months[dateBirth[1]]
  //@ts-ignore
  dateBirth = dateBirth.join('.')

  return {
    name: name ?? "",
    surname: surname ?? "",
    patronymic: patronymic ?? "",
    passportType: passportType ?? "",
    dateBirth: dateBirth ?? "",
    cityBirth: cityBirth ?? "",
    passportSeries: passportSeries ?? "",
    passportNumber: passportNumber ?? "",
    passportIssuedBy: passportIssuedBy ?? "",
    codePassportIssuedBy: codePassportIssuedBy ?? "",
    issuePassportDate: issuePassportDate ?? "",
    resultOKB: resultOKB ?? "",
    resultNBKI: resultNBKI ?? "",
  };
};

export default getWordParams;
