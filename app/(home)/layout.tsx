import { HomeLayout } from "fumadocs-ui/layouts/home";
import { baseOptions } from "@/lib/layout.shared";
import Footer from "@/components/footer";
import { footer } from "@/lib/config";

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <HomeLayout className="container" {...baseOptions()}>
      {children}

      <Footer categories={footer} />
    </HomeLayout>
  );
}
