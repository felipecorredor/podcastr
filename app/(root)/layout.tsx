import LeftSidebar from "@/components/LeftSidebar";
import { RightSidebar } from "@/components/RightSidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex flex-col">
      <main className="relative flex bg-black-3">
        <LeftSidebar />
        <section>
          <div>
            <div>
              <Image />
              Mobile Nav
            </div>
            <div>
              Toaster
              {children}
            </div>
          </div>
        </section>

        <RightSidebar />
      </main>
    </div>
  );
}
