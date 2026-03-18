import { useState, useRef, useEffect } from "react";
import { X, Send, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const CHATBOT_IMG = "/chatbot.png";

// Quick replies that navigate to a page instead of sending as a chat message
const navRoutes: Record<string, string> = {
  "View Products": "/products",
  "Get a Quote": "/quote",
  "Request a Quote": "/quote",
  "Request Quote": "/quote",
  "Request Samples": "/quote",
  "Visit Contact Page": "/contact",
  "View Quality Page": "/quality",
  "Start Custom Project": "/quote",
  "Contact Us": "/contact",
  "Contact Sales": "/contact",
  "Contact Sales Team": "/contact",
  "Contact Support": "/contact",
  "Send Email": "/contact",
  "Get Quote": "/quote",
};

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
}

const intents = {
  greeting: {
    patterns: ["hello", "hi", "hey", "good morning", "good afternoon", "greetings", "howdy"],
    responses: [
      "Hi! I'm Bucky, SVS Polymer's virtual assistant. How can I help you today?",
      "Hello! Welcome to SVS Polymer Industries. I'm Bucky — ask me anything about our packaging solutions.",
    ],
    quickReplies: ["View Products", "Get a Quote", "Quality & Certifications", "Custom Packaging"],
  },
  products: {
    patterns: ["products", "bucket", "container", "what do you sell", "catalog", "range", "items"],
    responses: [
      "We manufacture rigid plastic packaging across three categories:\n\n🎨 Paint Containers — 100gm to 20kg, flat lid & CCD closure\n🥛 Food Grade — 100ml to 10kg round containers, BPA-free\n🔧 Lubricants — 500ml to 20L, flat lid & spout closure\n\nWhich range are you looking for?",
    ],
    quickReplies: ["Paint Containers", "Food Grade", "Lubricants", "Request Quote"],
  },
  pricing: {
    patterns: ["price", "cost", "how much", "quote", "pricing", "rates", "budget"],
    responses: [
      "Pricing depends on product type, capacity, closure style, and order quantity. For an accurate quote, please share your requirements and we'll get back to you within 24 hours.",
    ],
    quickReplies: ["Request a Quote", "Contact Sales Team"],
  },
  quality: {
    patterns: ["quality", "certification", "iso", "standards", "testing", "safety", "certified"],
    responses: [
      "Quality is central to everything we do at SVS Polymer:\n\n✅ ISO Certified Facility\n✅ Food-grade materials, BPA-free\n✅ In-process quality checks at every stage\n✅ Leak, pressure & drop impact testing\n✅ Final inspection before dispatch\n\nEvery batch meets strict quality parameters before leaving our facility.",
    ],
    quickReplies: ["View Quality Page", "Testing Procedures"],
  },
  customization: {
    patterns: ["custom", "personalise", "personalize", "design", "logo", "branding", "colour", "color", "size"],
    responses: [
      "We offer custom packaging tailored to your brand:\n\n🎨 Custom colours (Pantone matching)\n📐 Custom sizes & capacities\n🔒 Custom closure types\n🖨️ Custom printing & label design\n\nShare your requirements and our team will work with you on a solution.",
    ],
    quickReplies: ["Start Custom Project", "Contact Us"],
  },
  contact: {
    patterns: ["contact", "phone", "email", "reach", "talk", "speak", "call", "address", "location"],
    responses: [
      "You can reach us at:\n\n👤 Venkata Ramana B.\n📞 +91 96526 96819\n📧 svspolymerinds@gmail.com\n📍 Plot No. 156 & 157, Navodaya Society I.E., Phase-V, IDA, Cherlapally, Hyderabad – 500 051",
    ],
    quickReplies: ["Visit Contact Page", "Request Quote"],
  },
  delivery: {
    patterns: ["delivery", "shipping", "lead time", "how long", "dispatch", "fast"],
    responses: [
      "Lead times vary by product type and order quantity. Standard orders are typically dispatched within the agreed timeline. For urgent requirements, please contact our sales team directly — we'll do our best to accommodate.",
    ],
    quickReplies: ["Contact Sales", "Request Quote"],
  },
  sustainability: {
    patterns: ["eco", "environment", "recycle", "sustainable", "green"],
    responses: [
      "We're committed to responsible manufacturing:\n\n♻️ Recyclable PP & HDPE materials\n🏭 Waste-minimising production processes\n📦 Optimised packaging for logistics efficiency\n\nSustainability is part of our manufacturing philosophy, not just a statement.",
    ],
    quickReplies: ["Learn More", "Contact Us"],
  },
  samples: {
    patterns: ["sample", "test", "trial", "demo", "example"],
    responses: [
      "We can arrange product samples for qualified business inquiries. Please reach out via the quote form or contact our sales team with your product requirements and we'll coordinate sample dispatch.",
    ],
    quickReplies: ["Request Samples", "Contact Sales"],
  },
  minimum: {
    patterns: ["minimum", "moq", "quantity", "order size", "bulk"],
    responses: [
      "Minimum order quantities vary by product type and customisation level. Please contact our sales team with your specific requirements for an accurate MOQ and pricing.",
    ],
    quickReplies: ["Contact Sales", "Request Quote"],
  },
  thanks: {
    patterns: ["thank", "thanks", "appreciate", "helpful", "great", "perfect"],
    responses: [
      "You're welcome! Is there anything else I can help you with?",
      "Happy to help! Feel free to ask if you have more questions.",
    ],
    quickReplies: ["View Products", "Get Quote"],
  },
  goodbye: {
    patterns: ["bye", "goodbye", "see you", "later"],
    responses: [
      "Thanks for visiting SVS Polymer. Have a great day! 👋",
      "Goodbye! Feel free to come back anytime.",
    ],
  },
  default: {
    patterns: [],
    responses: [
      "I can help you with:\n\n📦 Products & Specifications\n💬 Quotes & Pricing\n🏆 Quality & Certifications\n🎨 Custom Packaging\n📍 Contact & Location\n\nWhat would you like to know?",
      "I didn't quite catch that. Try asking about our products, pricing, or quality — or click one of the options below.",
    ],
    quickReplies: ["View Products", "Get Quote", "Quality Info", "Contact Us"],
  },
};

const sanitizeInput = (input: string): string => {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/[<>]/g, '')
    .trim()
    .slice(0, 500);
};

const processMessage = (input: string, context: Context): { response: string; quickReplies?: string[]; intent: string } => {
  const sanitized = sanitizeInput(input);
  const lower = sanitized.toLowerCase();

  const negativeSentiment = ["bad", "terrible", "awful", "hate", "worst", "problem", "issue"].some(w => lower.includes(w));

  let best = { intent: "default", score: 0 };
  for (const [key, intent] of Object.entries(intents)) {
    if (key === "default") continue;
    let score = 0;
    intent.patterns.forEach(p => { if (lower.includes(p)) score += p.length; });
    if (context.lastIntent === key) score *= 1.2;
    if (score > best.score) best = { intent: key, score };
  }

  if (negativeSentiment && best.intent !== "warranty") {
    return {
      response: "I'm sorry to hear that. Please reach out to us directly and we'll do our best to help:\n\n📞 +91 96526 96819\n📧 svspolymerinds@gmail.com",
      quickReplies: ["Visit Contact Page"],
      intent: "support",
    };
  }

  const selected = intents[best.intent as keyof typeof intents];
  const response = selected.responses[Math.floor(Math.random() * selected.responses.length)];
  return {
    response,
    quickReplies: 'quickReplies' in selected ? selected.quickReplies : undefined,
    intent: best.intent,
  };
};

export default function Chatbot() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm Bucky, SVS Polymer's virtual assistant 👋\n\nAsk me about our packaging range, pricing, quality standards, or customisation options.",
      sender: "bot",
      timestamp: new Date(),
      quickReplies: ["View Products", "Get a Quote", "Quality & Certifications", "Custom Packaging"],
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [context, setContext] = useState<Context>({ conversationHistory: [] });
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (overrideInput?: string) => {
    const text = (overrideInput ?? input).trim();
    if (!text) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    const newContext: Context = {
      ...context,
      conversationHistory: [...context.conversationHistory, text].slice(-10),
    };
    setContext(newContext);

    setTimeout(() => {
      const result = processMessage(text, newContext);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: result.response,
        sender: "bot",
        timestamp: new Date(),
        quickReplies: result.quickReplies,
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
      setContext(prev => ({ ...prev, lastIntent: result.intent }));
    }, 900);
  };

  const handleQuickReply = (reply: string) => {
    const route = navRoutes[reply];
    if (route) {
      setIsOpen(false);
      navigate(route);
    } else {
      handleSend(reply);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* FAB — logo button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg",
          "bg-white border-2 border-primary overflow-hidden",
          "hover:scale-110 transition-all duration-300",
          isOpen && "scale-0 opacity-0 pointer-events-none"
        )}
        aria-label="Open chat"
      >
        <img src={CHATBOT_IMG} alt="Bucky" className="w-full h-full object-contain p-1" />
      </button>

      {/* Chat window */}
      <div
        className={cn(
          "fixed z-50 bg-background border border-border shadow-2xl flex flex-col",
          "transition-all duration-300 origin-bottom-right",
          "inset-x-0 bottom-0 top-0 rounded-none",
          "sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[400px] sm:rounded-2xl sm:max-h-[580px]",
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-primary text-primary-foreground sm:rounded-t-2xl flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
              <img src={CHATBOT_IMG} alt="Bucky" className="w-full h-full object-contain p-0.5" />
            </div>
            <div>
              <h3 className="font-semibold text-base">Bucky</h3>
              <p className="text-xs opacity-80">SVS Polymer Assistant</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Close chat"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4 overflow-y-auto" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn("flex gap-2.5", message.sender === "user" && "flex-row-reverse")}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden",
                    message.sender === "bot" ? "bg-white border-2 border-primary" : "bg-primary text-primary-foreground"
                  )}
                >
                  {message.sender === "bot" ? (
                    <img src={CHATBOT_IMG} alt="Bucky" className="w-full h-full object-contain p-0.5" />
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                </div>
                <div
                  className={cn(
                    "max-w-[78%] p-3 rounded-2xl text-sm",
                    message.sender === "bot"
                      ? "bg-muted rounded-tl-none"
                      : "bg-primary text-primary-foreground rounded-tr-none"
                  )}
                >
                  <p className="whitespace-pre-wrap leading-relaxed">{message.text}</p>
                  <p className="text-xs opacity-60 mt-1.5">
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            ))}

            {/* Quick replies */}
            {messages[messages.length - 1]?.quickReplies &&
              messages[messages.length - 1]?.sender === "bot" &&
              !isTyping && (
                <div className="flex flex-wrap gap-2 mt-1 pl-10">
                  {messages[messages.length - 1].quickReplies?.map((reply, i) => (
                    <button
                      key={i}
                      onClick={() => handleQuickReply(reply)}
                      className="px-3 py-1.5 text-xs font-medium rounded-full border border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              )}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white border-2 border-primary flex items-center justify-center overflow-hidden flex-shrink-0">
                  <img src={CHATBOT_IMG} alt="Bucky" className="w-full h-full object-contain p-0.5" />
                </div>
                <div className="bg-muted p-3 rounded-2xl rounded-tl-none">
                  <div className="flex gap-1 items-center h-4">
                    <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:0ms]" />
                    <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:150ms]" />
                    <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-4 border-t border-border flex-shrink-0">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Bucky anything..."
              className="flex-1"
              disabled={isTyping}
            />
            <Button
              onClick={() => handleSend()}
              size="icon"
              disabled={!input.trim() || isTyping}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-2 opacity-60">
            SVS Polymer Industries
          </p>
        </div>
      </div>
    </>
  );
}
