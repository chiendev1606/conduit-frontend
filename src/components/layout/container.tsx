export function Container({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="mx-auto w-full max-w-6xl rounded-lg bg-white p-6 shadow-sm">{children}</div>;
}
