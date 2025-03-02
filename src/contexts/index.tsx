import React from 'react';
import ReactQueryProvider from './query-provider';

export default function AllProviders({ children }: Readonly<{ children: React.ReactNode }>) {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
}
