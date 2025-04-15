
/**
 * Styles for invoice watermark
 */
export const getWatermarkStyles = (): string => `
  .watermark {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
    font-size: 96px;
    color: rgba(255, 0, 0, 0.15);
    font-weight: bold;
    z-index: 100;
    pointer-events: none;
    white-space: nowrap;
  }

  @media print {
    .watermark {
      color: rgba(255, 0, 0, 0.15) !important;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
  }
`;
