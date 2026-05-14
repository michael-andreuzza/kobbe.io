import { useEffect, useState } from "react";

import {
  defaultPricingTierIndex,
  pricingTierEvent,
  pricingTiers,
} from "./pricing-tiers";

function AnimatedCharacter({ character }: { character: string }) {
  const digit = Number(character);
  const isDigit = !Number.isNaN(digit);

  return (
    <span
      className={
        isDigit
          ? "inline-block h-[1em] w-[0.62em] overflow-hidden align-[-0.06em]"
          : "inline-block h-[1em] align-[-0.06em]"
      }
    >
      {isDigit ? (
        <span
          className="flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
          style={{ transform: `translateY(-${digit}em)` }}
        >
          {Array.from({ length: 10 }, (_, index) => (
            <span key={index} className="h-[1em] text-center leading-[1em]">
              {index}
            </span>
          ))}
        </span>
      ) : (
        <span className="block h-[1em] leading-[1em]">{character}</span>
      )}
    </span>
  );
}

function AnimatedEventAmount({ value }: { value: string }) {
  return (
    <span aria-hidden="true" className="inline-flex tabular-nums">
      {value.split("").map((character, index) => (
        <AnimatedCharacter key={index} character={character} />
      ))}
    </span>
  );
}

export function PricingIncludedEvents() {
  const [tierIndex, setTierIndex] = useState(defaultPricingTierIndex);
  const tier = pricingTiers[tierIndex] ?? pricingTiers[0];

  useEffect(() => {
    function handleTierChange(event: Event) {
      const next = (event as CustomEvent<{ tierIndex?: unknown }>).detail
        ?.tierIndex;

      if (
        typeof next === "number" &&
        Number.isInteger(next) &&
        pricingTiers[next]
      ) {
        setTierIndex(next);
      }
    }

    window.addEventListener(pricingTierEvent, handleTierChange);
    return () => window.removeEventListener(pricingTierEvent, handleTierChange);
  }, []);

  return (
    <p className="text-muted-foreground mt-3 text-sm font-medium">
      <span className="sr-only">{tier.events} events included.</span>
      <AnimatedEventAmount value={tier.events} />{" "}
      <span aria-hidden="true">events included.</span>
    </p>
  );
}

export default PricingIncludedEvents;
