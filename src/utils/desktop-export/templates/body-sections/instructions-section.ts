
import { AppInstructions } from '../../types';

/**
 * Creates the installation instructions section
 * @param instructions The installation instructions in the appropriate language
 * @returns HTML string for the instructions section
 */
export const generateInstructionsSection = (instructions: { title: string; steps: string[] }): string => {
  return `<div class="instructions">
      <h3>${instructions.title}</h3>
      <ol>
        ${instructions.steps.map(step => `<li>${step}</li>`).join('\n        ')}
      </ol>
    </div>`;
};
