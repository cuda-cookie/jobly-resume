import { ReactNode } from "react";
import Client from "./client";

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default function DashboardLayout({ children }: Props) {
  return <Client>{children}</Client>;
}
