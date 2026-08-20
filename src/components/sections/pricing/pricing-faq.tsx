import { ChevronDownIcon } from "lucide-react";
import { useId } from "react";

import {
  pricingFaqItems,
  type PricingFaqItem,
} from "@/components/sections/pricing/pricing-faq-items";
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

function FaqAccordionItem({ item }: { item: PricingFaqItem }) {
  return (
    <AccordionItem value={item.id}>
      <AccordionTrigger className="gap-4 text-base [&[data-panel-open]_svg]:rotate-180">
        <span>{item.question}</span>
        <ChevronDownIcon
          aria-hidden
          strokeWidth={2.25}
          className="text-muted-foreground size-4 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        />
      </AccordionTrigger>
      <AccordionPanel>
        <p className="text-muted-foreground pb-4 text-sm leading-relaxed text-pretty">
          {item.answer}
        </p>
      </AccordionPanel>
    </AccordionItem>
  );
}

export function PricingFaq({
  className,
  headingId,
}: {
  className?: string;
  headingId?: string;
}) {
  const fallbackHeadingId = useId();
  const listLabelId = headingId ?? fallbackHeadingId;

  const splitIndex = Math.ceil(pricingFaqItems.length / 2);
  const columns = [
    pricingFaqItems.slice(0, splitIndex),
    pricingFaqItems.slice(splitIndex),
  ];

  return (
    <div className={cn("mx-auto w-full", className)}>
      <div
        className="grid items-start gap-x-10 lg:grid-cols-2"
        aria-labelledby={listLabelId}
      >
        {columns.map((items, columnIndex) => (
          <Accordion
            key={columnIndex}
            keepMounted
            className={cn(
              "border-border border-b lg:border-y",
              columnIndex === 0 && "border-t",
            )}
          >
            {items.map((item) => (
              <FaqAccordionItem key={item.id} item={item} />
            ))}
          </Accordion>
        ))}
      </div>

      <p className="text-muted-foreground mt-12 text-center text-xs">
        Still have questions?{" "}
        <a
          href="/support/contact"
          className="text-foreground underline-offset-4 hover:underline"
        >
          Contact support
        </a>
        .
      </p>
    </div>
  );
}

export default PricingFaq;
