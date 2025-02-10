import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/utils/cn";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="w-full py-8 sm:py-16">
      <h1 className="mb-4 text-2xl font-semibold">Not Found</h1>

      <p className="mb-8 text-sm text-muted-foreground">
        페이지를 찾을 수 없습니다.
      </p>

      <Link href="/" className={cn(buttonVariants({ color: "primary" }))}>
        홈으로
      </Link>
    </main>
  );
}
