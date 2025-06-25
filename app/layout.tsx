import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import TawkMessenger from "@/components/TawkMessenger";
import { Toaster } from "@/components/ui/toaster";
import Script from "next/script";

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://browwraps.com"),
  title: {
    default: "Custom Boat Brow Wraps in South Florida - From Port St. Lucie to Miami | browwraps.com",
    template: "%s | browwraps.com"
  },
  description:
    "Upgrade your sportfish yacht with sleek, gloss black boat brow wraps. We service Port St. Lucie, Stuart, Jupiter, West Palm Beach, Boca Raton, Fort Lauderdale, Miami & more. On-water installation, low maintenance, luxury finish.",
  keywords: [
    "boat brow wraps",
    "yacht window wraps",
    "marine window tinting",
    "South Florida boat services",
    "luxury yacht upgrades"
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Custom Boat Brow Wraps in South Florida - From Port St. Lucie to Miami | browwraps.com",
    description:
      "Upgrade your sportfish yacht with sleek, gloss black boat brow wraps. On-water installation, low maintenance, luxury finish.",
    type: "website",
    locale: "en_US",
    url: "https://browwraps.com",
    siteName: "browwraps.com",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Custom Boat Brow Wraps in South Florida - From Port St. Lucie to Miami | browwraps.com",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Boat Brow Wraps in South Florida",
    description: "Upgrade your sportfish yacht with sleek, gloss black boat brow wraps. On-water installation, low maintenance, luxury finish.",
    images: ["/images/twitter-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        
        {/* Google Analytics with enhanced tracking */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Y3S0MX1FV2"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Y3S0MX1FV2', {
              page_title: document.title,
              page_path: window.location.pathname,
              send_page_view: true
            });
          `}
        </Script>
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "Brow Wraps",
            "image": "https://browwraps.com/images/logo.jpeg",
            "description": "Custom boat brow wraps installation in South Florida",
            "address": {
              "@type": "PostalAddress",
              "addressRegion": "FL",
              "addressCountry": "US"
            },
            "areaServed": {
              "@type": "GeoCircle",
              "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": 26.7153,
                "longitude": -80.0534
              },
              "geoRadius": 150000
            },
            "sameAs": [
              "https://www.instagram.com/browwraps"
            ]
          })}
        </script>
      </head>
      <body className="min-h-screen antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <TawkMessenger />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}