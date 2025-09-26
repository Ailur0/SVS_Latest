import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Package, Truck, Shield, Palette, HelpCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  quickReplies?: string[];
}

interface Context {
  lastIntent?: string;
  conversationHistory: string[];
  userProfile?: {
    name?: string;
    interests: string[];
  };
}

// Advanced NLP Intent Recognition with Context
const intents = {
  greeting: {
    patterns: ["hello", "hi", "hey", "good morning", "good afternoon", "greetings", "howdy", "sup"],
    responses: [
      "Hello! Welcome to BucketPro Solutions. I'm Alex, your virtual assistant. How can I help you today?",
      "Hi there! I'm Alex, here to assist you with our premium bucket solutions. What brings you here today?",
      "Greetings! I'm Alex from BucketPro. Ready to find the perfect packaging solution for you!",
    ],
    quickReplies: ["View Products", "Get Quote", "Learn About Quality", "Custom Solutions"],
  },
  products: {
    patterns: ["products", "bucket", "containers", "what do you sell", "catalog", "offerings", "items", "stock"],
    responses: [
      "Our premium bucket solutions include:\n\n🎨 Paint Buckets (1L to 20L)\n🍽️ Food-Grade Containers\n🏭 Industrial Storage Buckets\n✨ Custom Solutions\n\nEach product is crafted with precision and quality. Which category interests you?",
    ],
    quickReplies: ["Paint Buckets", "Food Containers", "Industrial", "Custom Solutions"],
  },
  pricing: {
    patterns: ["price", "cost", "how much", "quote", "pricing", "rates", "expensive", "cheap", "budget"],
    responses: [
      "I'll help you get the best pricing! Our rates depend on:\n\n• Order quantity\n• Product specifications\n• Customization level\n\nLet me connect you with our pricing team for a personalized quote. Click below to get started!",
    ],
    quickReplies: ["Request Quote", "View Bulk Discounts", "Sample Pricing"],
  },
  quality: {
    patterns: ["quality", "certification", "iso", "standards", "testing", "safety", "durable", "reliable"],
    responses: [
      "Quality is our promise! We maintain:\n\n✅ ISO 9001:2015 Certification\n✅ Food-Grade Materials (FDA Approved)\n✅ 100% Quality Inspection\n✅ Advanced Testing Lab\n✅ 5-Year Durability Guarantee\n\nEvery bucket undergoes 15+ quality checks!",
    ],
    quickReplies: ["View Certifications", "Testing Process", "Quality Guarantee"],
  },
  customization: {
    patterns: ["custom", "personalize", "design", "logo", "branding", "color", "unique", "special"],
    responses: [
      "Let's create something unique for you! Our customization options:\n\n🎨 Unlimited Color Options\n🖼️ Logo & Brand Printing\n📐 Custom Sizes & Shapes\n✨ Special Features & Finishes\n🎯 Dedicated Design Team\n\nWe've helped 500+ brands create their perfect packaging!",
    ],
    quickReplies: ["Design Process", "View Examples", "Start Customization"],
  },
  contact: {
    patterns: ["contact", "phone", "email", "reach", "talk", "speak", "call", "message"],
    responses: [
      "I'm here 24/7, but you can also reach our human team:\n\n📧 Email: support@bucketpro.com\n📞 Phone: +1-234-567-8900\n💬 Live Chat: Available 9 AM - 6 PM EST\n📍 Visit Us: 123 Industrial Ave, Manufacturing City\n\nHow would you prefer to connect?",
    ],
    quickReplies: ["Call Now", "Send Email", "Schedule Meeting", "Visit Us"],
  },
  delivery: {
    patterns: ["delivery", "shipping", "lead time", "how long", "when", "fast", "express", "tracking"],
    responses: [
      "Fast & reliable delivery guaranteed!\n\n🚀 Express: 24-48 hours (stock items)\n📦 Standard: 5-7 business days\n🎨 Custom Orders: 10-15 business days\n🌍 International: 7-21 days\n\nFREE shipping on orders over $1000! Real-time tracking included.",
    ],
    quickReplies: ["Track Order", "Shipping Rates", "Express Options"],
  },
  sustainability: {
    patterns: ["eco", "environment", "recycle", "sustainable", "green", "biodegradable"],
    responses: [
      "We're committed to a greener future! 🌱\n\n♻️ 100% Recyclable Materials\n🌿 Bio-based Options Available\n🏭 Carbon-Neutral Manufacturing\n📦 Eco-Friendly Packaging\n🌍 Zero-Waste Production Goal by 2025\n\nJoin us in protecting our planet!",
    ],
    quickReplies: ["Eco Products", "Sustainability Report", "Green Initiatives"],
  },
  samples: {
    patterns: ["sample", "test", "trial", "demo", "example", "free"],
    responses: [
      "Try before you buy! Our sample program:\n\n🎁 FREE samples for qualified businesses\n📦 3-5 sample products per request\n🚚 Ships within 24 hours\n✨ Includes custom printing preview\n\nPerfect for testing quality and fit!",
    ],
    quickReplies: ["Request Samples", "Sample Gallery", "Terms & Conditions"],
  },
  warranty: {
    patterns: ["warranty", "guarantee", "return", "refund", "defect", "problem"],
    responses: [
      "Your satisfaction is guaranteed!\n\n🛡️ 2-Year Manufacturing Warranty\n✅ 30-Day Money-Back Guarantee\n🔄 Easy Returns Process\n🏆 99.8% Customer Satisfaction Rate\n\nWe stand behind every product we make!",
    ],
    quickReplies: ["Warranty Details", "Return Process", "File Claim"],
  },
  minimum: {
    patterns: ["minimum", "moq", "smallest", "bulk", "quantity", "order size"],
    responses: [
      "Flexible ordering to suit your needs:\n\n📦 Standard Products: 250 units (50% lower!)\n🎨 Custom Products: 500 units\n🎁 Sample Orders: 1-10 units\n🏢 Enterprise: Unlimited\n\n💡 Pro tip: Save 20% on orders over 5000 units!",
    ],
    quickReplies: ["Calculate Savings", "Bulk Pricing", "Small Orders"],
  },
  thanks: {
    patterns: ["thank", "thanks", "appreciate", "helpful", "great", "awesome", "good"],
    responses: [
      "You're welcome! It's my pleasure to help. Is there anything else you'd like to know?",
      "Happy to help! Feel free to ask if you have more questions!",
      "Glad I could assist! Don't hesitate to reach out again.",
    ],
    quickReplies: ["Browse Products", "Get Quote", "Contact Sales"],
  },
  goodbye: {
    patterns: ["bye", "goodbye", "see you", "later", "exit", "quit"],
    responses: [
      "Thanks for chatting with me! Have a great day! 👋",
      "Goodbye! Remember, I'm here 24/7 whenever you need help!",
      "See you soon! Don't forget to check out our latest products!",
    ],
  },
  default: {
    patterns: [],
    responses: [
      "I'm here to help! You can ask me about:\n\n📦 Products & Catalog\n💰 Pricing & Quotes\n🏆 Quality Standards\n🎨 Customization\n🚚 Delivery Options\n\nWhat interests you?",
      "I didn't quite catch that. Try asking about our products, pricing, or click one of the options below!",
    ],
    quickReplies: ["View Products", "Get Pricing", "Quality Info", "Contact Us"],
  },
};

// Security: Input sanitization
const sanitizeInput = (input: string): string => {
  // Remove potentially harmful characters and scripts
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/[<>]/g, '')
    .trim()
    .slice(0, 500); // Limit input length
};

// Advanced NLP Processing with Context and Sentiment
const processMessage = (input: string, context: Context): { response: string; quickReplies?: string[]; intent: string } => {
  const sanitized = sanitizeInput(input);
  const lowerInput = sanitized.toLowerCase();
  
  // Sentiment analysis
  const positiveSentiment = ["love", "great", "amazing", "excellent", "perfect", "best"].some(word => lowerInput.includes(word));
  const negativeSentiment = ["bad", "terrible", "awful", "hate", "worst", "problem"].some(word => lowerInput.includes(word));
  
  // Intent scoring system
  let bestMatch = { intent: "default", score: 0 };
  
  for (const [key, intent] of Object.entries(intents)) {
    if (key === "default") continue;
    
    let score = 0;
    intent.patterns.forEach(pattern => {
      if (lowerInput.includes(pattern.toLowerCase())) {
        score += pattern.length; // Longer matches get higher scores
      }
    });
    
    // Boost score based on context
    if (context.lastIntent === key) {
      score *= 1.2; // Slight boost for continued conversation
    }
    
    if (score > bestMatch.score) {
      bestMatch = { intent: key, score };
    }
  }
  
  // Handle negative sentiment with care
  if (negativeSentiment && bestMatch.intent !== "warranty") {
    return {
      response: "I understand you might be facing some concerns. Let me connect you with our support team who can help resolve this quickly. Meanwhile, how can I assist you?",
      quickReplies: ["Talk to Support", "File Complaint", "View Warranty"],
      intent: "support"
    };
  }
  
  const selectedIntent = intents[bestMatch.intent as keyof typeof intents];
  const response = selectedIntent.responses[Math.floor(Math.random() * selectedIntent.responses.length)];
  
  return {
    response,
    quickReplies: 'quickReplies' in selectedIntent ? selectedIntent.quickReplies : undefined,
    intent: bestMatch.intent
  };
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm Alex from BucketPro Solutions. I'm here to help you find the perfect packaging solution. What can I do for you today?",
      sender: "bot",
      timestamp: new Date(),
      quickReplies: ["View Products", "Get Quote", "Learn About Quality", "Custom Solutions"],
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [context, setContext] = useState<Context>({
    conversationHistory: [],
    userProfile: { interests: [] }
  });
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    
    // Update context
    const newContext = {
      ...context,
      conversationHistory: [...context.conversationHistory, input].slice(-10) // Keep last 10 messages
    };
    setContext(newContext);

    // Simulate processing time
    setTimeout(() => {
      const result = processMessage(input, newContext);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: result.response,
        sender: "bot",
        timestamp: new Date(),
        quickReplies: result.quickReplies,
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
      
      // Update context with bot's intent
      setContext(prev => ({ ...prev, lastIntent: result.intent }));
    }, 1000);
  };
  
  const handleQuickReply = (reply: string) => {
    setInput(reply);
    handleSend();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg",
          "bg-primary hover:bg-primary/90 transition-all duration-300",
          "hover:scale-110",
          isOpen && "scale-0 opacity-0"
        )}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Chat Window */}
      <div
        className={cn(
          "fixed z-50 bg-background border border-border shadow-2xl",
          "transition-all duration-300 origin-bottom-right",
          // Mobile: Full screen
          "inset-x-0 bottom-0 top-0 rounded-none",
          // Desktop: Fixed position widget
          "sm:inset-auto sm:bottom-6 sm:right-6 sm:w-96 sm:rounded-2xl",
          "sm:max-w-[calc(100vw-3rem)]",
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-primary text-primary-foreground sm:rounded-t-2xl">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-sm sm:text-base">Alex - BucketPro AI</h3>
              <p className="text-xs opacity-90 hidden sm:block">Your packaging expert</p>
            </div>
          </div>
          <Button
            onClick={() => setIsOpen(false)}
            variant="ghost"
            size="icon"
            className="text-primary-foreground hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 sm:h-96 p-3 sm:p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3",
                  message.sender === "user" && "flex-row-reverse"
                )}
              >
                <div
                  className={cn(
                    "w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0",
                    message.sender === "bot"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  )}
                >
                  {message.sender === "bot" ? (
                    <Bot className="h-4 w-4 sm:h-5 sm:w-5" />
                  ) : (
                    <User className="h-4 w-4 sm:h-5 sm:w-5" />
                  )}
                </div>
                <div
                  className={cn(
                    "max-w-[80%] p-3 rounded-2xl",
                    message.sender === "bot"
                      ? "bg-muted rounded-tl-none"
                      : "bg-primary text-primary-foreground rounded-tr-none"
                  )}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            
            {/* Quick Replies */}
            {messages[messages.length - 1]?.quickReplies && 
             messages[messages.length - 1]?.sender === "bot" && 
             !isTyping && (
              <div className="flex flex-wrap gap-2 mt-2 px-2">
                {messages[messages.length - 1].quickReplies?.map((reply, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickReply(reply)}
                    className="text-xs hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    {reply}
                  </Button>
                ))}
              </div>
            )}
            
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                  <Bot className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div className="bg-muted p-3 rounded-2xl rounded-tl-none">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:0ms]"></span>
                    <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:150ms]"></span>
                    <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:300ms]"></span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-4 border-t border-border">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1"
              disabled={isTyping}
            />
            <Button
              onClick={handleSend}
              size="icon"
              disabled={!input.trim() || isTyping}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-2">
            Powered by AI • Instant Responses
          </p>
        </div>
      </div>
    </>
  );
}