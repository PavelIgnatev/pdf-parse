import { FormPdfValues } from "./../components/FormPdf/FormPdf";
import axios from "axios";

class Api {
  async get<T>(url: string, params?: any) {
    let fullUrl: string = url;
    if (params) {
      fullUrl += "?" + new URLSearchParams(params).toString();
    }
    return (await axios(fullUrl))?.data as T;
  }

  async postFiles(values: FormPdfValues) {
    const formData = new FormData();

    formData.append("first", values?.first ?? "");
    formData.append("second", values?.second ?? "");

    return await axios({
      method: "post",
      url: "/api/pdf",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
}

export default new Api();
