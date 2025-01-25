import * as React from 'react'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'
import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/start'

import logo from '../../public/fofx.svg?url'

// Below is an example for a post handler for a route

// I need to get the path params to get the post id
// Also reference the lofi academy code cause since this is just vite, I think I can
// use their glob import methods

const workshops = [
  {
    title: 'Cybertron 2.0',
    slug: 'cybertron',
    lessonInfo: '28 Exercises = 7 Lessons(4 Exercises Per Lesson)',
    description:
      'Learn function composition through mini exercies using Ramdajs map, filter reduce, compose and more.',
    href: '/workshops/cybertron',
  },
]

export const Route = createFileRoute('/workshops/')({
  component: RouteComponent,
})

function RouteComponent() {
  const state = Route.useLoaderData()
  // would use loader data here
  return (
    <div className="left-0 top-0 -z-10 h-full w-full overflow-x-clip">
      <section className="w-full px-6 pb-12 pt-16 sm:pb-20 sm:pt-32">
        <div className="fade animate-fade absolute left-0 top-0 -z-10 h-full w-full overflow-x-clip">
          <div
            className="parallax-element absolute top-0 flex h-max w-full transform-gpu items-end justify-end"
            style={{
              transform: 'translateY(-73.2px) translate3d(0px, 0px, 0px)',
            }}
          >
            <img
              alt="Satellite"
              className="homepageBounce mr-[5%] mt-[20%]"
              height="400"
              src={logo}
              loading="lazy"
              width="400"
            />
          </div>
        </div>
        <header>
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 sm:gap-10">
            <h1 className="text-balance text-5xl font-[800] leading-[1] -tracking-[2.5px] [@media(max-width:500px)]:text-5xl">
              Functional Programming Foundations
            </h1>
            <h2 className="reveal animate-revealHero2 -mt-2 text-balance text-xl font-medium sm:-mt-4">
              A collection of professional, exercise-driven, in-depth,
              self-paced <br className="hidden lg:inline" />
              TypeScript workshops for you to achieve TypeScript wizardry.
              <br className="hidden lg:inline" />
            </h2>
          </div>
        </header>
      </section>
      <section className="relative flex w-full gap-14 px-6 pt-0 sm:pt-0">
        <div
          className="flex w-full flex-col items-start justify-between max-w-7xl mx-auto"
          style={{ gap: '64px' }}
        >
          <div className="z-20 w-full items-stretch gap-8 max-w-3xl flex flex-col">
            {workshops.map((workshop) => (
              <a
                className="reveal animate-revealContent group relative flex flex-col overflow-hidden rounded-xl border border-neutral-800 transition-colors duration-300 ease-out hover:cursor-pointer"
                rel="prefetch"
                href={workshop.href}
                style={{ animationDuration: '2s', animationDelay: '1s' }}
                key={workshop.slug}
              >
                <h3 className="mb-4 mt-6 px-6 text-4xl font-semibold">
                  {workshop.title}
                </h3>
                <p className="relative flex max-w-xl grow px-6 text-base font-normal">
                  {workshop.lessonInfo}
                </p>
                <p className="font-regular my-6 px-6 text-base font-normal opacity-90 tracking-wide text-balance">
                  {workshop.description}
                </p>
                <div className="absolute bottom-2 right-2 flex size-8 items-center justify-center rounded-full bg-white text-black opacity-0 transition-opacity sm:group-hover:opacity-100">
                  <span className="*:ease-bounce relative flex size-5 items-center justify-center overflow-hidden *:transition-transform *:duration-[400ms]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="absolute -translate-x-5 group-active:translate-x-0 sm:group-hover:translate-x-0"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75a4.5 4.5 0 0 1-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 1 1-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 0 1 6.336-4.486l-3.276 3.276a3.004 3.004 0 0 0 2.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.867 19.125h.008v.008h-.008v-.008Z"
                      />
                    </svg>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
    // <div classNameName="left-0 top-0 -z-10 h-full w-full overflow-x-clip">
    //   <section classNameName="w-full px-6 pb-12 pt-16 sm:pb-20 sm:pt-32">
    //     <header style={{ textWrap: "balance" }}>
    //       <div classNameName="flex flex-col gap-6 sm:gap-10">
    //         <h1 classNameName="mx-auto max-w-5xl text-center text-7xl font-[800] sm:text-[80px] [@media(max-width:500px)]:text-5xl">
    //           {/* {title} */}
    //         </h1>
    //         <h2 classNameName="mx-auto max-w-3xl text-balance text-xl font-medium ">
    //           {/* {excerpt} */}
    //         </h2>
    //       </div>
    //     </header>
    //   </section>
    //   <section classNameName="relative z-10 flex w-full gap-14 px-6 sm:pb-16">
    //     <div classNameName="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-center gap-10 lg:flex-nowrap lg:justify-between">
    //       <div classNameName="prose  prose-img:rounded-xl z-20 mx-auto w-5/6 max-w-3xl">
    //         <div>
    //           {state.map((post) => (
    //             <ContentCard key={post.slug} post={post} />
    //           ))}
    //         </div>
    //       </div>
    //     </div>
    //   </section>
    // </div>
  )
}
