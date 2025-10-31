// Fix: Removed invalid file marker syntax that was causing compilation errors.
import { GoogleGenAI, Modality, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

// A shared, highly-detailed set of rules for chart generation to ensure consistency.
const chartGenerationRules = `
---
### **RULE: CHART GENERATION (CRITICAL)**
---
Charts are a common source of errors. Follow these instructions for charts with ZERO deviation.

Charts are created using a \`<canvas>\` element with two data attributes:
1.  \`data-component="chart"\`
2.  \`data-chart='{...}'\`

The \`data-chart\` attribute contains the entire Chart.js configuration. It MUST follow these sub-rules:

  **1. Quoting:**
    *   The HTML attribute value itself MUST be enclosed in **single quotes**. Example: \`data-chart='{...}'\`.
    *   Inside the attribute, the content MUST be a valid, non-empty JSON string.
    *   Inside the JSON string, ALL keys and ALL string values MUST use **double quotes**. Example: \`{"type": "bar", "label": "My Data"}\`.

  **2. FORBIDDEN CONTENT:**
    *   **NO JAVASCRIPT FUNCTIONS:** The JSON configuration is for DATA ONLY. It MUST NOT contain any JavaScript code. Specifically, DO NOT include \`callback\` functions for \`ticks\`, \`tooltips\`, or \`labels\`. This is the most common and critical error to avoid.
    *   **NO SINGLE QUOTES / APOSTROPHES:** The JSON string itself MUST NOT contain any apostrophes or single quotes. This will break the HTML parsing. Rephrase labels to avoid them. For example, use "Data for 2024" instead of "2024's Data".
    *   **NO COMMENTS OR TRAILING COMMAS:** The JSON must be strictly valid. Do not include \`//\` comments or trailing commas after the last property in an object or element in an array.

  **3. FONT FAMILY:**
    *   When specifying a font family (e.g., in \`options.plugins.title.font.family\`), use a simple, unquoted string value like \`"sans-serif"\`, \`"monospace"\`, or \`"Merriweather"\`. DO NOT use a quoted font stack like \`"'Courier New', monospace"\`.

  **4. EXAMPLES:**

    *   **CORRECT ✅:**
        \`\`\`html
        <canvas data-component="chart" data-chart='{
          "type": "bar",
          "data": {
            "labels": ["Q1", "Q2", "Q3", "Q4"],
            "datasets": [{
              "label": "Revenue (Millions)",
              "data": [12, 19, 3, 5],
              "backgroundColor": "rgba(75, 192, 192, 0.6)"
            }]
          },
          "options": {
            "responsive": true,
            "plugins": {
              "title": { "display": true, "text": "Quarterly Revenue" }
            }
          }
        }'></canvas>
        \`\`\`

    *   **INCORRECT ❌ (Contains a function):**
        \`\`\`html
        <canvas data-chart='{
          ...
          "options": { "scales": { "y": { "ticks": { "callback": function(value) { return "$" + value; } } } } }
        }'></canvas>
        \`\`\`
        This will cause a **parsing error** because functions are not valid in JSON.

    *   **INCORRECT ❌ (Mismatched quotes and an apostrophe):**
        \`\`\`html
        <canvas data-chart='{
          ...
          "options": { "plugins": { "title": { "text": "Company's Growth" } } }
        }'></canvas>
        \`\`\`
        This will cause an **unterminated string error** because the apostrophe in \`Company's\` closes the \`data-chart\` attribute prematurely.
`;


const slideGenerationSchema = {
  type: Type.OBJECT,
  properties: {
    html: {
      type: Type.STRING,
      description: "The HTML content for the presentation slides. Each slide should be a <section> element with the class 'slide'. Use TailwindCSS classes for styling."
    },
    css: {
      type: Type.STRING,
      description: "The CSS styles for the presentation. This can include animations, slide transitions, or custom styles not covered by TailwindCSS. Slides should snap to the viewport."
    },
    js: {
      type: Type.STRING,
      description: `The JavaScript for the presentation. Use this for interactivity and animations. All animations (charts, numbers, SVGs) must be triggered by an IntersectionObserver when the element scrolls into view. The animation should only play once.`
    }
  },
  required: ["html", "css", "js"]
};

/**
 * Generates initial presentation slides based on a user prompt and a template.
 */
export const generateSlides = async (prompt: string, template: string) => {
    const systemInstruction = `You are an expert web developer specializing in creating stunning, interactive presentations using HTML, CSS, and JavaScript. Your task is to generate the code for a presentation based on a user's prompt.

You MUST follow these rules precisely to ensure the generated code is valid and works correctly. Failure to adhere to these rules will result in broken presentations.

---
### **RULE 1: LANGUAGE (CRITICAL)**
---
The user has requested the presentation to be in **Chinese**. All user-facing text content, including titles, body text, chart labels, and annotations, MUST be in **Chinese**.

---
### **RULE 2: GLOBAL OUTPUT STRUCTURE**
---
The final output MUST be a single, valid JSON object with three keys: "html", "css", and "js". The HTML should consist of a series of <section> elements, each with the class "slide". Use TailwindCSS for all styling directly in the HTML. The total number of slides should be between 5 and 6.

${chartGenerationRules}

---
### **RULE 4: ANIMATION CONVENTIONS**
---
All animations MUST be triggered by an IntersectionObserver when the slide scrolls into view.

  **4.1. Animated Numbers:**
    *   Give the element the class \`count-up\`.
    *   The target number MUST be in the \`data-value\` attribute.
    *   The HTML inner text for this element MUST ALWAYS be \`0\`.
    *   **Example:** To show the number 95, the HTML MUST be \`<h3 class="count-up" data-value="95">0</h3>\`.

  **4.2. SVG Line Animations:**
    *   Give the SVG a unique ID.
    *   Target its paths with anime.js for a line-drawing effect.

---
### **RULE 5: THEME GUIDELINES**
---
Apply the following aesthetic guidelines based on the user's selected theme. These rules affect design, not the functional rules above.
- professional: Use a clean, corporate style with a color palette of blues, grays, and white. Use sans-serif fonts like Lato or Roboto. Keep layouts structured and clear.
- creative: Employ bold colors, unique font pairings (e.g., a display font for headings and a sans-serif for body), and asymmetrical layouts. Feel free to use more expressive visuals.
- minimalist: Focus on whitespace and typography. Use a monochromatic color scheme with one accent color. Layouts should be simple and uncluttered. Use a clean sans-serif font like Inter.
- tech: Use a dark theme with neon accents (e.g., electric blue, magenta, green). Use futuristic or monospaced fonts. Visuals can include abstract geometric shapes or code-like elements.
- academic: Use a formal style with serif fonts (e.g., Merriweather, Lora) for readability. The color palette should be muted and professional (e.g., navy, burgundy, dark green). Prioritize clarity for data, using well-structured tables and standard charts (bar, line).
- vibrant: Use a bright, energetic color palette (e.g., orange, teal, hot pink). Use playful and friendly fonts. Layouts can be dynamic and engaging, suitable for marketing or creative pitches.

The selected template is: '${template}'. Ensure the generated code is complete and ready to be rendered in a browser.
`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: prompt,
        config: {
            systemInstruction,
            responseMimeType: 'application/json',
            responseSchema: slideGenerationSchema,
        }
    });

    try {
        const jsonString = response.text.trim();
        const result = JSON.parse(jsonString);
        return {
            html: result.html || '',
            css: result.css || '',
            js: result.js || ''
        };
    } catch (e) {
        console.error("Failed to parse Gemini response as JSON:", response.text);
        throw new Error("The AI failed to generate valid code. Please try again.");
    }
};


/**
 * Edits an existing presentation based on a user prompt.
 */
export const generateHtml = async (
  prompt: string, 
  html: string, 
  css: string, 
  js: string, 
  selectedSelector: string | null
) => {
    const targetElement = selectedSelector ? `The user has selected the element with the CSS selector: \`${selectedSelector}\`. The changes should be applied to this element or its children.` : 'The changes should be applied to the overall page structure or content as described.';

    const systemInstruction = `You are an expert web developer tasked with modifying an existing HTML, CSS, and JavaScript presentation. The user will provide a prompt describing the desired changes. You must return a single JSON object containing the *complete, updated* code for "html", "css", and "js".

- **IMPORTANT**: The presentation is in **Chinese**. All new or modified text content must also be in **Chinese**.
- Analyze the user's request, the provided code, and the selected element.
- ${targetElement}
- Modify the code to implement the requested changes. You can add, remove, or update elements, styles, and scripts.
- When making changes, preserve the existing structure, styles, and animation conventions as much as possible, unless the prompt specifically asks for a redesign.
- Return the full, updated code for the HTML body, the CSS, and the JS. Do not return only the changed parts.

${chartGenerationRules}

---
### **RULE: ANIMATION CONVENTIONS (CRITICAL)**
---
You MUST preserve these animation conventions when making edits.

  **1. Number Animations ('count-up'):**
    *   Any element with the class \`count-up\` MUST have '0' as its text content in the HTML you provide.
    *   The target number is ALWAYS specified in the \`data-value\` attribute.
    *   This rule applies to ALL \`count-up\` elements, whether they are being edited or not. Do not change the inner text from '0'.
    *   **CRITICAL EXAMPLE**: If the original HTML has \`<h3 class="count-up" data-value="8.3">0</h3>\` and the user asks to change it to 8.1, the correct output is \`<h3 class="count-up" data-value="8.1">0</h3>\`.

  **2. SVG and Other Animations:**
    *   For animated SVG diagrams, the animation is tied to specific IDs or classes (e.g., '#process-diagram'). Preserve these hooks.
    *   Always ensure the JS logic for triggering all animations via IntersectionObserver is preserved and correct in the "js" field of your response.
`;

    const userPrompt = `
Here is the current code:
---HTML---
${html}
---CSS---
${css}
---JS---
${js}
---END OF CODE---

User Request: "${prompt}"

Please provide the complete updated code in the specified JSON format, following all system rules precisely.
`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: userPrompt,
        config: {
            systemInstruction,
            responseMimeType: 'application/json',
            responseSchema: slideGenerationSchema,
        }
    });
    
    try {
        const jsonString = response.text.trim();
        const result = JSON.parse(jsonString);
        return {
            html: result.html || html,
            css: result.css || css,
            js: result.js || js
        };
    } catch (e) {
        console.error("Failed to parse Gemini response as JSON:", response.text);
        throw new Error("The AI failed to update the code correctly. Please try again.");
    }
};


/**
 * Generates narration scripts for each slide.
 */
export const generateNarrationScripts = async (html: string, originalPrompt: string): Promise<string[]> => {
    const systemInstruction = `You are a creative content creator specializing in making complex topics engaging and accessible for social media platforms like TikTok. Your task is to generate a narration script **in Chinese** for a presentation.

You will be given two pieces of information:
1. The ORIGINAL REPORT (in Chinese): This is the primary source of truth. It contains all the detailed information.
2. The SLIDE HTML (in Chinese): This shows the visual content of each slide (<section class="slide">).

Your goal is to create a script for each slide that is:
- **Informal and Conversational (in Chinese):** Use simple, modern Chinese. Talk directly to the audience (e.g., "那么，这到底意味着什么呢？"). Make it sound like a real person talking, not a corporate robot.
- **Detailed:** Use the ORIGINAL REPORT to expand on the key points shown on each slide. The slide might just have a headline and a chart, but your script should explain what that chart means, why it's important, and add interesting facts from the report.
- **Engaging:** Keep the energy up. Use rhetorical questions and a storytelling approach.
- **Structured:** Generate one script per slide. The final output MUST be a JSON array of strings, where each string is the narration for one slide, in order. The number of strings in the array must match the number of slides. The entire output, including the script text, must be in **Chinese**.`;
    
    const prompt = `
Here is the ORIGINAL REPORT:
---REPORT---
${originalPrompt}
---END REPORT---

Here is the HTML content of the slides:
---HTML---
${html}
---END HTML---

Please generate the narration scripts based on these inputs, following all system rules.
`;
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: prompt,
        config: {
            systemInstruction,
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
            }
        }
    });

    try {
        const jsonString = response.text.trim();
        const result = JSON.parse(jsonString);
        return Array.isArray(result) ? result : [];
    } catch (e) {
        console.error("Failed to parse narration scripts from Gemini:", response.text);
        throw new Error("The AI failed to generate valid narration scripts.");
    }
};

/**
 * Generates speech audio from an array of scripts.
 */
export const generateSpeechForScripts = async (scripts: string[]): Promise<string[]> => {
    const audioPromises = scripts.map(script => {
        // The model automatically detects the language and uses an appropriate voice.
        return ai.models.generateContent({
            model: "gemini-2.5-flash-preview-tts",
            contents: [{ parts: [{ text: script }] }],
            config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: {
                    voiceConfig: {
                        // By not specifying a voiceName, we allow the model to select the best one for the language.
                    },
                },
            },
        });
    });

    const responses = await Promise.all(audioPromises);
    
    return responses.map(response => {
        return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data || '';
    });
};