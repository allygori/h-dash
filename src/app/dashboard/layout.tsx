import Sidebar from "./_components/sidebar/sidebar";
import Header from "./_components/header/header";

const DashboardLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <main className="relative flex h-full min-h-screen w-full flex-row">
      <Sidebar className="shrink-0" />
      <section className="flex w-full grow flex-col">
        <Header />
        <main className="min-h-screen bg-gray-100 p-8">{children}</main>
      </section>
    </main>
  );
};

export default DashboardLayout;
