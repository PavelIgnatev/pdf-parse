import b_ from "b_";
import FormPdf from "../../components/FormPdf";

import "./MainPage.scss";

const b = b_.with("main-page");

export const MainPage = () => {
  return (
    <section className={b()}>
      <div className={b("form")}>
        <FormPdf />
      </div>
    </section>
  );
};
