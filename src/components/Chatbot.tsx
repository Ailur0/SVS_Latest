import { useState, useRef, useEffect, useCallback } from "react";
import { X, Send, User, Minus, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const CHATBOT_IMG = "/chatbot.png";

const navRoutes: Record<string, string> = {
  "View Products": "/products",
  "Paint Containers": "/products?category=paint",
  "Food Grade Containers": "/products?category=food",
  "Lubricant Containers": "/products?category=lubricants",
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
  "Read Our Blog": "/blog",
  "View Blog": "/blog",
  "View Articles": "/blog",
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
    patterns: ["hello", "hi", "hey", "good morning", "good afternoon", "greetings", "howdy", "start"],
    responses: [
      "Hi! I'm Bucky, SVS Polymer's virtual assistant 👋\n\nHow can I help you today?",
      "Hello! Welcome to SVS Polymer Industries. I'm Bucky — ask me anything about our packaging solutions.",
    ],
    quickReplies: ["View Products", "Get a Quote", "Quality & Certifications", "Custom Packaging"],
  },
  products: {
    patterns: ["products", "what do you sell", "catalog", "range", "items", "packaging", "manufacture"],
    responses: [
      "We manufacture rigid plastic packaging across three categories:\n\n🎨 Paint Containers — 100gm to 20kg, flat lid & CCD closure\n🥛 Food Grade — 100ml to 10kg, BPA-free, food-safe\n🔧 Lubricants — 500ml to 20L, flat lid & spout closure\n\nWhich range are you interested in?",
    ],
    quickReplies: ["Paint Containers", "Food Grade Containers", "Lubricant Containers", "Request Quote"],
  },
  paint: {
    patterns: ["paint", "bucket", "ccd", "lid", "coating", "alkyd", "emulsion", "decorative", "primer"],
    responses: [
      "Our paint containers are built for the Indian coatings industry:\n\n🎨 Range: 100gm → 20kg\n🔒 Closures: Flat lid & CCD (tamper-evident)\n🏷️ IML-ready surface for clean labelling\n⚡ PPCP material — lighter than HDPE, drop-resistant\n\nAvailable in standard and custom sizes, colours, and prints.",
    ],
    quickReplies: ["View Products", "Request Quote", "Custom Packaging"],
  },
  food: {
    patterns: ["food", "edible", "oil", "ghee", "dairy", "food grade", "fssai", "bpa", "safe to eat", "consumable"],
    responses: [
      "Our food-grade containers meet strict safety standards:\n\n🥛 Range: 100ml → 10kg round containers\n✅ BPA-free, IS 10146 & FSSAI compliant\n🎨 Available in natural, white & custom colours\n🔒 Tamper-evident closures for retail trust\n\nSuitable for edible oils, ghee, dairy products, and dry foods.",
    ],
    quickReplies: ["Food Grade Containers", "Request Quote", "View Quality Page"],
  },
  lubricants: {
    patterns: ["lubricant", "engine oil", "automotive", "gear", "hydraulic", "grease", "motor oil", "lube"],
    responses: [
      "Our lubricant containers are designed for industrial & automotive use:\n\n🔧 Range: 500ml → 20L\n🔩 Closures: Flat lid & spout (for easy pour)\n💪 Reinforced ribs for stacking under load\n🌡️ UV-resistant formulations available\n\nCompatible with mineral oils, synthetics, and hydraulic fluids.",
    ],
    quickReplies: ["Lubricant Containers", "Request Quote", "Contact Sales"],
  },
  pricing: {
    patterns: ["price", "cost", "how much", "quote", "pricing", "rates", "budget", "expensive", "cheap", "affordable"],
    responses: [
      "Pricing depends on product type, capacity, closure style, and order quantity.\n\nFor an accurate quote, share your requirements and we'll respond within 24 hours. No commitment needed.",
    ],
    quickReplies: ["Request a Quote", "Contact Sales Team"],
  },
  quality: {
    patterns: ["quality", "certification", "iso", "standards", "testing", "safety", "certified", "inspection"],
    responses: [
      "Quality is built into every stage at SVS Polymer:\n\n✅ ISO Certified Facility\n✅ BPA-free, food-safe materials\n✅ In-process checks at each production stage\n✅ Leak, pressure & drop impact testing\n✅ 100% inspection before dispatch\n\nEvery batch meets strict parameters before leaving our facility.",
    ],
    quickReplies: ["View Quality Page", "Request Samples"],
  },
  customization: {
    patterns: ["custom", "personalise", "personalize", "design", "logo", "branding", "colour", "color", "size", "iml", "label", "print"],
    responses: [
      "We offer full custom packaging for your brand:\n\n🎨 Custom colours (Pantone matching available)\n📐 Custom sizes & capacities\n🔒 Custom closure types\n🖨️ In-mould labelling (IML) & custom printing\n📦 Private label & co-branding\n\nShare your requirements and our team will work with you.",
    ],
    quickReplies: ["Start Custom Project", "Contact Us"],
  },
  contact: {
    patterns: ["contact", "phone", "email", "reach", "talk", "speak", "call", "address", "location", "where are you", "hyderabad"],
    responses: [
      "Here's how to reach us:\n\n👤 Venkata Ramana B.\n📞 +91 96526 96819\n📧 svspolymerinds@gmail.com\n📍 Plot 156 & 157, Navodaya Society I.E., Phase-V, Cherlapally, Hyderabad – 500 051",
    ],
    quickReplies: ["Visit Contact Page", "Request Quote"],
  },
  delivery: {
    patterns: ["delivery", "shipping", "lead time", "how long", "dispatch", "fast", "urgent", "timeline"],
    responses: [
      "Lead times vary by product type and order quantity. Standard orders are dispatched within the agreed timeline.\n\nFor urgent requirements, contact our sales team directly — we'll do our best to accommodate.",
    ],
    quickReplies: ["Contact Sales", "Request Quote"],
  },
  moq: {
    patterns: ["minimum", "moq", "quantity", "order size", "bulk", "how many", "units"],
    responses: [
      "MOQ varies by product and customisation:\n\n📦 Standard sizes (existing moulds): 500–1,000 units\n🛠️ Custom sizes (new tooling): 2,000–5,000 units\n\nContact our team for exact MOQ based on your specific container and volume.",
    ],
    quickReplies: ["Contact Sales", "Request Quote"],
  },
  sustainability: {
    patterns: ["eco", "environment", "recycle", "sustainable", "green", "recyclable", "epr", "waste"],
    responses: [
      "We take sustainability seriously:\n\n♻️ PP (#5) & HDPE (#2) — both widely recyclable\n🏭 Waste-minimising production processes\n📋 EPR compliance support available\n📦 Lightweight designs reduce material use & freight\n\nAsk us about recyclability certifications for your market.",
    ],
    quickReplies: ["Request Quote", "Contact Us"],
  },
  samples: {
    patterns: ["sample", "test", "trial", "demo", "example", "try"],
    responses: [
      "We arrange product samples for qualified business inquiries. Reach out via the quote form with your product requirements and we'll coordinate sample dispatch.",
    ],
    quickReplies: ["Request Samples", "Contact Sales"],
  },
  blog: {
    patterns: ["blog", "article", "guide", "read", "learn", "knowledge", "ppcp", "hdpe", "iml", "resources"],
    responses: [
      "We publish technical guides on packaging materials, manufacturing, and procurement:\n\n📚 PPCP vs HDPE, Food-grade plastics, MOQ guides, IML, and more.\n\nAll written for buyers and product teams — no fluff.",
    ],
    quickReplies: ["Read Our Blog", "View Products"],
  },
  thanks: {
    patterns: ["thank", "thanks", "appreciate", "helpful", "great", "perfect", "awesome", "good"],
    responses: [
      "You're welcome! Is there anything else I can help you with?",
      "Happy to help! Feel free to ask if you have more questions.",
    ],
    quickReplies: ["View Products", "Get Quote"],
  },
  goodbye: {
    patterns: ["bye", "goodbye", "see you", "later", "done", "exit"],
    responses: [
      "Thanks for visiting SVS Polymer. Have a great day! 👋",
      "Goodbye! Come back anytime.",
    ],
  },
  default: {
    patterns: [],
    responses: [
      "I can help you with:\n\n📦 Products & Specifications\n💬 Quotes & Pricing\n🏆 Quality & Certifications\n🎨 Custom Packaging\n📚 Industry Articles\n📍 Contact & Location\n\nWhat would you like to know?",
    ],
    quickReplies: ["View Products", "Get Quote", "Read Our Blog", "Contact Us"],
  },
};

const sanitizeInput = (input: string): string =>
  input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '').replace(/[<>]/g, '').trim().slice(0, 500);

const processMessage = (input: string, context: Context): { response: string; quickReplies?: string[]; intent: string } => {
  const sanitized = sanitizeInput(input);
  const lower = sanitized.toLowerCase();

  const negativeSentiment = ["bad", "terrible", "awful", "hate", "worst", "problem", "issue", "broken", "wrong"].some(w => lower.includes(w));

  let best = { intent: "default", score: 0 };
  for (const [key, intent] of Object.entries(intents)) {
    if (key === "default") continue;
    let score = 0;
    intent.patterns.forEach(p => { if (lower.includes(p)) score += p.length; });
    if (context.lastIntent === key) score *= 1.2;
    if (score > best.score) best = { intent: key, score };
  }

  if (negativeSentiment && best.score < 3) {
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

const INITIAL_MESSAGE: Message = {
  id: "1",
  text: "Hi! I'm Bucky, SVS Polymer's virtual assistant 👋\n\nAsk me about our packaging range, pricing, quality standards, or customisation options.",
  sender: "bot",
  timestamp: new Date(),
  quickReplies: ["View Products", "Get a Quote", "Quality & Certifications", "Custom Packaging"],
};

export default function Chatbot() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [context, setContext] = useState<Context>({ conversationHistory: [] });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, isMinimized]);

  const handleOpen = () => { setIsOpen(true); setIsMinimized(false); setHasUnread(false); };
  const handleClose = () => { setIsOpen(false); setIsMinimized(false); };
  const handleMinimize = () => setIsMinimized(true);

  const handleReset = () => {
    setMessages([INITIAL_MESSAGE]);
    setContext({ conversationHistory: [] });
    setInput("");
  };

  const handleSend = useCallback(async (overrideInput?: string) => {
    const text = (overrideInput ?? input).trim();
    if (!text || isTyping) return;

    const userMessage: Message = { id: Date.now().toString(), text, sender: "user", timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    const newContext: Context = {
      ...context,
      conversationHistory: [...context.conversationHistory, text].slice(-10),
    };
    setContext(newContext);

    const delay = 600 + Math.random() * 500;
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
      if (!isOpen || isMinimized) setHasUnread(true);
    }, delay);
  }, [input, isTyping, context, isOpen, isMinimized]);

  const handleQuickReply = (reply: string) => {
    const route = navRoutes[reply];
    if (route) { setIsOpen(false); navigate(route); }
    else handleSend(reply);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  return (
    <>
      {/* FAB */}
      <button
        onClick={handleOpen}
        className={cn(
          "fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-xl",
          "bg-white border-2 border-primary overflow-visible",
          "hover:scale-110 active:scale-95 transition-all duration-300",
          (isOpen && !isMinimized) ? "scale-0 opacity-0 pointer-events-none" : "scale-100 opacity-100"
        )}
        aria-label="Open chat"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-30" />
        <img src={CHATBOT_IMG} alt="Bucky" className="w-full h-full object-contain p-1 relative z-10" />
        {hasUnread && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white z-20 flex items-center justify-center">
            <span className="text-[8px] text-white font-bold">!</span>
          </span>
        )}
      </button>

      {/* Minimized pill */}
      {isOpen && isMinimized && (
        <button
          onClick={() => setIsMinimized(false)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-full shadow-xl hover:shadow-2xl transition-all text-sm font-medium"
        >
          <img src={CHATBOT_IMG} alt="Bucky" className="w-6 h-6 object-contain bg-white rounded-full p-0.5" />
          Bucky
          {hasUnread && <span className="w-2 h-2 bg-red-400 rounded-full" />}
        </button>
      )}

      {/* Chat window */}
      <div
        className={cn(
          "fixed z-50 bg-background border border-border shadow-2xl flex flex-col",
          "transition-all duration-300 origin-bottom-right",
          // Mobile: full screen
          "inset-x-0 bottom-0 top-0 rounded-none",
          // Desktop: widget
          "sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[380px] sm:rounded-2xl sm:max-h-[calc(100vh-88px)] sm:h-[580px]",
          (isOpen && !isMinimized) ? "translate-y-0 opacity-100 pointer-events-auto" : "translate-y-4 opacity-0 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-primary text-primary-foreground sm:rounded-t-2xl flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 flex-shrink-0">
              <div className="w-10 h-10 bg-white rounded-full overflow-hidden border-2 border-white/30">
                <img src={CHATBOT_IMG} alt="Bucky" className="w-full h-full object-contain p-0.5" />
              </div>
              {/* Online dot */}
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-sm leading-tight">Bucky</h3>
              <p className="text-[11px] opacity-75 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block" />
                Online · SVS Polymer
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={handleReset}
              title="Restart conversation"
              className="p-2 rounded-full hover:bg-white/20 transition-colors opacity-70 hover:opacity-100"
              aria-label="Restart chat"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={handleMinimize}
              className="p-2 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Minimize chat"
            >
              <Minus className="h-4 w-4" />
            </button>
            <button
              onClick={handleClose}
              className="p-2 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scroll-smooth">
          {messages.map((message, idx) => {
            const isBot = message.sender === "bot";
            const prevSame = idx > 0 && messages[idx - 1].sender === message.sender;
            return (
              <div key={message.id}>
                <div className={cn("flex gap-2.5 items-end", !isBot && "flex-row-reverse")}>
                  {/* Avatar — only show for first in a group */}
                  <div className={cn("w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden", prevSame && "invisible",
                    isBot ? "bg-white border-2 border-primary" : "bg-primary text-primary-foreground"
                  )}>
                    {isBot
                      ? <img src={CHATBOT_IMG} alt="Bucky" className="w-full h-full object-contain p-0.5" />
                      : <User className="h-3.5 w-3.5" />
                    }
                  </div>

                  <div className={cn("max-w-[78%] space-y-1", !isBot && "items-end flex flex-col")}>
                    <div className={cn(
                      "px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed",
                      isBot
                        ? "bg-muted text-foreground rounded-bl-sm"
                        : "bg-primary text-primary-foreground rounded-br-sm"
                    )}>
                      <p className="whitespace-pre-wrap">{message.text}</p>
                    </div>
                    <p className={cn("text-[10px] text-muted-foreground/60 px-1", !isBot && "text-right")}>
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>

                {/* Quick replies — only last bot message */}
                {isBot && !isTyping && idx === messages.length - 1 && message.quickReplies && (
                  <div className="flex flex-wrap gap-1.5 mt-2 ml-9">
                    {message.quickReplies.map((reply, i) => (
                      <button
                        key={i}
                        onClick={() => handleQuickReply(reply)}
                        className="px-3 py-1 text-xs font-medium rounded-full border border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground transition-all hover:scale-105 active:scale-95"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex gap-2.5 items-end">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-primary flex items-center justify-center overflow-hidden flex-shrink-0">
                <img src={CHATBOT_IMG} alt="Bucky" className="w-full h-full object-contain p-0.5" />
              </div>
              <div className="bg-muted px-4 py-3 rounded-2xl rounded-bl-sm">
                <div className="flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:0ms]" />
                  <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:150ms]" />
                  <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="px-4 py-3 border-t border-border flex-shrink-0 bg-background sm:rounded-b-2xl">
          <div className="flex gap-2 items-center">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Bucky anything..."
              className="flex-1 h-9 text-sm rounded-full border-border/60 bg-muted/40 focus:bg-background"
              disabled={isTyping}
              maxLength={500}
            />
            <Button
              onClick={() => handleSend()}
              size="icon"
              className="h-9 w-9 rounded-full flex-shrink-0"
              disabled={!input.trim() || isTyping}
              aria-label="Send message"
            >
              <Send className="h-3.5 w-3.5" />
            </Button>
          </div>
          <p className="text-[10px] text-muted-foreground/50 text-center mt-2">
            SVS Polymer Industries · Hyderabad
          </p>
        </div>
      </div>
    </>
  );
}
