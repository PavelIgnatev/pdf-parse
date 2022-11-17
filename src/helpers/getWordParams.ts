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
  const ti = firstFileParse.lastIndexOf('Дата запросаИНН и ОГРН(ОГРНИП)Полное наименование пользователяСокращенное наименование');
  const tr = firstFileParse.lastIndexOf('Дата заявленияТип решенияТип кредитаИсточникNo');
  
  const chaStart = secondFileParse.findIndex(
    (el) => el === "Запросы"
  );
  const chaEnd = secondFileParse.lastIndexOf("Конец");

  let askCredit = secondFileParse.splice(chaStart, chaEnd-chaStart);

  let allBanks:string[] = [];

  askCredit.map((el,index) => {
    if(el === "Сокращ.") {
      let currentIndex = index;
      while(true) {
        if(askCredit[currentIndex]==="") {
          break;
        } else {
          currentIndex++;
        }
      }
      allBanks.push(askCredit.slice(index+2,(askCredit[currentIndex+1] === 'Фирмен.наименование:')? currentIndex : (currentIndex+3)).join(" "));
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
  const resultNBKI = removeDuplicates.join(", ")+"."

  const bankArray = [...firstFileParse].splice(ti+3,tr-ti-5)
  let currentIndex = 0;
  const finalArray = {}
  bankArray.slice(1,bankArray.length-1).forEach((el,index)=>{
    if(el.includes('ИНН')) {
      const creditHistoryInfo = [...bankArray].splice(currentIndex,index-currentIndex+1).filter((el)=>el.split(' ').length > 1 && !el.includes("Отчет")).map((el)=>{
        return el.replace('АКЦИОНЕРНОЕ ОБЩЕСТВО ОТП БАНК', "").replace('АКЦИОНЕРНОЕ ОБЩЕСТВО РН БАНК', '')
      })
      const info = creditHistoryInfo[0].split(' ');
      if (info.length > 3) {
        //@ts-ignore
        finalArray[info.slice(2).join(' ').replace(/[0-9]/g, '')] =(finalArray[info.slice(2).join(' ').replace(/[0-9]/g, '')]??[]).concat(info[0].replace('ИНН:', ''))
      }
      else {
        //@ts-ignore
        finalArray[creditHistoryInfo[creditHistoryInfo.length-1].replace(/[0-9]/g, '')] =(finalArray[creditHistoryInfo[creditHistoryInfo.length-1].replace(/[0-9]/g, '')]??[]).concat(creditHistoryInfo[0].split(' ')[0].replace('ИНН:', '')) 
      }
      currentIndex=index+1

    }
  })
  //@ts-ignore
  Object.keys(finalArray).forEach((el:any)=>finalArray[el] = finalArray[el].join(', '));
  const resultOKB = "";
  //@ts-ignore
  Object.keys(finalArray).forEach((el:any)=>resultOKB += el+ ' - ' + finalArray[el]+'; |');

  const variousInfo = [...firstFileParse]?.splice(di + 1, ai - di - 1);
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
    resultOKB:resultOKB ?? "",
    resultNBKI:resultNBKI ?? "",
  };
};

export default getWordParams;
