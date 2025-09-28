import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import type { Metadata } from "next";
import "@/app/globals.css";
import Header from '@/components/header';
import Footer from '@/components/footer';


export const metadata: Metadata = {
  title: "Pokédex",
  description: "Explore the first generation Pokémon with their details",
};

type Props = {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
};

export default async function RootLayout({children, params}: Props) {

  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang="en">
      <body>
          <NextIntlClientProvider>
              <Header></Header>
              <main>
                  {children}
              </main>
              <Footer></Footer>
          </NextIntlClientProvider>
      </body>
    </html>
  );
}
