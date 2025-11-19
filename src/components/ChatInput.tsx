import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Mic, MicOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ChatInputProps {
  onSendMessage: (content: string) => void;
}

const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  const handleSend = () => {
    if (!message.trim()) return;
    
    onSendMessage(message);
    setMessage("");
    
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleRecording = () => {
    if (!isRecording) {
      // Start recording
      setIsRecording(true);
      toast({
        title: "Gravação iniciada",
        description: "Fale agora. Clique novamente para parar.",
      });
      
      // Aqui você integraria a API de reconhecimento de voz
      // Por exemplo: Web Speech API ou uma API externa
    } else {
      // Stop recording
      setIsRecording(false);
      toast({
        title: "Gravação finalizada",
        description: "Processando sua mensagem...",
      });
      
      // Simular transcrição
      setTimeout(() => {
        const simulatedTranscription = "Esta é uma mensagem de voz simulada.";
        setMessage(simulatedTranscription);
      }, 500);
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-end gap-2">
        <div className="flex-1 relative">
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Digite sua mensagem..."
            className="min-h-[52px] max-h-32 resize-none pr-12 bg-background border-border focus:ring-2 focus:ring-primary transition-smooth"
            rows={1}
          />
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleRecording}
          className={`flex-shrink-0 transition-smooth ${
            isRecording
              ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
              : "hover:bg-secondary"
          }`}
        >
          {isRecording ? (
            <MicOff className="h-5 w-5 animate-pulse" />
          ) : (
            <Mic className="h-5 w-5" />
          )}
        </Button>

        <Button
          onClick={handleSend}
          disabled={!message.trim()}
          className="flex-shrink-0 bg-gradient-primary hover:opacity-90 transition-smooth"
          size="icon"
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
