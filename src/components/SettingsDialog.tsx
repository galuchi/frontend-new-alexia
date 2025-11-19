import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SettingsDialog = ({ open, onOpenChange }: SettingsDialogProps) => {
  const [settings, setSettings] = useState({
    notifications: true,
    soundEffects: false,
    autoScroll: true,
    temperature: [0.7],
  });
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Configurações salvas",
      description: "Suas preferências foram atualizadas com sucesso.",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">Configurações</DialogTitle>
          <DialogDescription>
            Personalize sua experiência com o chat assistant
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Notifications */}
          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label htmlFor="notifications" className="text-base font-medium">
                Notificações
              </Label>
              <p className="text-sm text-muted-foreground">
                Receber notificações de novas mensagens
              </p>
            </div>
            <Checkbox
              id="notifications"
              checked={settings.notifications}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, notifications: checked as boolean })
              }
            />
          </div>

          {/* Sound Effects */}
          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label htmlFor="sound" className="text-base font-medium">
                Efeitos sonoros
              </Label>
              <p className="text-sm text-muted-foreground">
                Reproduzir sons ao enviar/receber mensagens
              </p>
            </div>
            <Checkbox
              id="sound"
              checked={settings.soundEffects}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, soundEffects: checked as boolean })
              }
            />
          </div>

          {/* Auto Scroll */}
          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label htmlFor="autoscroll" className="text-base font-medium">
                Rolagem automática
              </Label>
              <p className="text-sm text-muted-foreground">
                Rolar automaticamente para novas mensagens
              </p>
            </div>
            <Checkbox
              id="autoscroll"
              checked={settings.autoScroll}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, autoScroll: checked as boolean })
              }
            />
          </div>

          {/* Temperature Slider */}
          <div className="space-y-3">
            <div className="space-y-0.5">
              <Label htmlFor="temperature" className="text-base font-medium">
                Criatividade da IA
              </Label>
              <p className="text-sm text-muted-foreground">
                Ajuste o nível de criatividade das respostas (0.0 - 1.0)
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Slider
                id="temperature"
                value={settings.temperature}
                onValueChange={(value) =>
                  setSettings({ ...settings, temperature: value })
                }
                min={0}
                max={1}
                step={0.1}
                className="flex-1"
              />
              <span className="text-sm font-medium w-12 text-center">
                {settings.temperature[0].toFixed(1)}
              </span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave} className="bg-gradient-primary">
            Salvar configurações
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
