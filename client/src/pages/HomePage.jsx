import HeroSection from '../components/HeroSection';
import CategorySection from '../components/CategorySection';
import EventsSection from '../components/EventsSection';
import WhyChooseSection from '../components/WhyChooseSection';

const HomePage = () => {
    return (
        <main className="font-inriaSans italic bg-gray-50">
            <HeroSection />
            <CategorySection />
            <EventsSection />
            <WhyChooseSection />
        </main>
    );
};

export default HomePage;
