import { Inter } from "next/font/google";
import { getSEOTags } from "@/libs/seo";
import ClientLayout from "@/components/LayoutClient";
import config from "@/config";
import "./globals.css";
import { SideNav } from "@/components/SideNav";
import { MobileNav } from "@/components/MobileNav";
import Footer from "@/components/Footer";
import { Globe } from "lucide-react";

const font = Inter({ subsets: ["latin"] });

export const viewport = {
  themeColor: config.colors.main,
  width: "device-width",
  initialScale: 1,
};

export const metadata = getSEOTags();

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme={config.colors.theme}
      className={font.className + " bg-white"}
    >
      <head>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${config.googleAnalyticsId}`}
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${config.googleAnalyticsId}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body>
        <ClientLayout>
          <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r bg-muted/40 md:block">
              <SideNav />
            </div>
            <div className="flex flex-col">
              <header className="sticky top-0 z-50 flex h-14 items-center gap-1 border-b bg-background px-4 lg:h-[60px] lg:px-6 md:hidden">
                <MobileNav />
                <div className="flex items-center gap-2 font-semibold">
                  <Globe className="h-6 w-6" />
                  <span className="">{config.appName}</span>
                </div>
              </header>
              {children}
              <Footer />
            </div>
          </div>
        </ClientLayout>
      </body>
    </html>
  );
}
