import type { Metadata } from "next";
import { domain } from "@config";
import clsx from "clsx";

export const metadata: Metadata = {
  alternates: {
    canonical: domain,
  },
};

export default function HomePage() {
  return (
    <main className="h-full overflow-x-clip">
      <div className="relative mx-auto flex h-full max-w-[1400px] flex-col px-3 py-16 md:px-6 lg:py-44">
        <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#73737320_1px,transparent_1px),linear-gradient(to_bottom,#73737320_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_80%,transparent_100%)]" />

        <div
          className={clsx(
            "relative z-[2] flex w-full flex-col gap-4 px-[1rem]",
            "items-center text-center",
          )}
        >
          <p
            className={
              "flex flex-col items-center text-3xl font-bold lg:flex-row xl:text-5xl"
            }
          >
            오늘도 열심히 삽질중
          </p>

          <p
            className={clsx(
              "max-w-[450px] text-xl text-muted-foreground",
              "md:max-w-[650px]",
            )}
          >
            에러 로그부터 새로 배운 것까지, 개발하다 마주친 모든 순간을
            기록합니다.
          </p>
        </div>
      </div>
    </main>
  );
}
