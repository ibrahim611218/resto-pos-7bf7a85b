
/**
 * Creates the HTML head section of the download page template
 * @param isArabic Whether the language is Arabic
 * @returns HTML string for the head section
 */
export const generateHeadTemplate = (isArabic: boolean): string => {
  return `<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${isArabic ? 'تحميل نسخة سطح المكتب - Resto POS' : 'Download Desktop Version - Resto POS'}</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f9f9f9;
      margin: 0;
      padding: 20px;
      direction: ${isArabic ? 'rtl' : 'ltr'};
      text-align: ${isArabic ? 'right' : 'left'};
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      background: white;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    .logo {
      display: block;
      width: 100px;
      height: 100px;
      margin: 0 auto 20px auto;
    }
    h1 {
      color: #2563eb;
      margin-top: 0;
      text-align: center;
    }
    .download-btn {
      display: inline-block;
      background-color: #2563eb;
      color: white;
      padding: 12px 25px;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
      margin: 20px auto;
      transition: background-color 0.3s;
      text-align: center;
      width: 80%;
      max-width: 300px;
      display: block;
    }
    .download-btn:hover {
      background-color: #1d4ed8;
    }
    .requirements {
      background: #f1f5f9;
      padding: 20px;
      border-radius: 5px;
      margin-top: 30px;
    }
    .file-info {
      display: flex;
      justify-content: space-between;
      background: #e2e8f0;
      padding: 15px;
      border-radius: 5px;
      margin-top: 20px;
      flex-wrap: wrap;
    }
    .file-info div {
      margin: 5px 10px;
    }
    .steps {
      margin-top: 30px;
    }
    .steps li {
      margin-bottom: 10px;
    }
    .note {
      background: #fff7ed;
      border-left: 4px solid #f97316;
      padding: 15px;
      margin-top: 30px;
    }
    .instructions {
      background: #e0f2fe;
      padding: 20px;
      border-radius: 5px;
      margin-top: 30px;
    }
    .progress {
      height: 20px;
      width: 100%;
      background: #e2e8f0;
      border-radius: 10px;
      margin-top: 20px;
      overflow: hidden;
      position: relative;
    }
    .progress-bar {
      height: 100%;
      background: #2563eb;
      width: 0%;
      transition: width 0.5s;
      border-radius: 10px;
      position: relative;
    }
    .progress-text {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      text-align: center;
      color: white;
      font-weight: bold;
      text-shadow: 0 0 3px rgba(0,0,0,0.5);
      line-height: 20px;
    }
    @media (prefers-color-scheme: dark) {
      body {
        background-color: #1a1a1a;
        color: #e0e0e0;
      }
      .container {
        background: #2a2a2a;
      }
      .requirements {
        background: #333;
      }
      .file-info {
        background: #3a3a3a;
      }
      .note {
        background: #3a3000;
        border-left-color: #f97316;
      }
      .instructions {
        background: #0c4a6e;
      }
      h1 {
        color: #3b82f6;
      }
    }
  </style>
</head>`;
};
