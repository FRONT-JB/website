"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";

import { useRouter } from "next/navigation";

export default function NotFound() {
  const { back } = useRouter();
  return (
    <main className="flex w-full flex-col items-center justify-center py-8 sm:py-16">
      <h1 className="mb-4 text-2xl font-bold">Not Found</h1>

      <p className="text-muted-foreground mb-8 text-sm">
        페이지를 찾을 수 없습니다.
      </p>

      <button
        onClick={back}
        className={cn(buttonVariants({ color: "primary" }))}
      >
        돌아가기
      </button>
    </main>
  );
}
