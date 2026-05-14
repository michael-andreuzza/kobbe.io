import type { ReactNode } from "react";
import { HugeiconsIcon } from "@hugeicons/react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CardExpandButton } from "./dashboard-list-card";
import {
  dashboardCardContentDefaultClass,
  dashboardCardContentListClass,
  dashboardCardHeaderClass,
  dashboardCardRootClass,
  dashboardCardTitleClass,
  dashboardTabbedCardHeaderClass,
} from "./dashboard-card-layout";
import { TabsChrome } from "./dashboard-tabs-chrome";

type HugeiconsProp = Parameters<typeof HugeiconsIcon>[0]["icon"];

type EmptyState = {
  icon: HugeiconsProp;
  title: string;
  hint?: string;
};

type ExpandAction = {
  onClick: () => void;
  ariaLabel: string;
};

type TabbedHeaderTabs = {
  label: string;
  tabs: string[];
  activeIndex: number;
  onActiveIndexChange: (index: number) => void;
};

export function DashboardTabbedCardHeaderContent(props: {
  title: string;
  tabs: TabbedHeaderTabs;
  expandAction?: ExpandAction;
  description?: ReactNode;
}) {
  return (
    <>
      <CardTitle
        className={cn(dashboardCardTitleClass, "min-w-0 justify-self-start pt-0.5")}
      >
        {props.title}
      </CardTitle>
      <div className="flex max-w-full min-w-0 flex-wrap items-center justify-start gap-3 self-start pt-0.5 sm:justify-end">
        <TabsChrome
          label={props.tabs.label}
          tabs={props.tabs.tabs}
          activeIndex={props.tabs.activeIndex}
          onActiveIndexChange={props.tabs.onActiveIndexChange}
        />
        {props.expandAction ? (
          <CardExpandButton
            onClick={props.expandAction.onClick}
            ariaLabel={props.expandAction.ariaLabel}
          />
        ) : null}
      </div>
      {props.description != null ? (
        <CardDescription className="col-span-2">{props.description}</CardDescription>
      ) : null}
    </>
  );
}

export function DashboardTabbedBreakdownCard(props: {
  title: string;
  isEmpty: boolean;
  empty: EmptyState;
  tabs: TabbedHeaderTabs;
  expandAction?: ExpandAction;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Card className={cn(dashboardCardRootClass, props.className)}>
      <CardHeader
        className={cn(dashboardCardHeaderClass, dashboardTabbedCardHeaderClass)}
      >
        <DashboardTabbedCardHeaderContent
          title={props.title}
          tabs={props.tabs}
          expandAction={props.expandAction}
        />
      </CardHeader>
      {props.isEmpty ? (
        <CardContent className={dashboardCardContentDefaultClass}>
          <EmptyRows icon={props.empty.icon} title={props.empty.title} hint={props.empty.hint} />
        </CardContent>
      ) : (
        <CardContent className={dashboardCardContentListClass}>
          {props.children}
        </CardContent>
      )}
    </Card>
  );
}

function EmptyRows(props: { icon: HugeiconsProp; title: string; hint?: string }) {
  return (
    <div className="flex min-h-32 flex-col items-center justify-center gap-2 text-center text-muted-foreground">
      <HugeiconsIcon icon={props.icon} className="size-5" strokeWidth={1.7} />
      <p className="text-sm font-medium text-foreground">{props.title}</p>
      {props.hint ? <p className="max-w-64 text-xs">{props.hint}</p> : null}
    </div>
  );
}
