import { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default function WorkbenchLayout({ children }: Props) {
  return (
    <>
      {children}
      <Toaster position="top-center" richColors />
    </>
  );
}
