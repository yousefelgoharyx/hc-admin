import { motion } from "framer-motion";
const variants = {
  hidden: {
    opacity: 0,
    y: 100,
    scale: 0.8,
  },
  enter: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  exit: {
    opacity: 0,
    y: -100,
    scale: 0.8,
  },
};

export default function AnimationWrapper({ children }) {
  return (
    <motion.div
      as={motion.div}
      variants={variants} // Pass the variant object into Framer Motion
      initial="hidden" // Set the initial state to variants.hidden
      animate="enter" // Animated state to variants.enter
      exit="exit" // Exit state (used later) to variants.exit
      transition={{ type: "spring" }} // Set the transition to linear
    >
      {children}
    </motion.div>
  );
}
