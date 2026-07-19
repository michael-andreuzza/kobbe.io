import { useEffect, useState } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { ArrowRight } from "@/components/assets/arrow-right";
import { Logo } from "@/components/assets/logo";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CAMPAIGN_VERSION = "2026-hellokobbe-2";
const DISMISS_KEY = "kobbeOfferDismissed";
const DISCOUNT_CODE = "hellokobbe";

function getStorage(kind: "session" | "local"): Storage | null {
  try {
    return kind === "session" ? window.sessionStorage : window.localStorage;
  } catch {
    return null;
  }
}

function getDismissInfo() {
  const persistent = getStorage("local")?.getItem(DISMISS_KEY);
  if (persistent) {
    try {
      const data = JSON.parse(persistent) as {
        version?: string | null;
      };
      if (data && typeof data === "object") return data;
    } catch {
      return { version: null };
    }
  }

  const session = getStorage("session")?.getItem(DISMISS_KEY);
  if (!session) return null;

  try {
    const data = JSON.parse(session) as { version?: string | null };
    if (data && typeof data === "object") return data;
  } catch {
    return { version: null };
  }

  return null;
}

function setDismiss(persistent = false) {
  if (import.meta.env.DEV) return;

  const payload = JSON.stringify({
    version: CAMPAIGN_VERSION,
    dismissedAt: Date.now(),
  });

  const storage = getStorage(persistent ? "local" : "session");
  storage?.setItem(DISMISS_KEY, payload);
}

function shouldShowOffer() {
  if (import.meta.env.DEV) return true;

  const path = window.location.pathname.replace(/\/$/, "") || "/";
  if (path !== "/") return false;

  const info = getDismissInfo();
  if (!info) return true;
  return info.version !== CAMPAIGN_VERSION;
}

export function LandingOfferDialog() {
  const [enabled, setEnabled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!shouldShowOffer()) return;
    setEnabled(true);
    setOpen(true);
  }, []);

  function dismiss(persistent = false) {
    setDismiss(persistent);
    setOpen(false);
  }

  if (!enabled) return null;

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) dismiss(false);
        else setOpen(true);
      }}
    >
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-transparent" />
        <Dialog.Viewport className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <Dialog.Popup
            className={cn(
              "bg-primary text-primary-foreground relative flex w-full max-w-sm flex-col rounded-2xl",
            )}
          >
            <div className="flex items-center justify-between p-4">
              <div className="pl-2">
                <Logo className="h-6" />
              </div>
              <Dialog.Close
                className="text-primary-foreground hover:text-primary-foreground/80 inline-flex size-8 items-center justify-center transition-colors outline-none"
                aria-label="Close offer"
              >
                <HugeiconsIcon
                  icon={Cancel01Icon}
                  size={18}
                  strokeWidth={1.8}
                />
              </Dialog.Close>
            </div>

            <div className="border-primary-foreground/10 border-t p-4 text-center text-balance">
              <Dialog.Title className="font-display text-primary-foreground text-center text-2xl">
                <span className="block">20% off yearly plans</span>
                <span className="mt-8 block">
                  Use code
                  <span className="text-brand px-1 font-medium">
                    {DISCOUNT_CODE}
                  </span>
                  when you upgrade
                </span>
              </Dialog.Title>
              <Dialog.Description className="text-primary-foreground/75 mt-4 max-w-xl text-base font-medium">
                Start with a 15-day free trial, no card required. Apply the code
                on yearly billing when you choose a plan.
              </Dialog.Description>
            </div>

            <div className="border-primary-foreground/10 border-t p-4">
              <Dialog.Close
                nativeButton={false}
                render={
                  <a
                    href="/#pricing"
                    data-kobbe-event="Offer modal - view yearly pricing"
                    onClick={() => dismiss(true)}
                    className={cn(
                      buttonVariants({ size: "lg" }),
                      "bg-primary-foreground! text-primary! [a]:hover:bg-primary-foreground/90! [a]:hover:text-primary! w-full justify-between",
                    )}
                  >
                    <span>Get started</span>
                    <ArrowRight size="base" />
                  </a>
                }
              />
            </div>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default LandingOfferDialog;
