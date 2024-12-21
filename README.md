# Best Release Indonesia

A React component built with Next.js and NextUI that displays a searchable table of anime releases with detailed information modals.

## Features

- Searchable anime release table
- Detailed modal view for each anime
- Display of anime cover images
- Multiple tabs for different types of release information
- Download links management
- Responsive design
- Title search functionality

## Prerequisites

- Node.js 16.8.0 or newer
- Next.js 13 or newer
- React 18 or newer

## Installation

1. First, make sure you have the required dependencies in your project:

```bash
npm install @nextui-org/react framer-motion lucide-react next-themes
```

2. Set up NextUI in your Next.js project by updating your `tailwind.config.js`:

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

3. Update your `app/providers.tsx` file to include NextUI's provider:

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

4. Create a data file at `public/data/animeRelease.json` with your anime release data in the following format:

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

## Usage

1. Copy the `AnimeReleaseTable` component to your project.

2. Import and use the component in your page:

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

## Component Structure

- `AnimeReleaseTable`: Main component that handles the data fetching and display
- `ReleaseLinks`: Subcomponent for rendering download links
- `ReleaseSection`: Subcomponent for rendering release information sections

## API Integration

The component uses the Jikan API (MyAnimeList API) to fetch additional anime information. No API key is required, but there are rate limits to consider.

## Interfaces

### AnimeRelease Interface

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
```

### Release Interface

```typescript
interface Release {
    name?: string;
    description?: string;
    downloadLinks?: string | string[];
}
```

## Styling

The component uses NextUI's built-in components and Tailwind CSS for styling. Custom styles can be added through Tailwind classes or by modifying the component's className props.

## Performance Considerations

- All anime data is loaded at once, which might impact initial load time for large datasets
- Images are loaded with Next.js Image component for optimization
- Search filtering is performed client-side

## Customization

You can customize the component by:

- Modifying the table columns in the TableHeader component
- Adjusting the modal size using the size prop
- Customizing the tabs and their content
- Adding additional fields to the data structure
- Modifying the search functionality

## Error Handling

The component includes basic error handling for:

- Failed API requests
- Missing or malformed data
- Image loading failures
- Search edge cases

## Browser Support

The component is compatible with all modern browsers that support:

- CSS Grid
- Flexbox
- ES6+ JavaScript features
- Next.js requirements

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [NextUI](https://nextui.org/)
- Icons from [Lucide](https://lucide.dev/)
- Anime data from [Jikan API](https://jikan.moe/)
