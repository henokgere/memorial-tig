import HeroSection from '../components/HeroSection';
import MemorialGrid from '../components/MemorialGrid';
import MemorialTribute from '../components/MemorialTribute';

export default function Home() {
  return (
    <div className="bg-memorial-dark">
      <HeroSection />
      <MemorialTribute />
      <MemorialGrid />
      {/* Additional sections can go here */}
      <section className="py-20 px-4 max-w-6xl mx-auto text-white">
        <h2 className="text-3xl font-bold mb-8 text-center">About This Memorial</h2>
        <p className="text-lg text-center max-w-3xl mx-auto">
          This memorial honors the students and individuals who lost their lives during the 
          Tigray conflict. We remember their dreams, aspirations, and the futures that 
          were tragically cut short.
        </p>
      </section>
    </div>
  );
}