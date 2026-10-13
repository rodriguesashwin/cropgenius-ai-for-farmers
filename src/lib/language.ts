import { useEffect, useState } from "react";

export type AppLanguage = "English" | "Kannada" | "Hindi";

const LANGUAGE_STORAGE_KEY = "cropgenius-language-v1";
const LANGUAGE_EVENT = "cropgenius-language-change";

const translations: Record<AppLanguage, Record<string, string>> = {
  English: {
    Dashboard: "Dashboard",
    "Disease Detection": "Disease Detection",
    "Price Prediction": "Price Prediction",
    Weather: "Weather",
    "Market Insights": "Market Insights",
    "Government Schemes": "Government Schemes",
    "Cooperative Services": "Cooperative Services",
    "AI Farmer Assistant": "AI Farmer Assistant",
    Profile: "Profile",
    Settings: "Settings",
    Logout: "Logout",
    Farmer: "Farmer",
    Notifications: "Notifications",
    "Open navigation menu": "Open navigation menu",
    "Toggle sidebar": "Toggle sidebar",
    "Smart Agriculture Platform": "Smart Agriculture Platform",
    "Preferred language": "Preferred language",
    "Save settings": "Save settings",
    Saved: "Saved",
    Reset: "Reset",
    "Local preference preview": "Local preference preview",
    "Language and display": "Language and display",
    "Choose your preferred information format": "Choose your preferred information format",
  },
  Kannada: {
    Dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    "Disease Detection": "ಬೆಳೆ ರೋಗ ಪತ್ತೆ",
    "Price Prediction": "ಬೆಲೆ ಮುನ್ಸೂಚನೆ",
    Weather: "ಹವಾಮಾನ",
    "Market Insights": "ಮಾರುಕಟ್ಟೆ ಮಾಹಿತಿ",
    "Government Schemes": "ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು",
    "Cooperative Services": "ಸಹಕಾರ ಸೇವೆಗಳು",
    "AI Farmer Assistant": "AI ರೈತ ಸಹಾಯಕ",
    Profile: "ಪ್ರೊಫೈಲ್",
    Settings: "ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
    Logout: "ಲಾಗ್‌ಔಟ್",
    Farmer: "ರೈತ",
    Notifications: "ಅಧಿಸೂಚನೆಗಳು",
    "Open navigation menu": "ನ್ಯಾವಿಗೇಶನ್ ಮೆನು ತೆರೆಯಿರಿ",
    "Toggle sidebar": "ಸೈಡ್‌ಬಾರ್ ಬದಲಾಯಿಸಿ",
    "Smart Agriculture Platform": "ಸ್ಮಾರ್ಟ್ ಕೃಷಿ ವೇದಿಕೆ",
    "Preferred language": "ಆದ್ಯತೆಯ ಭಾಷೆ",
    "Save settings": "ಸೆಟ್ಟಿಂಗ್‌ಗಳನ್ನು ಉಳಿಸಿ",
    Saved: "ಉಳಿಸಲಾಗಿದೆ",
    Reset: "ಮರುಹೊಂದಿಸಿ",
    "Local preference preview": "ಸ್ಥಳೀಯ ಆದ್ಯತೆ ಪೂರ್ವವೀಕ್ಷಣೆ",
    "Language and display": "ಭಾಷೆ ಮತ್ತು ಪ್ರದರ್ಶನ",
    "Choose your preferred information format": "ನಿಮಗೆ ಇಷ್ಟವಾದ ಮಾಹಿತಿ ರೂಪವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
  },
  Hindi: {
    Dashboard: "डैशबोर्ड",
    "Disease Detection": "फसल रोग पहचान",
    "Price Prediction": "मूल्य पूर्वानुमान",
    Weather: "मौसम",
    "Market Insights": "बाज़ार जानकारी",
    "Government Schemes": "सरकारी योजनाएँ",
    "Cooperative Services": "सहकारी सेवाएँ",
    "AI Farmer Assistant": "AI किसान सहायक",
    Profile: "प्रोफ़ाइल",
    Settings: "सेटिंग्स",
    Logout: "लॉग आउट",
    Farmer: "किसान",
    Notifications: "सूचनाएँ",
    "Open navigation menu": "नेविगेशन मेनू खोलें",
    "Toggle sidebar": "साइडबार बदलें",
    "Smart Agriculture Platform": "स्मार्ट कृषि मंच",
    "Preferred language": "पसंदीदा भाषा",
    "Save settings": "सेटिंग्स सहेजें",
    Saved: "सहेजा गया",
    Reset: "रीसेट",
    "Local preference preview": "स्थानीय प्राथमिकता पूर्वावलोकन",
    "Language and display": "भाषा और प्रदर्शन",
    "Choose your preferred information format": "अपना पसंदीदा जानकारी प्रारूप चुनें",
  },
};

export function readAppLanguage(): AppLanguage {
  if (typeof window === "undefined") return "English";
  try {
    const value = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (value === "Kannada" || value === "Hindi" || value === "English") return value;
  } catch {
    // Browser storage can be unavailable; fall back to English.
  }
  return "English";
}

export function setAppLanguage(language: AppLanguage) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch {
    // The current page can still use the selected language for this session.
  }
  window.dispatchEvent(new Event(LANGUAGE_EVENT));
}

export function translate(language: AppLanguage, key: string): string {
  return translations[language][key] ?? key;
}

export function useAppLanguage() {
  const [language, setLanguageState] = useState<AppLanguage>("English");

  useEffect(() => {
    const syncLanguage = () => setLanguageState(readAppLanguage());
    syncLanguage();
    window.addEventListener(LANGUAGE_EVENT, syncLanguage);
    window.addEventListener("storage", syncLanguage);
    return () => {
      window.removeEventListener(LANGUAGE_EVENT, syncLanguage);
      window.removeEventListener("storage", syncLanguage);
    };
  }, []);

  return {
    language,
    setLanguage: (next: AppLanguage) => {
      setLanguageState(next);
      setAppLanguage(next);
    },
    t: (key: string) => translate(language, key),
  };
}
