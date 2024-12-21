# Best Release Indonesia

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-13+-000000?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![NextUI](https://img.shields.io/badge/NextUI-Latest-000000?style=for-the-badge)](https://nextui.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

A searchable Best Release Indonesia table component built with Next.js and NextUI, featuring detailed information modals and comprehensive release tracking.

[Features](#features) •
[Installation](#installation) •
[Usage](#usage) •
[Documentation](#documentation) •
[Contributing](#contributing)

</div>

## ✨ Features

- 🔍 Searchable anime release table with real-time filtering
- 📱 Responsive design for all screen sizes
- 🖼️ Optimized anime cover image display
- 📑 Multiple tabs for different types of release information
- 🔗 Organized download links management
- 🌙 Dark mode support
- 🚀 Built with Next.js 13+ and NextUI

## 🚀 Installation

### Prerequisites

- Node.js 16.8.0 or newer
- Next.js 13 or newer
- React 18 or newer

### Setup

1. Install required dependencies:

```bash
npm install @nextui-org/react framer-motion lucide-react next-themes
```

2. Configure Tailwind CSS - update your `tailwind.config.js`:

```javascript
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        // ...
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {}
    },
    darkMode: "class",
    plugins: [nextui()]
};
```

3. Set up NextUI Provider - create or update `app/providers.tsx`:

```typescript
"use client";

import { NextUIProvider } from "@nextui-org/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      {children}
    </NextUIProvider>
  );
}
```

4. Create your anime release data file at `public/data/animeRelease.json`:

```json
[
    {
        "malId": 1,
        "title": "Example Anime",
        "bestReleases": [
            {
                "name": "Release Group Name",
                "description": "Release description",
                "downloadLinks": ["https://example.com/download"]
            }
        ],
        "bestAlternatives": [
            {
                "name": "Alternative Release",
                "description": "Alternative description",
                "downloadLinks": ["https://example.com/alternative"]
            }
        ],
        "notes": "Additional notes about the release",
        "qualityComparisons": "Quality comparison links",
        "missingReleases": "Information about missing releases"
    }
]
```

## 📖 Usage

Import and use the component in your Next.js page:

```typescript
// app/page.tsx
import AnimeReleaseTable from '@/components/AnimeReleaseTable';

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <AnimeReleaseTable />
    </main>
  );
}
```

## 📚 Documentation

### Component Structure

- `AnimeReleaseTable`: Main component for data management and display
- `ReleaseLinks`: Handles download link rendering
- `ReleaseSection`: Manages release information sections

### TypeScript Interfaces

```typescript
interface AnimeRelease {
    title: string;
    malId: number;
    bestReleases?: Release[] | string;
    bestAlternatives?: Release[] | string;
    notes?: string;
    qualityComparisons?: string;
    missingReleases?: string;
    downloadLinks?: string | string[];
}

interface Release {
    name?: string;
    description?: string;
    downloadLinks?: string | string[];
}
```

### API Integration

The component integrates with the Jikan API (MyAnimeList API) for fetching additional anime information. No API key is required, but please be mindful of rate limits.

### Customization

You can customize the component by:

- Modifying table columns in the TableHeader component
- Adjusting modal sizes via the size prop
- Customizing tabs and their content
- Adding new fields to the data structure
- Modifying search functionality

## 🔧 Technical Details

### Performance Optimization

- Client-side search filtering
- Optimized image loading with Next.js Image component
- Efficient data management for large datasets

### Browser Support

Compatible with all modern browsers supporting:

- CSS Grid and Flexbox
- ES6+ JavaScript features
- Next.js requirements

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Submit issues
- Propose new features
- Create pull requests

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/Aruh1/best-release-indonesia/blob/master/LICENSE) file for details.

## 🙏 Acknowledgments

Built with:

- [Next.js](https://nextjs.org/) - React framework
- [NextUI](https://nextui.org/) - UI components
- [Lucide](https://lucide.dev/) - Icons
- [Jikan API](https://jikan.moe/) - Anime data

---

<div align="center">
Made with ❤️ by the Koisuru-project team
</div>
