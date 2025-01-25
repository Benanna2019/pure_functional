import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { api } from "../../convex/_generated/api";
import fofx from "../../public/fofx.svg?url";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  // const { data } = useSuspenseQuery(convexQuery(api.tasks.get, {}));

  return (
    <div className="pointer-events-none left-0 top-0 -z-10 h-full w-full overflow-x-clip">
      <section className="min-h-screen w-full px-6 pb-12 pt-16 sm:pb-20 sm:pt-52">
        <div className="fade animate-fade pointer-events-none absolute left-0 top-0 -z-10 h-full w-full overflow-x-clip">
          <div
            className="parallax-element absolute top-0 flex h-max w-full transform-gpu items-end justify-end"
            style={{
              transform: "translateY(-73.2px) translate3d(0px, 0px, 0px)",
            }}
          >
            <img
              alt="Satellite"
              className="homepageBounce mr-[15%] mt-[20%]"
              height="400"
              src={fofx}
              loading="lazy"
              width="400"
            />
          </div>
        </div>
        <header>
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 sm:gap-10">
            <h1 className="reveal animate-revealHero1 text-balance text-4xl font-[800] leading-[1] -tracking-[2.5px] text-black text-[40px] sm:text-[60px] ">
              <span className=" text-2xl sm:text-[50px] tracking-normal font-normal">
                Become a{" "}
              </span>{" "}
              Avatar
              <span className="text-2xl sm:text-[50px] pl-2 tracking-normal font-normal">
                of{" "}
              </span>{" "}
              <br className="hidden lg:inline" />
              Functional Programming
            </h1>
            <h2 className="reveal animate-revealHero2 -mt-2 text-balance text-xl sm:text-2xl font-medium text-black sm:-mt-4">
              Compose and bend the flow of functions{" "}
              <br className="hidden lg:inline" />
              to build elegant applications.
              <br className="hidden lg:inline" />
            </h2>
            {/* <div
					className="reveal animate-revealHero3 flex flex-col gap-2 sm:items-center [@media(min-width:340px)]:flex-row"
				>
					<a
						aria-label="Get started for free"
						className="group flex w-max items-center gap-1 rounded-full border-white bg-neutral-200 px-3.5 py-2 text-sm font-semibold text-neutral-800 transition-colors sm:hover:bg-white sm:hover:text-black"
						href="">Get started for free</a
					>
				</div> */}
          </div>
        </header>
      </section>
    </div>
  );
}
