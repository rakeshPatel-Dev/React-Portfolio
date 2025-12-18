'use client';
import { motion, useReducedMotion } from 'motion/react';
import { SkillCard } from '@/components/ui/grid-feature-cards';
import { skills } from '@/data/skills';


export default function DemoOne() {
  return (
    <section className="py-10">
      <div className="mx-auto w-full max-w-5xl space-y-8">
        <AnimatedContainer className=" mb-8 text-left">
          <h2 className="text-2xl heading-bold font-bold tracking-wide text-balance">
            Skills
          </h2>
        </AnimatedContainer>

        <AnimatedContainer
          delay={0.4}
          className="grid grid-cols-1 divide-x divide-y rounded-2xl divide-dashed border border-dashed sm:grid-cols-2 md:grid-cols-3"
        >
          {skills.map((skill, i) => (
            <SkillCard key={i} skill={skill} />
          ))}
        </AnimatedContainer>
      </div>
    </section>
  );
}

type ViewAnimationProps = {
  delay?: number;
  className?: React.ComponentProps<typeof motion.div>['className'];
  children: React.ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return children;
  }

  return (
    <motion.div
      initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
      whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
