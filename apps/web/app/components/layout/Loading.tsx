"use client";

import { useIntl } from "@/app/lib/intl/context";

export function Loading() {
  const { dictionary } = useIntl();
  const message = dictionary.loading;
  return <div className="min-h-screen font-mono flex items-center justify-center">{message}</div>;
}
