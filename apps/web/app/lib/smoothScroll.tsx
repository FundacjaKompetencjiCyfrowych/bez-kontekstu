"use client";

import { useGSAP } from "@gsap/react";
import { ComponentPropsWithRef, FC } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export const SmoothScroll: FC<ComponentPropsWithRef<"div">> = ({ children, ...props }) => {
  useGSAP(() => {
    ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1,
      effects: true,
    });
  });

  return (
    <div id="smooth-wrapper" {...props}>
      <div id="smooth-content">{children}</div>
    </div>
  );
};
