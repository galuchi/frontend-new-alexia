import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import SettingsDialog from "./SettingsDialog";

export interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Olá! Como posso ajudá-lo hoje?",
      role: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleSendMessage = (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // Simular resposta da IA
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Esta é uma resposta simulada da IA. Em produção, aqui seria integrada uma API de IA real.",
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-chat">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-card border-b border-border shadow-soft">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
            <span className="text-white font-bold text-lg">AI</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">Chat Assistant</h1>
            <p className="text-xs text-muted-foreground">Sempre pronto para ajudar</p>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSettingsOpen(true)}
          className="hover:bg-secondary transition-smooth"
        >
          <Settings className="h-5 w-5 text-foreground" />
        </Button>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
      </div>

      {/* Input Area */}
      <div className="border-t border-border bg-card shadow-medium">
        <ChatInput onSendMessage={handleSendMessage} />
      </div>

      {/* Settings Dialog */}
      <SettingsDialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen} />
    </div>
  );
};

export default ChatInterface;
