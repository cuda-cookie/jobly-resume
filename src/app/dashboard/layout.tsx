import { ReactNode } from "react";
import Client from "./client";

type Props = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  return <Client>{children}</Client>;
}
