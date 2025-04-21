
import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { WindowSizeSettings } from "./window-size/WindowSizeSettings";
import { TouchModeSettings } from "./touch-mode/TouchModeSettings";
import { useDisplaySettings } from "../hooks/useDisplaySettings";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import OnScreenKeyboard from "./touch-mode/OnScreenKeyboard";

const DisplaySettings = () => {
  const { width, height, isMobile, isTablet, isDesktop } = useWindowDimensions();
  const {
    settings,
    windowSize,
    setWindowSize,
    isArabic,
    applyWindowSize,
    maximizeWindow,
    toggleTouchMode
  } = useDisplaySettings();

  // --- منطق إظهار الكيبورد ---
  const [kbVisible, setKbVisible] = useState(false);
  const [kbTarget, setKbTarget] = useState<HTMLInputElement | HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (!settings.touchMode) {
      setKbVisible(false);
      setKbTarget(null);
      return;
    }

    // global focusin/focusout events
    function handleFocusIn(e: FocusEvent) {
      const tgt = e.target as HTMLElement;
      if (
        tgt &&
        (tgt.tagName === "INPUT" || tgt.tagName === "TEXTAREA") &&
        (tgt as HTMLInputElement | HTMLTextAreaElement).type !== "hidden" &&
        !tgt.hasAttribute("readonly") &&
        !tgt.hasAttribute("disabled")
      ) {
        setKbTarget(tgt as HTMLInputElement | HTMLTextAreaElement);
        setKbVisible(true);
      }
    }

    function handleFocusOut(e: FocusEvent) {
      setTimeout(() => {
        if (document.activeElement !== kbTarget) {
          setKbVisible(false);
          setKbTarget(null);
        }
      }, 100); // delay to allow switching focus
    }

    window.addEventListener("focusin", handleFocusIn);
    window.addEventListener("focusout", handleFocusOut);
    return () => {
      window.removeEventListener("focusin", handleFocusIn);
      window.removeEventListener("focusout", handleFocusOut);
    };
    // eslint-disable-next-line
  }, [settings.touchMode, kbTarget]);

  // إذا خرج المستخدم من إعدادات العرض أو أغلق وضع اللمس، أخفِ الكيبورد
  useEffect(() => {
    if (!settings.touchMode) {
      setKbVisible(false);
    }
  }, [settings.touchMode]);

  return (
    <div className="space-y-6 relative">
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">
            {isArabic ? "معلومات الشاشة الحالية" : "Current Screen Information"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>{isArabic ? "عرض النافذة الحالي" : "Current Window Width"}</Label>
              <div className="font-medium">{width}px</div>
            </div>
            <div>
              <Label>{isArabic ? "ارتفاع النافذة الحالي" : "Current Window Height"}</Label>
              <div className="font-medium">{height}px</div>
            </div>
            <div>
              <Label>{isArabic ? "عرض الشاشة المتاح" : "Available Screen Width"}</Label>
              <div className="font-medium">{screen.availWidth}px</div>
            </div>
            <div>
              <Label>{isArabic ? "ارتفاع الشاشة المتاح" : "Available Screen Height"}</Label>
              <div className="font-medium">{screen.availHeight}px</div>
            </div>
            <div>
              <Label>{isArabic ? "نوع الجهاز" : "Device Type"}</Label>
              <div className="font-medium">
                {isMobile 
                  ? (isArabic ? "جوال" : "Mobile") 
                  : isTablet 
                    ? (isArabic ? "جهاز لوحي" : "Tablet")
                    : (isArabic ? "حاسوب" : "Desktop")}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <WindowSizeSettings
        windowSize={windowSize}
        setWindowSize={setWindowSize}
        applyWindowSize={applyWindowSize}
        maximizeWindow={maximizeWindow}
        isArabic={isArabic}
      />

      <TouchModeSettings
        settings={settings}
        toggleTouchMode={toggleTouchMode}
        isArabic={isArabic}
      />

      <OnScreenKeyboard
        visible={kbVisible}
        target={kbTarget}
        onClose={() => {
          setKbVisible(false);
          if (kbTarget) kbTarget.blur();
        }}
        isArabic={isArabic}
      />
    </div>
  );
};

export default DisplaySettings;

