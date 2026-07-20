import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";
import { formatPricingCurrency } from "@/components/sections/pricing/pricing-tiers";

const REEL_DIGITS = Array.from({ length: 2 }, () =>
  Array.from({ length: 10 }, (_, digit) => digit),
).flat();

/** Row height in em — display serif italics exceed 1em metrics. */
const REEL_ROW_EM = 1.45;

function getReelOffset(digit: number) {
  return 10 + digit;
}

function getStartOffset(digit: number) {
  return Math.max(0, getReelOffset(digit) - 4);
}

function RollingDigit({
  digit,
  columnIndex,
  spinGeneration,
  animate,
}: {
  digit: number;
  columnIndex: number;
  spinGeneration: number;
  animate: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const targetOffset = getReelOffset(digit);
  const startOffset = getStartOffset(digit);
  const finalY = `calc(-${REEL_ROW_EM}em * ${targetOffset})`;
  const startY = `calc(-${REEL_ROW_EM}em * ${startOffset})`;
  const shouldSpin = animate && !reduceMotion;

  return (
    <span className="inline-block h-[1.45em] overflow-y-clip align-middle">
      <motion.span
        key={`${spinGeneration}-${columnIndex}`}
        className="flex flex-col"
        initial={shouldSpin ? { y: startY } : { y: finalY }}
        animate={{ y: finalY }}
        transition={
          shouldSpin
            ? {
                duration: 0.85,
                delay: columnIndex * 0.03,
                ease: [0.33, 1, 0.68, 1],
              }
            : { duration: 0 }
        }
      >
        {REEL_DIGITS.map((value, index) => (
          <span
            key={index}
            className="flex h-[1.45em] items-center justify-center leading-none"
            aria-hidden="true"
          >
            {value}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

type RollingPriceAmountProps = {
  amount: number;
  spinToken: string | number;
  className?: string;
};

export function RollingPriceAmount({
  amount,
  spinToken,
  className,
}: RollingPriceAmountProps) {
  const formattedAmount = useMemo(
    () => formatPricingCurrency(amount),
    [amount],
  );
  const isInitialMountRef = useRef(true);
  const [spinGeneration, setSpinGeneration] = useState(0);

  useEffect(() => {
    if (isInitialMountRef.current) {
      isInitialMountRef.current = false;
      return;
    }

    setSpinGeneration((generation) => generation + 1);
  }, [spinToken]);

  let digitColumn = 0;

  return (
    <span
      className={cn(
        "inline-flex items-center tabular-nums leading-[1.45]",
        className,
      )}
      aria-label={`$${formattedAmount}`}
    >
      <span aria-hidden="true">$</span>
      {formattedAmount.split("").map((character, index) => {
        if (character === ".") {
          return (
            <span key={`decimal-${index}`} aria-hidden="true">
              .
            </span>
          );
        }

        const columnIndex = digitColumn;
        digitColumn += 1;

        return (
          <RollingDigit
            key={`digit-${index}`}
            digit={Number(character)}
            columnIndex={columnIndex}
            spinGeneration={spinGeneration}
            animate={spinGeneration > 0}
          />
        );
      })}
    </span>
  );
}

export default RollingPriceAmount;
