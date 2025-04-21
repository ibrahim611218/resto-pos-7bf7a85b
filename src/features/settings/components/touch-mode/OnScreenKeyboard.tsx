
import React, { useEffect, useRef } from "react";

interface OnScreenKeyboardProps {
  visible: boolean;
  target: HTMLInputElement | HTMLTextAreaElement | null;
  onClose: () => void;
  isArabic?: boolean;
}

/**
 * كيبورد افتراضي صغير يدعم العربية والإنجليزية والأرقام.
 * يرسل الأحرف مباشرة إلى الحقل النشط عند الضغط.
 */
const AR_LETTERS = [
  ["ض", "ص", "ث", "ق", "ف", "غ", "ع", "ه", "خ", "ح", "ج", "د"],
  ["ش", "س", "ي", "ب", "ل", "ا", "ت", "ن", "م", "ك", "ط"],
  ["ئ", "ء", "ؤ", "ر", "لا", "ى", "ة", "و", "ز", "ظ"],
  ["١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩", "٠"],
];

const EN_LETTERS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
  ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
];

const getKeyboardRows = (isArabic: boolean) => isArabic ? AR_LETTERS : EN_LETTERS;

const OnScreenKeyboard: React.FC<OnScreenKeyboardProps> = ({
  visible,
  target,
  onClose,
  isArabic = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  // التركيز على الحقل المستهدف مع كل ظهور
  useEffect(() => {
    if (visible && target) {
      target.focus();
    }
  }, [visible, target]);

  if (!visible || !target) return null;

  const handleKeyPress = (ch: string) => {
    if (!target) return;

    // أدخل رمز في المكان الصحيح
    const { selectionStart, selectionEnd, value } = target;
    const start = selectionStart || 0;
    const end = selectionEnd || 0;
    const before = value.slice(0, start);
    const after = value.slice(end);

    const newValue = before + ch + after;
    target.value = newValue;

    // أثّر value في الريأكت إذا فيه oninput أو onchange
    target.dispatchEvent(new Event('input', { bubbles: true }));

    // انقل المؤشر بعد الحرف المدخل
    const pos = start + ch.length;
    setTimeout(() => {
      target.setSelectionRange(pos, pos);
      target.focus();
    }, 0);
  };

  const handleBackspace = () => {
    if (!target) return;
    const { selectionStart, selectionEnd, value } = target;
    const start = selectionStart || 0;
    const end = selectionEnd || 0;

    if (start === 0 && end === 0) return;

    let before = value.slice(0, start);
    let after = value.slice(end);
    let newStart = start;

    // إذا يوجد تحديد، إحذف التحديد
    if (start !== end) {
      before = value.slice(0, start);
      after = value.slice(end);
      newStart = start;
    } else if (start > 0) {
      // إحذف حرف قبل المؤشر
      before = value.slice(0, start - 1);
      newStart = start - 1;
    }

    const newValue = before + after;
    target.value = newValue;
    target.dispatchEvent(new Event('input', { bubbles: true }));
    setTimeout(() => {
      target.setSelectionRange(newStart, newStart);
      target.focus();
    }, 0);
  };

  const handleClose = () => {
    onClose();
  };

  const rows = getKeyboardRows(isArabic);

  return (
    <div
      ref={ref}
      className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t z-[6000] px-2 py-2 animate-in fade-in"
      style={{ userSelect: "none" }}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="flex flex-col gap-2 mx-auto max-w-xl">
        {rows.map((row, i) => (
          <div key={i} className="flex justify-center gap-1 mb-1">
            {row.map((ch) => (
              <button
                type="button"
                key={ch}
                className="bg-gray-200 rounded font-bold text-lg px-2 py-2 min-w-10 active:bg-gray-300 border"
                onClick={() => handleKeyPress(ch)}
                tabIndex={-1}
              >
                {ch}
              </button>
            ))}
            {i === rows.length - 2 && (
              <button
                key="backspace"
                type="button"
                className="bg-red-200 rounded font-bold text-lg px-2 py-2 min-w-12 ml-2 active:bg-red-300 border"
                onClick={handleBackspace}
                tabIndex={-1}
              >
                {isArabic ? "⌫ حذف" : "⌫ Backspace"}
              </button>
            )}
          </div>
        ))}
        <div className="flex justify-center gap-6 mt-2">
          <button
            type="button"
            className="bg-blue-600 text-white px-5 py-2 rounded shadow font-bold text-lg"
            onClick={handleClose}
            tabIndex={-1}
          >
            {isArabic ? "إغلاق" : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnScreenKeyboard;

