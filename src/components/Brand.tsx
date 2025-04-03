import * as React from "react";
import logo from "../../public/images/logo.svg";
import { type Locale, useTranslations } from "../utils/i18n";

export function Brand({ locale }: { locale: Locale }) {
  const t = useTranslations(locale);

  return (
    <div className="flex mb-5 gap-5">
      <img alt="Logo" src={logo.src} className="w-16 object-cover hidden lg:block" />
      <div>
        <h1 className="text-4xl font-bold">
          <span className="font-normal text-stiftung-200">Pfadiheim-</span>Fibel
        </h1>
        <p className="italic">
          Ein Tool der{" "}
          <a className="underline" href="https://www.stiftung-pfadiheime.ch/de">
            Stiftung Pfadiheime Schweiz
          </a>
        </p>
      </div>
    </div>
  );
}
