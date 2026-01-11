# Images Folder Structure

This folder contains all image assets for the application.

## Folder Organization

```
src/assets/images/
├── tours/       # Tour-related images (thumbnails, galleries)
├── locations/   # Location photos (caves, temples, heritage sites, forts)
├── icons/       # Custom icons and small graphics
├── banners/     # Hero banners, promotional images
└── README.md    # This file
```

## Usage

Import images in React components using ES6 imports:

```tsx
import tourImage from '@/assets/images/tours/ajanta-caves.jpg';
import locationBanner from '@/assets/images/banners/hero.jpg';

// Use in component
<img src={tourImage} alt="Ajanta Caves" />
```

## Guidelines

- Use descriptive, kebab-case filenames (e.g., `ajanta-caves-entrance.jpg`)
- Optimize images before adding (compress, resize appropriately)
- Preferred formats: `.webp` for photos, `.svg` for icons, `.png` for transparency
- Keep file sizes under 500KB for photos, under 50KB for icons
