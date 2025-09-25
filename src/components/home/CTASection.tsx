import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ScrollAnimation } from '@/components/ui/scroll-animation';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const CTASection = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-svs-purple" />
      
      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)`,
        }} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <ScrollAnimation animation="fade-up" className="text-center">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-semibold">
              GET STARTED TODAY
            </span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Ready to Elevate Your Packaging?
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto">
            Partner with India's trusted leader in plastic packaging solutions. 
            Let's create something exceptional together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 px-8 py-6 text-lg font-semibold"
              onClick={() => {
                toast({
                  title: 'Request Quote',
                  description: 'Taking you to the quote request form',
                });
                navigate('/quote');
              }}
            >
              Get Custom Quote
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-6 text-lg"
              onClick={() => {
                toast({
                  title: 'Schedule Consultation',
                  description: 'Connecting you with our sales team',
                });
                navigate('/contact');
              }}
            >
              Schedule Consultation
            </Button>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-12 pt-12 border-t border-white/20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">20+</div>
                <div className="text-white/80 text-sm">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">500+</div>
                <div className="text-white/80 text-sm">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">10K+</div>
                <div className="text-white/80 text-sm">Daily Production</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">ISO</div>
                <div className="text-white/80 text-sm">Certified Quality</div>
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default CTASection;