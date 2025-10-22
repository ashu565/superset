"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import { useRef } from "react";

interface HeroParallaxProps {
	children: ReactNode;
	speed?: number;
	className?: string;
}

export function HeroParallax({
	children,
	speed = 0.5,
	className,
}: HeroParallaxProps) {
	const ref = useRef<HTMLDivElement>(null);

	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start start", "end start"],
	});

	const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

	return (
		<div ref={ref} className={className}>
			<motion.div style={{ opacity }}>{children}</motion.div>
		</div>
	);
}
