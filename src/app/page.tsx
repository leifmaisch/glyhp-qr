import Link from "next/link"
import Image from "next/image"

import { HeroQrShowcase } from "@/features/qr"
import { HomeFeatures } from "@/components/home-features"
import { SiteNavbar } from "@/components/site-navbar"
import { Button } from "@/components/ui/button"
import {
  Cta,
  CtaActions,
  CtaTitle,
} from "@/components/ui/cta"
import {
  Footer,
  FooterBar,
  FooterBrand,
  FooterColumn,
  FooterColumns,
  FooterCopyright,
  FooterLegal,
  FooterLink,
  FooterMain,
  FooterPanel,
} from "@/components/ui/footer"
import {
  Hero,
  HeroActions,
  HeroDescription,
  HeroFrame,
  HeroIntro,
  HeroLabel,
  HeroShowcase,
  HeroTitle,
} from "@/components/ui/hero"

export default function Home() {
  return (
    <>
      <SiteNavbar />

      <main id="main-content" className="flex min-w-0 flex-1 flex-col">
        <Hero>
          <HeroFrame>
            <HeroIntro>
              <HeroLabel>Advanced QR code generator</HeroLabel>
              <HeroTitle>Design QR codes that actually look good</HeroTitle>
              <HeroDescription>
                Custom colors, gradients, dot patterns, embedded logos, dither
                effects, and high-resolution export. All in your browser.
              </HeroDescription>
              <HeroActions>
                <Button
                  render={<Link href="/studio" />}
                  nativeButton={false}
                >
                  Start creating
                </Button>
                <Button
                  variant="outline"
                  render={<Link href="#features" />}
                  nativeButton={false}
                >
                  Explore features
                </Button>
              </HeroActions>
            </HeroIntro>
            <HeroShowcase>
              <HeroQrShowcase />
            </HeroShowcase>
          </HeroFrame>
        </Hero>

        <HomeFeatures />

        <Cta>
          <CtaTitle>Ready to generate?</CtaTitle>
          <CtaActions>
            <Button
              render={<Link href="/studio" />}
              nativeButton={false}
            >
              Open studio
            </Button>
          </CtaActions>
        </Cta>
      </main>

      <Footer>
        <FooterPanel>
          <FooterMain>
            <FooterBrand
              name="Glyph"
              logo={
                <Image
                  src="/logo.svg"
                  alt="Glyph logo"
                  width={36}
                  height={36}
                  className="size-9 shrink-0"
                />
              }
            >
              Advanced QR codes with colors, gradients, logos, dither effects,
              and export options.
            </FooterBrand>
            <FooterColumns>
              <FooterColumn title="Product">
                <FooterLink label="Studio" href="/studio" />
                <FooterLink label="Features" href="#features" />
              </FooterColumn>
              <FooterColumn title="Built with">
                <FooterLink
                  label="Leguan UI"
                  href="https://leguan-ui.pages.dev/get-started"
                />
                <FooterLink
                  label="Next.js"
                  href="https://nextjs.org/docs"
                />
              </FooterColumn>
            </FooterColumns>
          </FooterMain>
          <FooterBar>
            <FooterCopyright name="Glyph" />
            <FooterLegal
              links={[
                { label: "Privacy", href: "#" },
                { label: "Terms", href: "#" },
              ]}
            />
          </FooterBar>
        </FooterPanel>
      </Footer>
    </>
  )
}
