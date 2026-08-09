"use client";

import Link from "next/link";

import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProfileCard } from "@/components/ui/profile-card";
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
          <h2 className="heading-section">Built by {founder.name}.</h2>
        </div>

        <ProfileCard
          name={founder.name}
          title={founder.role}
          description={founder.bio}
          imageUrl={founder.avatar}
          githubUrl={founder.socials?.github}
          twitterUrl={founder.socials?.x}
          linkedinUrl={founder.socials?.linkedin}
        />

        <div className="mt-10 flex justify-center">
          <Button asChild variant="outline" size="sm">
            <Link
              href="/about"
              onClick={() => trackCTA("team_about_link", "/about")}
            >
              Read the full story →
            </Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
