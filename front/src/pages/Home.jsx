import HeroSection from '../components/HeroSection';
import HomeVideoPreview from '../components/HomeVideoPreview';
import MemorialGrid from '../components/MemorialGrid';
import MemorialTribute from '../components/MemorialTribute';

export default function Home() {
  return (
    <div className="bg-memorial-dark">
      <HeroSection />
      <MemorialTribute />
      <HomeVideoPreview />
      <MemorialGrid />
    </div>
  );
}