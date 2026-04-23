import React, { Suspense } from 'react';
import { LazySection } from '../components/LazySection';

// Static imports for above-the-fold content
import Hero from '../components/sections/Hero';

// Lazy imports for below-the-fold content
const Features = React.lazy(() => import('../components/sections/Features'));
const Solutions = React.lazy(() => import('../components/sections/Solutions'));
const LCDScreens = React.lazy(() => import('../components/sections/LCDScreens'));
const LEDScreens = React.lazy(() => import('../components/sections/LEDScreens'));
const CaseStudies = React.lazy(() => import('../components/sections/CaseStudies'));
const HowItWorks = React.lazy(() => import('../components/sections/HowItWorks'));
const USP = React.lazy(() => import('../components/sections/USP'));
const Pricing = React.lazy(() => import('../components/sections/Pricing'));
const CTA = React.lazy(() => import('../components/sections/CTA'));
const Testimonials = React.lazy(() => import('../components/sections/Testimonials'));
const Contact = React.lazy(() => import('../components/sections/Contact'));

const FallbackSkeleton = () => (
  <div className="h-64 w-full animate-pulse bg-brand-50/20 rounded-[40px] my-8 max-w-7xl mx-auto" />
);

const Home = () => {
  const handleNavigate = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main>
      <Hero onNavigate={handleNavigate} />

      <LazySection id="features">
        <Suspense fallback={<FallbackSkeleton />}>
          <Features />
        </Suspense>
      </LazySection>

      <LazySection id="solutions">
        <Suspense fallback={<FallbackSkeleton />}>
          <Solutions onNavigate={handleNavigate} />
        </Suspense>
      </LazySection>

      <LazySection id="lcd-screens">
        <Suspense fallback={<FallbackSkeleton />}>
          <LCDScreens />
        </Suspense>
      </LazySection>

      <LazySection id="led-screens">
        <Suspense fallback={<FallbackSkeleton />}>
          <LEDScreens />
        </Suspense>
      </LazySection>

      <LazySection id="case-studies">
        <Suspense fallback={<FallbackSkeleton />}>
          <CaseStudies onProjectClick={() => {}} />
        </Suspense>
      </LazySection>

      <LazySection id="how-it-works">
        <Suspense fallback={<FallbackSkeleton />}>
          <HowItWorks />
        </Suspense>
      </LazySection>

      <LazySection id="usp">
        <Suspense fallback={<FallbackSkeleton />}>
          <USP />
        </Suspense>
      </LazySection>

      <LazySection id="pricing">
        <Suspense fallback={<FallbackSkeleton />}>
          <Pricing onNavigate={handleNavigate} />
        </Suspense>
      </LazySection>

      <LazySection id="cta">
        <Suspense fallback={<FallbackSkeleton />}>
          <CTA onNavigate={handleNavigate} />
        </Suspense>
      </LazySection>

      <LazySection id="testimonials">
        <Suspense fallback={<FallbackSkeleton />}>
          <Testimonials />
        </Suspense>
      </LazySection>

      <LazySection id="contact">
        <Suspense fallback={<FallbackSkeleton />}>
          <Contact />
        </Suspense>
      </LazySection>
    </main>
  );
};

export default Home;
