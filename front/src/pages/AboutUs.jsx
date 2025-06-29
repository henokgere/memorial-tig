import { useTranslation } from "react-i18next";

export default function AboutUs() {
  const { t } = useTranslation();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-gray-700 text-3xl md:text-4xl font-bold mb-4">{t("About TMMA")}</h1>
        <div className="w-24 h-1 bg-[#383C00] mx-auto"></div>
      </div>

      {/* Logo and Symbolism Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold mb-4 text-[#383C00]">{t("Our Symbol")}</h2>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-48 h-48 rounded-full border-4 border-[#383C00] flex items-center justify-center bg-gray-100">
            {/* Placeholder for logo - replace with actual logo */}
            <span className="text-4xl">TMMA</span>
          </div>
          <div className="flex-1">
            <p className="text-gray-600 mb-4">
              {t("Our circular logo represents Tigray's history, culture, resilience and civilization. At its center stands a museum honoring martyrs, topped by a key symbol representing Tigray's bright future, flanked by symbols of resilience and civilization.")}
            </p>
          </div>
        </div>
      </div>

      {/* Vision and Mission Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Vision */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-[#383C00]">{t("Our Vision")}</h2>
          <p className="text-gray-600">
            {t("TMMA aspires to be a living and powerful symbol, serving as a long-lasting tribute to the martyrs of Tigray, commemorating their sacrifice and preserving their legacies for future generations, fostering a sense of unity, pride, remembrance, healing, and empowering their families that honors the values and aspirations of those who fought for justice.")}
          </p>
        </div>

        {/* Mission */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-[#383C00]">{t("Our Mission")}</h2>
          <p className="text-gray-600 mb-4">
            {t("To serve as an excellent memorial that honors the fallen heroes and heroines, and a knowledge center for scholarly endeavors by:")}
          </p>
          <ul className="list-disc pl-5 text-gray-600 space-y-2">
            <li>{t("Providing space for reflection and healing")}</li>
            <li>{t("Promoting the legacy of martyrs and Tigray's history")}</li>
            <li>{t("Supporting persons with disabilities, veterans, and families of martyrs")}</li>
            <li>{t("Fostering community and solidarity")}</li>
            <li>{t("Creating a more inclusive society")}</li>
          </ul>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">{t("Our Core Values")}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { 
              title: "Honor and Remembrance", 
              description: "We design memorials that respect and memorialize the lives and legacies of the martyrs and their families."
            },
            { 
              title: "Transparency and Trust", 
              description: "We maintain accountability to beneficiaries, partners, donors, and the community."
            },
            { 
              title: "Impartiality and Fairness", 
              description: "We treat all martyrs, veterans, and their families with equal respect, maintaining neutrality."
            },
            { 
              title: "Equality", 
              description: "We treat all individuals equally regardless of race, ethnicity, political beliefs, or religion."
            },
            { 
              title: "Truth and Integrity", 
              description: "We promote truth in all our partnerships and engagements."
            },
            { 
              title: "Good Governance", 
              description: "We efficiently utilize resources with zero tolerance for wastage or corruption."
            }
          ].map((value, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-lg mb-2 text-[#383C00]">{t(value.title)}</h3>
              <p className="text-gray-700">{t(value.description)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Principles Section */}
      <div className="bg-gray-50 p-8 rounded-lg mb-12">
        <h2 className="text-2xl font-bold text-[#383C00] mb-6 text-center">{t("Guiding Principles")}</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-[#383C00] text-lg mb-3">{t("Participation and Recognition")}</h3>
            <p className="text-gray-700">
              {t("We ensure fair and equal participation, engagement and recognition of all individuals and organizations who contribute to TMMA.")}
            </p>
          </div>
          <div>
            <h3 className="font-bold text-[#383C00] text-lg mb-3">{t("Networks and Partnerships")}</h3>
            <p className="text-gray-700">
              {t("We build sustainable networks with local and international partners who share our vision.")}
            </p>
          </div>
          <div>
            <h3 className="font-bold text-[#383C00] text-lg mb-3">{t("Public Interest")}</h3>
            <p className="text-gray-700">
              {t("Our programs reflect the optimal and sustainable benefit of the public and direct beneficiaries.")}
            </p>
          </div>
          <div>
            <h3 className="font-bold text-[#383C00] text-lg mb-3">{t("Democracy and Human Rights")}</h3>
            <p className="text-gray-700">
              {t("We promote and respect the principles of democracy and humanity in all our operations.")}
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">{t("Our Team")}</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { name: "Yohannes Berhe", role: "Historical Researcher", bio: "Ensuring accurate documentation of history" },
            { name: "Mahlet Gebrekiros", role: "Community Liaison", bio: "Connecting with families of martyrs" },
            { name: "Henok Gebremedhin", role: "Design Director", bio: "Creating meaningful memorial spaces" },
            { name: "Kaleab Enderias", role: "Technology Lead", bio: "Building digital memorial platforms" },
            { name: "Muley Tsegay", role: "Outreach Coordinator", bio: "Engaging with partners and donors" },
            { name: "Tesfay Gebre", role: "Program Manager", bio: "Overseeing charitable initiatives" },
            { name: "Team of Volunteers", role: "Dedicated Support", bio: "Committed to honoring the martyrs" },
            { name: "You", role: "Visitor", bio: "Keeping their memories alive" }
          ].map((member, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm text-center">
              <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>
              <h3 className="font-bold">{member.name}</h3>
              <p className="text-sm text-[#383C00] mb-2">{member.role}</p>
              <p className="text-xs text-gray-600">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold mb-4">{t("Join Our Mission")}</h2>
        <p className="mb-6 max-w-2xl mx-auto text-gray-700">
          {t("Whether by contributing stories, volunteering, or supporting our initiatives, you help honor the sacrifices and build a better future.")}
        </p>
        <button className="px-6 py-2 bg-[#383C00] text-white rounded-md hover:bg-[#2a2d00] transition">
          {t("Get Involved")}
        </button>
      </div>
    </div>
  );
}