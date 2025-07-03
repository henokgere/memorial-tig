import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { t } = useTranslation();

  return (
    <header className="bg-[#383C00] text-white py-4 px-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-xl">{t("TMMA")}</div>
        <div className="text-sm font-bold">
          <span className="mr-6">{t("Welcome")}</span>
          <a
            href="https://donateme/donate"
            className="px-6 py-3 shadow ml-6 bg-red-700 hover:bg-red-500 rounded-lg transition text-white font-semibold"
          >
            {t("Donate Now")}
          </a>
        </div>
        {/* <div className="flex space-x-4">
          <Link to="/login" className="text-sm hover:underline">
            {t('login')}
          </Link>
          <Link to="/register" className="text-sm hover:underline">
            {t('register')}
          </Link>
        </div> */}
      </div>
    </header>
  );
}
