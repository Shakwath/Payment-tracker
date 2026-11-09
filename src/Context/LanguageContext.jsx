import { createContext, useContext, useState, useEffect } from "react";

export const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [lang, setLangState] = useState(() => {
    return localStorage.getItem("mpt_lang") || "bn";
  });

  const setLang = (newLang) => {
    const normalized = newLang === "en" ? "en" : "bn";
    setLangState(normalized);
    localStorage.setItem("mpt_lang", normalized);
  };

  const toggleLang = () => {
    setLang(lang === "bn" ? "en" : "bn");
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // Helper: t("বাংলা টেক্সট", "English Text")
  const t = (bnText, enText) => {
    return lang === "en" ? enText ?? bnText : bnText;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    return {
      lang: "bn",
      setLang: () => {},
      toggleLang: () => {},
      t: (bn, en) => bn || en,
    };
  }
  return ctx;
};

