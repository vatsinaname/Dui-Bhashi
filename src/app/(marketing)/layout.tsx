import { Footer } from "./_components/footer";
import { Header } from "./_components/header";

type Props = {
  children: React.ReactNode;
};

const MarketingLayout = ({ children }: Props) => {
  return (
    <div className="flex min-h-screen flex-col bg-[#f5f2e8] dark:bg-slate-950">
      <Header />
      <main className="flex flex-1 flex-col items-center justify-center">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MarketingLayout;
