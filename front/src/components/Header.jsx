import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { t } = useTranslation();

  return (
    <header className="bg-[#D62828] text-white shadow-md py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to={'/'} className="flex gap-2 text-2xl font-bold tracking-wide text-yellow-300">
          <img src="/vite.png" width={60} alt="" className="border-r-16" />
          {t("TMMA")}
        </Link>

        <div className="flex items-center space-x-6 text-sm font-medium">
          <span>{t("Welcome")}</span>
          <a
            href="https://donateme/donate"
            className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-[#4B0000] font-semibold rounded-md transition duration-200 shadow-md"
          >
            {t("Donate Now")}
          </a>
        </div>
      </div>
    </header>
  );
}
