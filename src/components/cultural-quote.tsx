import { BookText, Music, Quote, ScrollText } from "lucide-react";

interface CulturalQuoteProps {
  text: string;
  transliteration: string;
  translation: string;
  source: string;
  type: 'poem' | 'song' | 'proverb' | 'literature';
}

const iconMap = {
  poem: ScrollText,
  song: Music,
  proverb: Quote,
  literature: BookText,
};

// Color schemes for different languages
const languageColorMap: Record<string, { light: string, dark: string, textLight: string, textDark: string, iconColor: string }> = {
  default: {
    light: 'bg-sky-50',
    dark: 'dark:bg-sky-900/30',
    textLight: 'text-gray-700',
    textDark: 'dark:text-gray-100',
    iconColor: 'text-sky-500 dark:text-sky-400'
  },
  kannada: {
    light: 'bg-amber-50',
    dark: 'dark:bg-amber-900/30',
    textLight: 'text-gray-700',
    textDark: 'dark:text-amber-50',
    iconColor: 'text-amber-500 dark:text-amber-400'
  },
  telugu: {
    light: 'bg-emerald-50',
    dark: 'dark:bg-emerald-900/30',
    textLight: 'text-gray-700',
    textDark: 'dark:text-emerald-50',
    iconColor: 'text-emerald-500 dark:text-emerald-400'
  }
};

export function CulturalQuote({
  text,
  transliteration,
  translation,
  source,
  type,
}: CulturalQuoteProps) {
  // Detect language based on content (simple heuristic)
  let language = 'default';
  
  // Check for Kannada or Telugu based on source text
  if (source.toLowerCase().includes('kannada')) {
    language = 'kannada';
  } else if (source.toLowerCase().includes('telugu')) {
    language = 'telugu';
  }
  
  const colorScheme = languageColorMap[language];
  
  const renderIcon = () => {
    switch (type) {
      case 'poem':
        return <ScrollText className={`h-5 w-5 ${colorScheme.iconColor}`} />;
      case 'song':
        return <Music className={`h-5 w-5 ${colorScheme.iconColor}`} />;
      case 'proverb':
        return <Quote className={`h-5 w-5 ${colorScheme.iconColor}`} />;
      case 'literature':
        return <BookText className={`h-5 w-5 ${colorScheme.iconColor}`} />;
      default:
        return <Quote className={`h-5 w-5 ${colorScheme.iconColor}`} />;
    }
  };

  return (
    <div className={`${colorScheme.light} ${colorScheme.dark} rounded-xl p-6 shadow-sm dark:shadow-md dark:shadow-black/20`}>
      <div className="flex items-start gap-4">
        <div className="mt-1">
          {renderIcon()}
        </div>
        <div className="flex-1 space-y-2">
          <p className={`text-xl font-medium ${colorScheme.textLight} ${colorScheme.textDark}`}>{text}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300 italic">{transliteration}</p>
          <p className={`text-sm ${colorScheme.textLight} ${colorScheme.textDark}`}>{translation}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{source}</p>
        </div>
      </div>
    </div>
  );
}