import { Inter } from "next/font/google";
import { getSEOTags } from "@/libs/seo";
import ClientLayout from "@/components/LayoutClient";
import config from "@/config";
import "./globals.css";
import { SideNav } from "@/components/SideNav";

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
            <div className="flex flex-col">{children}</div>
          </div>
        </ClientLayout>
      </body>
    </html>
  );
}
