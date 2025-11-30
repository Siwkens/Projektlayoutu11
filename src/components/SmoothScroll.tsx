import { useEffect } from 'react';

/**
 * Utility for smooth scrolling to sections with animation
 */
export function scrollToSection(sectionId: string, offset: number = 100) {
  const element = document.getElementById(sectionId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}

/**
 * Hook to add smooth scroll behavior to all anchor links
 */
export function useSmoothScroll() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      
      if (anchor) {
        e.preventDefault();
        const href = anchor.getAttribute('href');
        if (href && href.startsWith('#')) {
          const sectionId = href.substring(1);
          scrollToSection(sectionId);
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);
}

/**
 * Component that enables smooth scrolling for child links
 */
export function SmoothScrollContainer({ children }: { children: React.ReactNode }) {
  useSmoothScroll();
  return <>{children}</>;
}
