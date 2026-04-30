"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function GoDashboard({
  children,
  type = "dashboard",
}: {
  children: React.ReactNode;
  type?: "dashboard" | "templates" | "resumes";
}) {
  const router = useRouter();

  const routeMap = {
    dashboard: "/dashboard",
    resumes: "/dashboard/resumes",
    templates: "/dashboard/templates"
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        router.push(routeMap[type]);
      }}
    >
      {children}
    </form>
  );
}
