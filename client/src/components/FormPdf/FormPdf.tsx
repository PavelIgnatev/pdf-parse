import React, { useCallback, useState } from "react";
import b_ from "b_";

import BaseFileInput, { BaseFileInputName } from "../BaseFileInput";
import BaseButton from "../BaseButton";
import api from "../../api";
import { Loader } from "../Loader";

import "./FormPdf.scss";

const b = b_.with("upload-pdf");

export type FormPdfValues = {
  [BaseFileInputName.FIRST]?: Blob;
  [BaseFileInputName.SECOND]?: Blob;
};

const FormPdf = () => {
  const [values, setValues] = useState<FormPdfValues>({});
  const [isLoading, setLoading] = useState(false);
  const [isSubmit, setSubmit] = useState(false);

  const handleClick = useCallback(() => {
    setSubmit(false);
  }, []);

  const handleChange = useCallback((name: BaseFileInputName, value: Blob) => {
    setValues((v) => ({ ...v, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      setSubmit(false);
      setLoading(true);

      api.postFiles(values).then(() => {
        setSubmit(true);
        setLoading(false);
      });
    },
    [values]
  );

  return (
    <form className={b()} onSubmit={handleSubmit}>
      <BaseFileInput
        name={BaseFileInputName.FIRST}
        onChange={handleChange}
        className={b("input")}
      />
      <BaseFileInput
        name={BaseFileInputName.SECOND}
        onChange={handleChange}
        className={b("input")}
      />
      {!isSubmit ? (
        <BaseButton className={b("button")}>
          {!isLoading ? "Отправить" : <Loader />}
        </BaseButton>
      ) : (
        <a href="/api/word" className={b("button")} onClick={handleClick}>
          Скачать файлы
        </a>
      )}
    </form>
  );
};

export default FormPdf;
