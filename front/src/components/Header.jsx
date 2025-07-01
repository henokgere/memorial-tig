import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Header() {
  const { t } = useTranslation();

  return (
    <header className="bg-[#383C00] text-white py-4 px-14">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-xl">
          {t('TMMA')}
        </div>
        <div className="text-sm font-bold">
          {t('Welcome')}
          <a
            href="https://donateme/donate"
            className="mx-3 px-6 py-3 shadow bg-[#d8d7d7] hover:bg-[#ebebeb] rounded-lg transition text-gray-600 font-semibold"
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