import type { Metadata } from "next";
import { domain } from "@config";
import clsx from "clsx";
import Gradient from "@/components/ui/gradient";
import HeroGradient from "@static/hero.svg";

export const metadata: Metadata = {
  alternates: {
    canonical: domain,
  },
};

export default function HomePage() {
  return (
    <main className="h-full overflow-x-clip">
      <div className="mx-auto flex h-full max-w-[1400px] flex-col px-3 md:px-6">
        <div
          className={clsx(
            "relative z-[2] mt-[6rem] flex w-full flex-col gap-12 px-[1rem] md:mt-[10rem] xl:mt-[14rem]",
            "items-center text-center",
          )}
        >
          <Gradient
            src={HeroGradient}
            className="absolute -right-0 -top-[200px] -z-[1] hidden w-full min-w-[800px] lg:-right-[300px]"
          />
          <h1
            className={
              "flex flex-col items-center text-3xl font-bold lg:flex-row lg:text-5xl xl:text-7xl"
            }
          >
            오늘도&nbsp;
            <span className="flex items-center justify-center">
              <span
                className={clsx(
                  "mx-1 bg-gradient-to-r from-blue-400 via-green-300 to-blue-400 bg-clip-text text-transparent max-lg:my-2 max-lg:block",
                )}
              >
                Afaik
              </span>
              와
            </span>
            &nbsp; 함께 열심히 삽질 중
          </h1>

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
