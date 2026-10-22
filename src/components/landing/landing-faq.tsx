import { PlusSignIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import type { PricingFaqItem } from "@/components/sections/pricing/pricing-faq-items";
import { landingFaqItems } from "@/components/landing/landing-faq-items";
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

/**
 * Landing-only copy of the FAQ accordion. Items come from landing-faq-items
 * (pre-signup questions plus a few shared billing ones), and the classes here
 * are free to diverge from the docs version.
 */
function LandingFaqItem({ item }: { item: PricingFaqItem }) {
  return (
    <AccordionItem value={item.id} className="last:border-b">
      <AccordionTrigger className="gap-6 py-5 text-base font-medium hover:text-foreground [&[data-panel-open]_svg]:rotate-45">
        <span>{item.question}</span>
        <HugeiconsIcon
          icon={PlusSignIcon}
          aria-hidden
          strokeWidth={1.5}
          className="text-muted-foreground size-4 shrink-0 transition-transform duration-300 motion-reduce:transition-none"
        />
      </AccordionTrigger>
      <AccordionPanel>
        <p className="text-muted-foreground max-w-xl pb-6 text-base leading-relaxed text-pretty">
          {item.answer}
        </p>
      </AccordionPanel>
    </AccordionItem>
  );
}

export function LandingFaq({
  className,
  headingId,
}: {
  className?: string;
  headingId?: string;
}) {
  return (
    <Accordion
      keepMounted
      className={cn("border-border w-full border-t", className)}
      aria-labelledby={headingId}
    >
      {landingFaqItems.map((item) => (
        <LandingFaqItem key={item.id} item={item} />
      ))}
    </Accordion>
  );
}

export default LandingFaq;
