export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string | string[];
  url: string;
  image?: string;
  free: boolean;
}

export const categories = [
  "Chatbots",
  "Image Generation",
  "Audio & Voice",
  "Video Generation",
  "Writing & Content",
  "Productivity",
  "Code & Development",
  "Education",
  "Design",
  "Business",
];

const initialToolsData: Tool[] = [
  {
    id: "1",
    name: "ChatGPT",
    description: "Conversational AI assistant capable of generating human-like text based on prompts.",
    category: "Chatbots",
    url: "https://chat.openai.com",
    free: true,
  },
  {
    id: "2",
    name: "Midjourney",
    description: "AI art generator that creates images from textual descriptions.",
    category: "Image Generation",
    url: "https://www.midjourney.com",
    free: false,
  },
  {
    id: "3",
    name: "DALL-E",
    description: "Creates realistic images and art from natural language descriptions.",
    category: "Image Generation",
    url: "https://openai.com/dall-e-3",
    free: false,
  },
  {
    id: "4",
    name: "GitHub Copilot",
    description: "AI pair programmer that helps you write code faster and with less work.",
    category: "Code & Development",
    url: "https://github.com/features/copilot",
    free: false,
  },
  {
    id: "5",
    name: "Jasper",
    description: "AI content generator for blogs, social media, and marketing copy.",
    category: "Writing & Content",
    url: "https://www.jasper.ai",
    free: false,
  },
  {
    id: "6",
    name: "Otter.ai",
    description: "AI-powered transcription service that can record and transcribe meetings and interviews.",
    category: "Audio & Voice",
    url: "https://otter.ai",
    free: true,
  },
  {
    id: "7",
    name: "Grammarly",
    description: "AI-powered writing assistant for grammar checking and style improvements.",
    category: "Writing & Content",
    url: "https://www.grammarly.com",
    free: true,
  },
  {
    id: "8",
    name: "RunwayML",
    description: "AI video generation and editing platform for creative professionals.",
    category: "Video Generation",
    url: "https://runwayml.com",
    free: false,
  },
  {
    id: "9",
    name: "Notion AI",
    description: "AI-powered writing assistant integrated with Notion workspace.",
    category: "Productivity",
    url: "https://notion.so/product/ai",
    free: false,
  },
  {
    id: "10",
    name: "Synthesia",
    description: "AI video generation platform that turns text into professional videos with AI avatars.",
    category: "Video Generation",
    url: "https://www.synthesia.io",
    free: false,
  },
  {
    id: "11",
    name: "Perplexity AI",
    description: "AI-powered search engine that provides direct answers to questions with citations.",
    category: "Productivity",
    url: "https://www.perplexity.ai",
    free: false,
  },
  {
    id: "12",
    name: "Krisp",
    description: "AI-powered noise cancellation app for clear audio during calls.",
    category: "Audio & Voice",
    url: "https://krisp.ai",
    free: true,
  },
  {
    id: "13",
    name: "Duolingo",
    description: "AI-powered language learning platform with personalized lessons.",
    category: "Education",
    url: "https://www.duolingo.com",
    free: false,
  },
  {
    id: "14",
    name: "Claude",
    description: "Conversational AI assistant focused on helpfulness, harmlessness, and honesty.",
    category: "Chatbots",
    url: "https://www.anthropic.com/claude",
    free: true,
  },
  {
    id: "15",
    name: "Canva",
    description: "Design platform with AI-powered features for creating graphics and presentations.",
    category: "Design",
    url: "https://www.canva.com",
    free: false,
  },
  {
    id: "16",
    name: "Descript",
    description: "All-in-one audio/video editing with AI-powered transcription and voice cloning.",
    category: "Audio & Voice",
    url: "https://www.descript.com",
    free: true,
  },
  {
    id: "17",
    name: "Stable Diffusion",
    description: "Open-source AI art generator for creating detailed images from text descriptions.",
    category: "Image Generation",
    url: "https://stablediffusionweb.com",
    free: false,
  },
  {
    id: "18",
    name: "Copy.ai",
    description: "AI copywriting tool for creating marketing content, emails, and social media posts.",
    category: "Writing & Content",
    url: "https://www.copy.ai",
    free: false,
  },
  {
    id: "19",
    name: "Quizlet",
    description: "AI-enhanced learning platform with flashcards and study tools.",
    category: "Education",
    url: "https://quizlet.com",
    free: true,
  },
  {
    id: "20",
    name: "HubSpot AI",
    description: "Marketing and sales platform with AI-powered customer service tools.",
    category: "Business",
    url: "https://www.hubspot.com/products/crm/ai-capabilities",
    free: false,
  },
  {
    id: "21",
    name: "Lensa",
    description: "AI-powered photo editor that enhances selfies and creates artistic avatars.",
    category: "Image Generation",
    url: "https://prisma-ai.com/lensa",
    free: true,
  },
  {
    id: "22",
    name: "Bard",
    description: "Conversational AI service by Google that can generate text, translate languages, and more.",
    category: "Chatbots",
    url: "https://bard.google.com",
    free: true,
  },
  {
    id: "23",
    name: "Gemini",
    description: "Google's most capable AI model, optimized for multimodal understanding and reasoning.",
    category: "Chatbots",
    url: "https://gemini.google.com",
    free: false,
  },
  {
    id: "24",
    name: "Adobe Firefly",
    description: "Family of creative generative AI models built for commercial designers.",
    category: "Image Generation",
    url: "https://www.adobe.com/products/firefly.html",
    free: false,
  },
  {
    id: "25",
    name: "Microsoft Copilot",
    description: "AI-powered assistant integrated with Microsoft 365 applications.",
    category: "Productivity",
    url: "https://copilot.microsoft.com",
    free: false,
  },
  {
    id: "26",
    name: "Elevenlabs",
    description: "AI voice generator with realistic text-to-speech and voice cloning.",
    category: "Audio & Voice",
    url: "https://elevenlabs.io",
    free: true,
  },
  {
    id: "27",
    name: "Zapier",
    description: "Workflow automation platform with AI capabilities for connecting apps.",
    category: "Productivity",
    url: "https://zapier.com",
    free: true,
  },
  {
    id: "28",
    name: "Tome",
    description: "AI-powered storytelling format that generates presentations from prompts.",
    category: "Productivity",
    url: "https://tome.app",
    free: false,
  },
  {
    id: "29",
    name: "Contentful",
    description: "AI-powered content management system for digital teams.",
    category: "Business",
    url: "https://www.contentful.com",
    free: false,
  },
  {
    id: "30",
    name: "Riffusion",
    description: "AI music generator that creates music from text prompts.",
    category: "Audio & Voice",
    url: "https://www.riffusion.com",
    free: false,
  },
];

const loadTools = (): Tool[] => {
  const savedTools = localStorage.getItem("aiToolsData");
  if (savedTools) {
    return JSON.parse(savedTools);
  }
  return initialToolsData;
};

const loadCategories = (): string[] => {
  const savedCategories = localStorage.getItem("aiToolsCategories");
  if (savedCategories) {
    return JSON.parse(savedCategories);
  }
  return categories;
};

export const saveTools = (tools: Tool[]): void => {
  localStorage.setItem("aiToolsData", JSON.stringify(tools));
};

export const saveCategories = (categories: string[]): void => {
  localStorage.setItem("aiToolsCategories", JSON.stringify(categories));
};

export const toolsData: Tool[] = loadTools();
export const availableCategories: string[] = loadCategories();
