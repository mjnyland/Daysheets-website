"use client";

import { useMemo, useState } from "react";
import { Section } from "@/components/containers/Section";

type TierKey = "free" | "plus" | "pro" | "teams";

type Row = {
  label: string;
  tooltip?: string;
  underline?: boolean;
  values: Record<TierKey, boolean | string | null>;
};

type Group = {
  title: string;
  rows: Row[];
};

const Check = () => (
  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full text-blue-600">
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
      <path
        d="M20 7L10 17L5 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
);

const Dash = () => <span className="text-neutral-400">—</span>;

const Tooltip = ({
  text,
  children,
}: {
  text: string;
  children: React.ReactNode;
}) => {
  return (
    <span className="relative inline-flex items-center group">
      <span
        tabIndex={0}
        className="cursor-default underline decoration-dotted decoration-blue-500 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
      >
        {children}
      </span>
      <span
        role="tooltip"
        className="pointer-events-none absolute left-0 top-full z-20 mt-2 hidden w-80 max-w-[80vw] rounded-2xl bg-neutral-900 px-4 py-3 text-[13px] leading-relaxed text-white shadow-lg group-hover:block group-focus-within:block"
      >
        {text}
      </span>
    </span>
  );
};

const groups: Group[] = [
  {
    title: "Usage",
    rows: [
      {
        label: "Admin seats included",
        underline: true,
        tooltip:
          "Admin seats can manage billing, members, and global settings.",
        values: { free: "1", plus: "1", pro: "1", teams: "Unlimited per org" },
      },
      {
        label: "Collaborate with other orgs",
        values: { free: null, plus: true, pro: true, teams: null },
      },
      {
        label: "Mac & Mobile Viewers per tour",
        values: {
          free: "Up to 5",
          plus: "Up to 25",
          pro: "Up to 50",
          teams: "Up to 100",
        },
      },
    ],
  },
  {
    title: "Features",
    rows: [
      {
        label: "Create tours on MacOS",
        underline: true,
        tooltip:
          "Download the native Mac app for speedy tour creation. Maintain details with keyboard shortcuts, imports and exports.",
        values: { free: null, plus: true, pro: true, teams: true },
      },
      {
        label: "Create tours on iOS",
        values: { free: null, plus: true, pro: true, teams: true },
      },
      {
        label: "Edit tours on iOS",
        values: { free: null, plus: true, pro: true, teams: true },
      },
      {
        label: "Offline Editing",
        values: { free: null, plus: true, pro: true, teams: null },
      },
      {
        label: "Calculated Drive Times",
        values: { free: null, plus: true, pro: true, teams: null },
      },
      {
        label: "Add Flights",
        values: { free: null, plus: true, pro: true, teams: true },
      },
      {
        label: "Add Hotels",
        values: { free: null, plus: true, pro: true, teams: true },
      },
      {
        label: "Guest Lists",
        values: { free: null, plus: true, pro: true, teams: true },
      },
      {
        label: "Ground Transfers",
        values: { free: null, plus: true, pro: true, teams: true },
      },
      {
        label: "Create Notes",
        values: { free: null, plus: true, pro: true, teams: true },
      },
      {
        label: "Maintain Travel Profiles",
        values: { free: null, plus: null, pro: true, teams: true },
      },
      {
        label: "Export PDFs",
        values: { free: null, plus: null, pro: true, teams: true },
      },
      {
        label: "Create Private Notes",
        values: { free: null, plus: null, pro: true, teams: true },
      },
      {
        label: "Create Personnel Groups",
        values: { free: null, plus: null, pro: true, teams: true },
      },
      {
        label: "Create Group Tags",
        values: { free: null, plus: null, pro: true, teams: true },
      },
      {
        label: "Visibility",
        values: { free: null, plus: null, pro: true, teams: true },
      },
      {
        label: "Calendar Feeds",
        values: { free: null, plus: null, pro: true, teams: true },
      },
      {
        label: "Import Personnel",
        values: { free: null, plus: null, pro: true, teams: true },
      },
      {
        label: "Import Flights",
        values: { free: null, plus: null, pro: true, teams: true },
      },
    ],
  },
  {
    title: "Support",
    rows: [
      {
        label: "Email & Text Support",
        values: { free: true, plus: true, pro: true, teams: true },
      },
      {
        label: "Phone Support",
        values: { free: null, plus: null, pro: true, teams: true },
      },
      {
        label: "Priority Support",
        values: { free: null, plus: null, pro: true, teams: true },
      },
      {
        label: "Dedicated Slack Channel",
        values: { free: null, plus: null, pro: null, teams: true },
      },
      {
        label: "Onboarding",
        values: { free: null, plus: null, pro: null, teams: true },
      },
    ],
  },
];

const tierOrder: { key: TierKey; label: string }[] = [
  { key: "free", label: "Free" },
  { key: "plus", label: "Plus" },
  { key: "pro", label: "Pro" },
  { key: "teams", label: "Teams" },
];

export default function PricingFeatureTable() {
  const [activeTier, setActiveTier] = useState<TierKey>("plus");

  const tierIndex = useMemo(
    () => tierOrder.findIndex((t) => t.key === activeTier),
    [activeTier]
  );

  const renderValue = (value: Row["values"][TierKey]) => {
    if (typeof value === "boolean") return value ? <Check /> : <Dash />;
    if (typeof value === "string")
      return <span className="text-neutral-900">{value}</span>;
    return <Dash />;
  };

  return (
    <Section
      background="muted"
      gap="xl"
      aria-label="Feature comparison"
      padded="lg"
    >
      {/* Mobile tier picker */}
      <div className="md:hidden">
        <div className="mx-auto mb-4 flex w-full max-w-xl items-center justify-between rounded-full bg-white p-1 ring-1 ring-neutral-200">
          {tierOrder.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTier(key)}
              className={[
                "flex-1 rounded-full px-4 py-2 text-sm font-medium",
                activeTier === key
                  ? "bg-blue-600 text-white"
                  : "text-neutral-700 hover:bg-neutral-50",
              ].join(" ")}
              aria-pressed={activeTier === key}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop header */}
      <div className="hidden md:block">
        <div className="grid grid-cols-5 items-end gap-2 px-2 md:px-0">
          <div />
          {tierOrder.map((t) => (
            <div
              key={t.key}
              className="text-center text-lg font-semibold text-neutral-900"
            >
              {t.label}
            </div>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="mt-2 rounded-2xl bg-white ring-1 ring-black/5">
        {groups.map((group, groupIdx) => (
          <div key={group.title}>
            <div className="border-t border-neutral-200 px-4 py-3 first:border-t-0 md:px-6">
              <h3 className="text-lg font-semibold tracking-tight">
                {group.title}
              </h3>
            </div>
            <div className="divide-y divide-neutral-100">
              {group.rows.map((row, rowIdx) => (
                <div
                  key={row.label}
                  className="grid grid-cols-2 items-center gap-4 px-4 py-3 md:grid-cols-5 md:px-6"
                >
                  {/* Label */}
                  <div className="text-[15px] text-neutral-900">
                    {row.tooltip && row.underline ? (
                      <Tooltip text={row.tooltip}>{row.label}</Tooltip>
                    ) : row.tooltip ? (
                      <Tooltip text={row.tooltip}>{row.label}</Tooltip>
                    ) : row.underline ? (
                      <span className="underline decoration-dotted decoration-blue-500 underline-offset-4">
                        {row.label}
                      </span>
                    ) : (
                      <span>{row.label}</span>
                    )}
                  </div>

                  {/* Values */}
                  {/* Mobile: single active column */}
                  <div className="md:hidden text-right">
                    {renderValue(row.values[activeTier])}
                  </div>

                  {/* Desktop: 4 columns */}
                  <div className="hidden md:block md:col-span-4">
                    <div className="grid grid-cols-4 items-center text-center gap-2">
                      {tierOrder.map((t) => (
                        <div
                          key={t.key}
                          className="flex items-center justify-center"
                        >
                          {renderValue(row.values[t.key])}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
