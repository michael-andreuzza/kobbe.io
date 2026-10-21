import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
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
    <AccordionItem value={item.id}>
      <AccordionTrigger className="gap-4 py-3 text-base font-medium [&[data-panel-open]_svg]:rotate-180">
        <span>{item.question}</span>
        <HugeiconsIcon
          icon={ArrowDown01Icon}
          aria-hidden
          strokeWidth={2.25}
          className="text-muted-foreground size-3.5 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        />
      </AccordionTrigger>
      <AccordionPanel>
        <p className="text-muted-foreground pb-3 text-base leading-relaxed text-pretty">
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
      className={cn("w-full", className)}
      aria-labelledby={headingId}
    >
      {landingFaqItems.map((item) => (
        <LandingFaqItem key={item.id} item={item} />
      ))}
    </Accordion>
  );
}

export default LandingFaq;
