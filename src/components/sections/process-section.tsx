import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { ProcessSteps } from "@/components/ui/process-steps";
import { process } from "@/content/process";

/**
 * ProcessSection — homepage "How we work" block.
 * Renders the reusable ProcessSteps primitive inside the site's section
 * rhythm, driven by `src/content/process.ts`.
 */
export function ProcessSection() {
  return (
    <Section variant="muted" id="process">
      <Container>
        <div className="mb-12 flex flex-col gap-4">
          <Badge variant="outline" className="w-fit">
            {process.eyebrow}
          </Badge>
          <h2 className="heading-section">{process.heading}</h2>
        </div>
        <ProcessSteps steps={process.steps} />
      </Container>
    </Section>
  );
}
