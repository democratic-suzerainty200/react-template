// This file is fadein animation.

import { motion } from "framer-motion"
import type { HTMLMotionProps } from "framer-motion"

export function FadeinAnimation({ children, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        bounce: 0,

        // It is difficult for me to adjust these values!
        stiffness: 150,
        damping: 20
      }}

      {...props}
    >
      {children}
    </motion.div>
  )
}
