export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <main>
        <p className="">LEFT SIDEBAR</p>
        {children}
        <p className="">RIGHT SIDEBAR</p>
      </main>
    </div>
  );
}
