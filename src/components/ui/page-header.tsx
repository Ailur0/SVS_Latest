interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

const PageHeader = ({ title, subtitle }: PageHeaderProps) => (
  <div className="relative overflow-hidden bg-gradient-to-br from-primary/12 via-primary/5 to-accent/8 pt-[72px]">
    {/* Top accent bar */}
    <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary via-primary/70 to-transparent" />

    {/* Subtle decorative circle */}
    <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-primary/5 pointer-events-none" />
    <div className="absolute -right-8 -bottom-12 w-40 h-40 rounded-full bg-accent/5 pointer-events-none" />

    <div className="container mx-auto px-4 py-10 md:py-12 relative z-10">
      <h1 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
        {title}
      </h1>
      {subtitle && (
        <p className="text-muted-foreground mt-2 max-w-2xl text-sm md:text-base leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>

    {/* Bottom border */}
    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-primary/30 via-border to-transparent" />
  </div>
);

export default PageHeader;
