import { ChevronDownIcon } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useId } from "react";

import { pricingFaqItems } from "@/components/sections/pricing/pricing-faq-items";
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export function PricingFaq({
  className,
  headingId,
}: {
  className?: string;
  headingId?: string;
}) {
  const fallbackHeadingId = useId();
  const listLabelId = headingId ?? fallbackHeadingId;
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={cn("mx-auto w-full max-w-2xl", className)}>
      <motion.div
        initial={
          shouldReduceMotion
            ? false
            : { opacity: 0, y: 12, filter: "blur(4px)" }
        }
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.85 }}
        transition={{
          type: "spring",
          visualDuration: 0.55,
          bounce: 0.12,
        }}
      >
        <Accordion
          aria-labelledby={listLabelId}
          className="border-border border-y"
        >
          {pricingFaqItems.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger className="gap-4 [&[data-panel-open]_svg]:rotate-180">
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
          ))}
        </Accordion>
      </motion.div>

      <p className="text-muted-foreground mt-4 text-center text-xs">
        More answers in the{" "}
        <a
          href="/docs/support-faq"
          className="text-foreground underline-offset-4 hover:underline"
        >
          full FAQ
        </a>
        .
      </p>
    </div>
  );
}

export default PricingFaq;
