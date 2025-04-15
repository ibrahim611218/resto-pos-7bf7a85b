
import { getBaseStyles } from './base';
import { getHeaderStyles } from './header';
import { getTableStyles } from './table';
import { getSummaryStyles } from './summary';
import { getFooterStyles } from './footer';
import { getQRCodeStyles } from './qrcode';
import { getWatermarkStyles } from './watermark';

/**
 * Combines all invoice styles into a single string
 */
export const getInvoiceStyles = (): string => {
  return `
    ${getBaseStyles()}
    ${getHeaderStyles()}
    ${getTableStyles()}
    ${getSummaryStyles()}
    ${getFooterStyles()}
    ${getQRCodeStyles()}
    ${getWatermarkStyles()}
  `;
};
