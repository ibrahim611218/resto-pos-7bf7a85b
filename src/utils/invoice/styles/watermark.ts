
/**
 * Styles for the watermark (when invoice is refunded)
 */
export const getWatermarkStyles = (): string => `
  .watermark {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 60px;
    transform: rotate(45deg);
    color: rgba(220, 53, 69, 0.15);
    font-weight: bold;
    text-transform: uppercase;
    pointer-events: none;
    z-index: 1000;
  }
  
  @media print {
    .watermark {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
      display: block !important;
      opacity: 0.15 !important;
    }
  }
`;
