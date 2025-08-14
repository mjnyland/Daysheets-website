declare module '@splidejs/react-splide' {
  import { ComponentType, ReactNode, HTMLAttributes } from 'react';
  
  export interface SplideOptions {
    type?: 'slide' | 'loop' | 'fade';
    drag?: boolean | 'free';
    focus?: 'center' | number;
    perPage?: number;
    perMove?: number;
    gap?: string | number;
    arrows?: boolean;
    pagination?: boolean;
    direction?: 'ltr' | 'rtl' | 'ttb';
    autoScroll?: {
      pauseOnHover?: boolean;
      pauseOnFocus?: boolean;
      rewind?: boolean;
      speed?: number;
    };
    breakpoints?: {
      [key: number]: Partial<SplideOptions>;
    };
  }
  
  export interface SplideProps extends HTMLAttributes<HTMLDivElement> {
    options?: SplideOptions;
    extensions?: Record<string, any>;
    children?: ReactNode;
  }
  
  export interface SplideSlideProps extends HTMLAttributes<HTMLLIElement> {
    children?: ReactNode;
  }
  
  export const Splide: ComponentType<SplideProps>;
  export const SplideSlide: ComponentType<SplideSlideProps>;
}

declare module '@splidejs/splide-extension-auto-scroll' {
  export const AutoScroll: any;
}