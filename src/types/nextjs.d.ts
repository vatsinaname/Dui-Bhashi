// Custom type declarations to override Next.js types
import { Metadata } from 'next';

// Override Next.js Page component types
declare module 'next' {
  export interface PageProps {
    params: Record<string, string>;
    searchParams?: Record<string, string | string[]>;
  }
}

// Fix for dynamic route params to work with both Promise and non-Promise patterns
declare namespace NodeJS {
  interface Promise<T> {
    // Add non-Promise property access to allow both patterns
    [key: string]: any;
  }
} 