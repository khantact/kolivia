"use client";
import { motion } from "framer-motion";
export default function Template({ children }: { children: React.ReactNode }) {
	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.8 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{
				duration: 0.3,
				delay: 0.2,
				ease: [0, 0.71, 0.2, 1.01],
			}}
		>
			{children}
		</motion.div>
	);
}
