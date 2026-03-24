import ScrollAnimationWrapper from "./ScrollAnimationWrapper";

const stats = [
  { value: "19+", label: "Years of Excellence" },
  { value: "86%", label: "Patient Satisfaction" },
  { value: "200+", label: "Specialist Doctors" },
  { value: "21", label: "Departments" },
];

const StatsRow = () => {
  return (
    <section id="stats-row" className="py-16 bg-popover border-b border-border">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <ScrollAnimationWrapper key={stat.label} delay={i * 0.15}>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-serif text-accent mb-2">{stat.value}</p>
                <p className="text-xs tracking-[0.2em] uppercase font-body text-muted-foreground">{stat.label}</p>
              </div>
            </ScrollAnimationWrapper>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsRow;
