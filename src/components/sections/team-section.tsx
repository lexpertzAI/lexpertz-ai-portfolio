"use client";

import Image from "next/image";
import Link from "next/link";

import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SlideUp } from "@/components/motion";
import { team } from "@/content/team";
import { trackCTA } from "@/lib/analytics";

/** TeamSection — founder-focused, follows the stats / process sections. */
export function TeamSection() {
  const founder = team[0];
  if (!founder) return null;

  return (
    <Section id="team" variant="muted">
      <Container>
        <div className="mb-10 flex flex-col gap-4">
          <Badge variant="outline" className="w-fit">
            Who picks up the phone
          </Badge>
          <h2 className="heading-section">
            Built by {founder.name}.
          </h2>
        </div>
        <SlideUp>
          <div className="grid items-center gap-10 md:grid-cols-[260px_1fr]">
            <div className="relative aspect-square overflow-hidden rounded-lg border border-border">
              <Image
                src={founder.avatar}
                alt={founder.name}
                fill
                sizes="(min-width: 768px) 260px, 100vw"
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-xl text-muted-foreground">{founder.bio}</p>
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{founder.role}</span>
                {founder.socials?.github ? (
                  <Link
                    href={founder.socials.github}
                    className="text-brand-cyan hover:underline"
                    onClick={() => trackCTA("founder_github", founder.socials!.github)}
                  >
                    GitHub
                  </Link>
                ) : null}
                {founder.socials?.linkedin ? (
                  <Link
                    href={founder.socials.linkedin}
                    className="text-brand-cyan hover:underline"
                    onClick={() => trackCTA("founder_linkedin", founder.socials!.linkedin)}
                  >
                    LinkedIn
                  </Link>
                ) : null}
                {founder.socials?.x ? (
                  <Link
                    href={founder.socials.x}
                    className="text-brand-cyan hover:underline"
                    onClick={() => trackCTA("founder_x", founder.socials!.x)}
                  >
                    X
                  </Link>
                ) : null}
              </div>
              <Button asChild variant="outline" size="sm" className="w-fit">
                <Link
                  href="/about"
                  onClick={() => trackCTA("team_about_link", "/about")}
                >
                  Read the full story →
                </Link>
              </Button>
            </div>
          </div>
        </SlideUp>
      </Container>
    </Section>
  );
}
