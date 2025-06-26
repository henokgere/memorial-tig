import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function TigrayHistory() {
  const [activePeriod, setActivePeriod] = useState('axum');
  const { t } = useTranslation()

  const historyPeriods = {
    axum: {
      title: "Kingdom of Axum",
      content: (
        <>
          <p className="mb-4">The Axumite Kingdom (100-940 AD) was a powerful ancient civilization centered in Tigray, known for:</p>
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li>One of Africa's earliest coinage systems</li>
            <li>The famous Obelisks of Axum</li>
            <li>Being one of the first Christian kingdoms (4th century AD)</li>
            <li>Controlling trade routes between Africa and Asia</li>
          </ul>
          <p>The legacy of Axum remains central to Tigrayan and Ethiopian identity.</p>
        </>
      ),
      image: "/OSK.jpeg"
    },
    yohanes: {
      title: "Emperor Yohanes IV",
      content: (
        <>
          <p className="mb-4">Yohanes IV (1872-1889) was a Tigrayan emperor who:</p>
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li>United northern Ethiopia against Egyptian expansion</li>
            <li>Defended Ethiopian sovereignty against European colonialism</li>
            <li>Established Mekelle as his capital</li>
            <li>Died heroically at the Battle of Metemma against Mahdist forces</li>
          </ul>
          <p>His leadership preserved Ethiopian independence during the Scramble for Africa.</p>
        </>
      ),
      image: "/OIP.jpeg"
    },
    adwa: {
      title: "Battle of Adwa (1896)",
      content: (
        <>
          <p className="mb-4">The Tigrayan-led victory at Adwa under Emperor Menelik II:</p>
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li>Crushed Italian colonial ambitions</li>
            <li>Marked Africa's first defeat of a European power</li>
            <li>Featured crucial Tigrayan generals like Ras Alula</li>
            <li>Inspired anti-colonial movements worldwide</li>
          </ul>
          <p>This victory preserved Ethiopian sovereignty until 1936.</p>
        </>
      ),
      image: "/adwa.jpeg"
    },
    derg: {
      title: "Derg Period (1974-1991)",
      content: (
        <>
          <p className="mb-4">The communist Derg regime's impact on Tigray:</p>
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li>Imposed harsh land reforms and collectivization</li>
            <li>Triggered the 1983-85 famine that hit Tigray hardest</li>
            <li>Sparked the formation of the TPLF resistance</li>
            <li>Fought brutal counter-insurgency campaigns</li>
          </ul>
          <p>This period radicalized Tigrayan politics and led to armed struggle.</p>
        </>
      ),
      image: "/derg.jpeg"
    },
    war: {
      title: "Tigray War (2020-2022)",
      content: (
        <>
          <p className="mb-4">The devastating conflict featured:</p>
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li>Federal government siege and bombardment of Tigray</li>
            <li>Massacres like those in Axum and Mai Kadra</li>
            <li>Systematic sexual violence as weapon of war</li>
            <li>Deliberate starvation through aid blockades</li>
            <li>Destruction of cultural heritage sites</li>
          </ul>
          <p>The war caused immense suffering with lasting generational trauma.</p>
        </>
      ),
      image: "/tigray.jpeg"
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-gray-700 text-3xl font-bold text-center mb-8">{t("Tigray Through History")}</h1>
      
      {/* Timeline Navigation */}
      <div className="flex overflow-x-auto pb-4 mb-8 scrollbar-hide">
        {Object.keys(historyPeriods).map((period) => (
          <button
            key={period}
            onClick={() => setActivePeriod(period)}
            className={`px-6 py-2 mx-1 rounded-full whitespace-nowrap ${
              activePeriod === period
                ? 'bg-[#383C00] text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {t(historyPeriods[period].title)}
          </button>
        ))}
      </div>

      {/* Content Display */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3">
            <img 
              src={historyPeriods[activePeriod].image} 
              alt={historyPeriods[activePeriod].title}
              className="w-full h-64 md:h-full object-cover"
            />
          </div>
          <div className="p-6 md:w-2/3">
            <h2 className="text-black text-2xl font-bold mb-4">{t(historyPeriods[activePeriod].title)}</h2>
            <div className="text-gray-700 prose max-w-none">
              {historyPeriods[activePeriod].content}
            </div>
          </div>
        </div>
      </div>

      {/* Historical Context */}
      <div className="mt-12 bg-[#505050] p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">{t("Tigray's Enduring Legacy")}</h3>
        <p>
          {t("From the ancient Axumite civilization to its pivotal role in modern Ethiopia, Tigray has been a cradle of African civilization, a bastion of resistance against colonialism, and a center of cultural preservation. Despite recent tragedies, Tigrayans continue drawing strength from their rich history as they rebuild.")}
        </p>
      </div>
    </div>
  );
}