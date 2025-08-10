import React, { useMemo, useState } from "react";
import { getBaseSidebarLinks } from "@/components/layout/sidebar/sidebarLinks";
import { getSidebarPreferences, saveSidebarPreferences, resetSidebarPreferences } from "@/services/sidebarPreferences";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MoveUp, MoveDown, Eye, EyeOff, Save, RotateCcw } from "lucide-react";
import { toast } from "sonner";

const SidebarCustomization: React.FC = () => {
  const baseLinks = useMemo(() => getBaseSidebarLinks().filter(l => !l.subMenuItems), []);
  const initialPrefs = getSidebarPreferences();

  const [order, setOrder] = useState<string[]>(() => {
    // Ensure all base links are present
    const baseOrder = baseLinks.map(l => l.path);
    const unique = Array.from(new Set([...(initialPrefs.order || []), ...baseOrder]));
    return unique.filter(p => baseOrder.includes(p));
  });
  const [hidden, setHidden] = useState<string[]>(initialPrefs.hidden || []);

  const move = (path: string, dir: -1 | 1) => {
    setOrder(prev => {
      const idx = prev.indexOf(path);
      if (idx < 0) return prev;
      const ni = idx + dir;
      if (ni < 0 || ni >= prev.length) return prev;
      const next = [...prev];
      [next[idx], next[ni]] = [next[ni], next[idx]];
      return next;
    });
  };

  const toggleHidden = (path: string) => {
    setHidden(prev => prev.includes(path) ? prev.filter(p => p !== path) : [...prev, path]);
  };

  const save = () => {
    const prefs = { order, hidden };
    saveSidebarPreferences(prefs);
    toast.success("تم حفظ تخصيص القائمة الجانبية");
  };

  const reset = () => {
    resetSidebarPreferences();
    const baseOrder = baseLinks.map(l => l.path);
    setOrder(baseOrder);
    setHidden([]);
    toast.info("تمت إعادة التعيين للوضع الافتراضي");
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>تخصيص القائمة الجانبية</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          قم بترتيب العناصر وإظهار/إخفاء ما يناسبك. يسري التغيير فور الحفظ.
        </p>
        <div className="space-y-2">
          {order.map((path) => {
            const item = baseLinks.find(l => l.path === path);
            if (!item) return null;
            const Icon = item.icon as any;
            const isHidden = hidden.includes(path);
            return (
              <div key={path} className="flex items-center justify-between rounded-md border bg-card text-card-foreground p-2">
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  <span className="font-medium sidebar-text">{item.name}</span>
                  {isHidden && <span className="text-xs text-muted-foreground">(مخفي)</span>}
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="outline" size="icon" onClick={() => move(path, -1)} aria-label="تحريك لأعلى">
                    <MoveUp className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => move(path, 1)} aria-label="تحريك لأسفل">
                    <MoveDown className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => toggleHidden(path)} aria-label={isHidden ? "إظهار" : "إخفاء"}>
                    {isHidden ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex gap-2 pt-2">
          <Button onClick={save} className="gap-2">
            <Save className="h-4 w-4" /> حفظ
          </Button>
          <Button variant="outline" onClick={reset} className="gap-2">
            <RotateCcw className="h-4 w-4" /> إعادة تعيين
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SidebarCustomization;
