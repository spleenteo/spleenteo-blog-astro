// src/types/astro.d.ts
declare module '*.astro' {
  import type { FunctionComponent } from 'react';
  const Component: FunctionComponent<any>;
  export default Component;
}
