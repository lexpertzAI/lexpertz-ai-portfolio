"use client";

import * as React from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useReducedMotion } from "@/components/three/use-reduced-motion";
import { trackCTA } from "@/lib/analytics";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * CinematicHero — pinned GSAP scroll scene (native scroll, no hijack).
 *
 * Choreography: intro taglines → deep-blue physical card slides in from
 * below → expands to fullscreen → RAG console mockup assembles with floating
 * badges → card pulls back to a CTA stage → card exits upward, releasing the
 * page to scroll on naturally.
 *
 * The root fills its parent (`h-full w-full`); the section wrapper owns
 * viewport sizing and the navbar offset.
 */

export interface CinematicHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  brandName?: string;
  tagline1?: string;
  tagline2?: string;
  cardHeading?: string;
  cardDescription?: React.ReactNode;
  ctaHeading?: string;
  ctaDescription?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
}

export function CinematicHero({
  brandName = "Lexpertz",
  tagline1 = "We architect AI systems that",
  tagline2 = "reason, act, and self-correct.",
  cardHeading = "RAG pipelines, deployed.",
  cardDescription = (
    <>
      <span className="font-semibold text-white">Lexpertz</span> designs
      enterprise-grade RAG and edge AI systems that turn proprietary data into
      decisions your teams can trust — observable, auditable, and
      production-ready.
    </>
  ),
  ctaHeading = "Ship AI that holds up in production.",
  ctaDescription =
    "Book a 30-minute architecture review. We'll audit your data layer, identify the highest-ROI AI surface, and leave you with a concrete plan.",
  primaryCtaLabel = "Start Automation",
  primaryCtaHref = "/contact",
  secondaryCtaLabel = "View Solutions",
  secondaryCtaHref = "/case-studies",
  className,
  ...props
}: CinematicHeroProps) {
  const reducedMotion = useReducedMotion();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const mainCardRef = React.useRef<HTMLDivElement>(null);
  const mockupRef = React.useRef<HTMLDivElement>(null);
  const requestRef = React.useRef(0);

  // 1. Mouse interaction (card sheen + mockup tilt), rAF-throttled.
  React.useEffect(() => {
    if (reducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (window.scrollY > window.innerHeight * 2) return;

      cancelAnimationFrame(requestRef.current);

      requestRef.current = requestAnimationFrame(() => {
        if (mainCardRef.current && mockupRef.current) {
          const rect = mainCardRef.current.getBoundingClientRect();
          mainCardRef.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
          mainCardRef.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);

          const xVal = (e.clientX / window.innerWidth - 0.5) * 2;
          const yVal = (e.clientY / window.innerHeight - 0.5) * 2;

          gsap.to(mockupRef.current, {
            rotationY: xVal * 12,
            rotationX: -yVal * 12,
            ease: "power3.out",
            duration: 1.2,
          });
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, [reducedMotion]);

  // 2. Intro + pinned cinematic scroll timeline — responsive via gsap.matchMedia.
  // Desktop and mobile get their own contexts (separate scroll distance and
  // pullback sizing); `prefers-reduced-motion` is folded into the queries so
  // no timeline runs for reduced-motion users.
  React.useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      const buildIntro = () => {
        gsap.set(".text-track", { autoAlpha: 0, y: 60, scale: 0.85, filter: "blur(20px)", rotationX: -20 });
        gsap.set(".text-days", { autoAlpha: 1, clipPath: "inset(0 100% 0 0)" });
        gsap.set(".hero-badge", { autoAlpha: 0, y: 20 });
        gsap.set(".main-card", { y: window.innerHeight + 200, autoAlpha: 1 });
        gsap.set([".card-left-text", ".mockup-scroll-wrapper", ".floating-badge", ".phone-widget"], { autoAlpha: 0 });
        gsap.set(".cta-wrapper", { autoAlpha: 0, scale: 0.8, filter: "blur(30px)" });

        const introTl = gsap.timeline({ delay: 0.3 });
        introTl
          .to(".hero-badge", { duration: 1, autoAlpha: 1, y: 0, ease: "expo.out" }, 0)
          .to(".text-track", { duration: 1.8, autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", rotationX: 0, ease: "expo.out" }, 0.2)
          .to(".text-days", { duration: 1.4, clipPath: "inset(0 0% 0 0)", ease: "power4.inOut" }, "-=1.0");
      };

      const buildScrollTl = (end: number, pullbackWidth: string, pullbackHeight: string, pullbackRadius: string) =>
        gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: `+=${end}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        })
          .to([".hero-text-wrapper", ".bg-grid-theme"], { scale: 1.15, filter: "blur(20px)", opacity: 0.2, ease: "power2.inOut", duration: 2 }, 0)
          .to(".main-card", { y: 0, ease: "power3.inOut", duration: 2 }, 0)
          .to(".main-card", { width: "100%", height: "100%", borderRadius: "0px", ease: "power3.inOut", duration: 1.5 })
          .fromTo(".mockup-scroll-wrapper",
            { y: 300, z: -500, rotationX: 50, rotationY: -30, autoAlpha: 0, scale: 0.6 },
            { y: 0, z: 0, rotationX: 0, rotationY: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 2.5 }, "-=0.8"
          )
          .fromTo(".phone-widget", { y: 40, autoAlpha: 0, scale: 0.95 }, { y: 0, autoAlpha: 1, scale: 1, stagger: 0.15, ease: "back.out(1.2)", duration: 1.5 }, "-=1.5")
          .fromTo(".floating-badge", { y: 100, autoAlpha: 0, scale: 0.7, rotationZ: -10 }, { y: 0, autoAlpha: 1, scale: 1, rotationZ: 0, ease: "back.out(1.5)", duration: 1.5, stagger: 0.2 }, "-=2.0")
          .fromTo(".card-left-text", { x: -50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power4.out", duration: 1.5 }, "-=1.5")
          .to({}, { duration: 2.5 })
          .set(".hero-text-wrapper", { autoAlpha: 0 })
          .set(".cta-wrapper", { autoAlpha: 1 })
          .to({}, { duration: 1.5 })
          .to([".mockup-scroll-wrapper", ".floating-badge", ".card-left-text"], {
            scale: 0.9, y: -40, z: -200, autoAlpha: 0, ease: "power3.in", duration: 1.2, stagger: 0.05,
          })
          .to(".main-card", {
            width: pullbackWidth,
            height: pullbackHeight,
            borderRadius: pullbackRadius,
            ease: "expo.inOut",
            duration: 1.8,
          }, "pullback")
          .to(".cta-wrapper", { scale: 1, filter: "blur(0px)", ease: "expo.inOut", duration: 1.8 }, "pullback")
          .to(".main-card", { y: -window.innerHeight - 300, ease: "power3.in", duration: 1.5 })
          .to(".cta-wrapper", { autoAlpha: 0, duration: 0.8 });

      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        buildIntro();
        buildScrollTl(7200, "85vw", "85vh", "40px");
      });

      mm.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
        buildIntro();
        buildScrollTl(2800, "92vw", "92vh", "32px");
      });
    }, containerRef);

    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "cinematic-hero relative flex h-svh w-full items-center justify-center overflow-hidden bg-background text-foreground",
        className
      )}
      style={{ perspective: "1500px" }}
      {...props}
    >
      <div className="bg-brand-mesh absolute inset-0" aria-hidden="true" />
      <div className="film-grain" aria-hidden="true" />
      <div className="bg-grid-theme absolute inset-0 z-0 pointer-events-none opacity-50" aria-hidden="true" />

      {/* BACKGROUND LAYER: intro text */}
      <div className="hero-text-wrapper absolute z-10 flex w-screen flex-col items-center justify-center px-4 text-center will-change-transform">
        <h1 className="text-balance text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          <span className="hero-badge mb-6 block">
            <Badge variant="brand">Enterprise AI That Ships — Not Just Demos</Badge>
          </span>
          <span className="text-track gsap-reveal block text-3d-matte">{tagline1}</span>
          <span className="text-days gsap-reveal block text-silver-matte">{tagline2}</span>
        </h1>
        <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
          Scroll to explore
        </p>
      </div>

      {/* BACKGROUND LAYER 2: tactile CTA stage */}
      <div className="cta-wrapper gsap-reveal absolute z-10 flex w-screen flex-col items-center justify-center px-4 text-center pointer-events-auto will-change-transform">
        <h2 className="mb-6 text-3xl font-bold tracking-tight text-silver-matte sm:text-4xl md:text-6xl">
          {ctaHeading}
        </h2>
        <p className="mx-auto mb-12 max-w-xl text-lg font-light leading-relaxed text-muted-foreground md:text-xl">
          {ctaDescription}
        </p>
        <div className="flex flex-col gap-6 sm:flex-row">
          <Button
            asChild
            variant="brand"
            size="lg"
            className="btn-tactile-brand rounded-xl"
            onClick={() => trackCTA("hero_primary", primaryCtaHref)}
          >
            <Link href={primaryCtaHref}>{primaryCtaLabel}</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="btn-tactile-outline rounded-xl"
            onClick={() => trackCTA("hero_secondary", secondaryCtaHref)}
          >
            <Link href={secondaryCtaHref}>{secondaryCtaLabel}</Link>
          </Button>
        </div>
      </div>

      {/* FOREGROUND LAYER: the physical deep-blue card */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none" style={{ perspective: "1500px" }}>
        <div
          ref={mainCardRef}
          className="main-card premium-depth-card relative flex h-[92vh] w-[92vw] items-center justify-center overflow-hidden rounded-[32px] gsap-reveal md:h-[85vh] md:w-[85vw] md:rounded-[40px]"
        >
          <div className="card-sheen" aria-hidden="true" />

          <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col items-center justify-evenly px-4 py-6 lg:grid lg:grid-cols-3 lg:items-center lg:gap-8 lg:px-12 lg:py-0">
            {/* TOP (mobile) / RIGHT (desktop): brand name */}
            <div className="card-right-text gsap-reveal order-1 z-20 flex w-full justify-center lg:order-3 lg:justify-end">
              <h2 className="text-6xl font-black uppercase tracking-tighter text-card-silver-matte md:text-[6rem] lg:text-[8rem]">
                {brandName}
                <span className="text-brand-cyan drop-shadow-[0_0_24px_hsl(var(--brand-cyan)/0.55)]">.</span>
              </h2>
            </div>

            {/* MIDDLE (mobile + desktop): phone mockup */}
            <div className="mockup-scroll-wrapper order-2 relative z-10 flex h-[400px] w-full items-center justify-center lg:order-2 lg:h-[600px]" style={{ perspective: "1000px" }}>
              <div className="relative flex h-full w-full scale-[0.62] items-center justify-center md:scale-[0.85] lg:scale-100">
                <div
                  ref={mockupRef}
                  className="iphone-bezel relative flex h-[580px] w-[280px] flex-col rounded-[3rem] will-change-transform"
                >
                  {/* Hardware buttons */}
                  <div className="hardware-btn absolute top-[120px] -left-[3px] z-0 h-[25px] w-[3px] rounded-l-md" aria-hidden="true" />
                  <div className="hardware-btn absolute top-[160px] -left-[3px] z-0 h-[45px] w-[3px] rounded-l-md" aria-hidden="true" />
                  <div className="hardware-btn absolute top-[220px] -left-[3px] z-0 h-[45px] w-[3px] rounded-l-md" aria-hidden="true" />
                  <div className="hardware-btn absolute top-[170px] -right-[3px] z-0 h-[70px] w-[3px] scale-x-[-1] rounded-r-md" aria-hidden="true" />

                  {/* Screen */}
                  <div className="absolute inset-[7px] z-10 overflow-hidden rounded-[2.5rem] bg-[#050914] text-white shadow-[inset_0_0_15px_rgba(0,0,0,1)]">
                    <div className="screen-glare absolute inset-0 z-40 pointer-events-none" aria-hidden="true" />

                    {/* Dynamic island */}
                    <div className="absolute top-[5px] left-1/2 z-50 flex h-[28px] w-[100px] -translate-x-1/2 items-center justify-end rounded-full bg-black px-3 shadow-[inset_0_-1px_2px_rgba(255,255,255,0.1)]">
                      <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
                    </div>

                    {/* App interface */}
                    <div className="relative flex h-full w-full flex-col px-5 pb-8 pt-12">
                      <div className="phone-widget mb-6 flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="mb-1 text-[10px] font-bold uppercase tracking-widest text-neutral-400">Live</span>
                          <span className="text-xl font-bold tracking-tight text-white drop-shadow-md">
                            Lexpertz Console
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-400">
                            RAG online
                          </span>
                          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm font-bold text-neutral-200 shadow-lg shadow-black/50">
                            LX
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-1 flex-col justify-center gap-3 overflow-hidden">
                        <div className="phone-widget self-end max-w-[85%] rounded-2xl rounded-br-sm bg-blue-600/90 px-3.5 py-2.5 text-[11px] leading-relaxed text-white shadow-[0_8px_16px_rgba(0,0,0,0.4)]">
                          What&apos;s driving Q3 churn in enterprise accounts?
                        </div>
                        <div className="phone-widget widget-depth self-start max-w-[90%] rounded-2xl p-3.5 text-[11px] leading-relaxed text-neutral-200">
                          <p className="mb-2">Three factors across 412 tickets:</p>
                          <ul className="space-y-1">
                            <li className="flex items-start gap-1.5">
                              <span className="mt-px text-emerald-400" aria-hidden="true">✓</span> pricing fit
                            </li>
                            <li className="flex items-start gap-1.5">
                              <span className="mt-px text-emerald-400" aria-hidden="true">✓</span> onboarding gaps
                            </li>
                            <li className="flex items-start gap-1.5">
                              <span className="mt-px text-emerald-400" aria-hidden="true">✓</span> retrieval latency
                            </li>
                          </ul>
                        </div>
                        <div className="phone-widget flex items-center gap-1.5 self-start text-[9px] font-bold uppercase tracking-wider text-emerald-400/90">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
                          Verified by RAG · 4 sources cited
                        </div>
                      </div>

                      <div className="absolute bottom-2 left-1/2 h-[4px] w-[120px] -translate-x-1/2 rounded-full bg-white/20 shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
                    </div>
                  </div>
                </div>

                {/* Floating glass badges */}
                <div className="floating-badge floating-ui-badge absolute top-6 left-[-15px] z-30 flex items-center gap-3 rounded-xl p-3 lg:top-12 lg:left-[-80px] lg:gap-4 lg:rounded-2xl lg:p-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-blue-400/30 bg-gradient-to-b from-blue-500/20 to-blue-900/10 shadow-inner lg:h-10 lg:w-10">
                    <span className="text-base drop-shadow-lg lg:text-xl" aria-hidden="true">⚡</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-tight text-white lg:text-sm">p95 Latency</p>
                    <p className="text-[10px] font-medium text-blue-200/50 lg:text-xs">0.9s · within SLA</p>
                  </div>
                </div>

                <div className="floating-badge floating-ui-badge absolute right-[-15px] bottom-12 z-30 flex items-center gap-3 rounded-xl p-3 lg:right-[-80px] lg:bottom-20 lg:gap-4 lg:rounded-2xl lg:p-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-indigo-400/30 bg-gradient-to-b from-indigo-500/20 to-indigo-900/10 shadow-inner lg:h-10 lg:w-10">
                    <span className="text-base drop-shadow-lg lg:text-lg" aria-hidden="true">🛡</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-tight text-white lg:text-sm">Source Verified</p>
                    <p className="text-[10px] font-medium text-blue-200/50 lg:text-xs">4 docs cited</p>
                  </div>
                </div>
              </div>
            </div>

            {/* BOTTOM (mobile) / LEFT (desktop): card heading + description */}
            <div className="card-left-text gsap-reveal order-3 z-20 flex w-full flex-col justify-center px-4 text-center lg:order-1 lg:max-w-none lg:px-0 lg:text-left">
              <h3 className="mb-0 text-2xl font-bold tracking-tight text-white md:text-3xl lg:mb-5 lg:text-4xl">
                {cardHeading}
              </h3>
              <p className="hidden max-w-sm leading-relaxed text-blue-100/70 md:block lg:max-w-none">
                {cardDescription}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Handoff mask into the next section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-36 bg-gradient-to-b from-transparent to-background"
      />
    </div>
  );
}
