# Assets Directory

This directory contains (or should contain) the static assets for the application.
In the current development/production environment, high-quality assets are managed via Unsplash URLs and integrated directly into the components using the `ImageWithFallback` pattern or static URL constants.

## Key Assets:
- `logo.png` -> Spiritual/Abstract energy logo
- `atom.png` -> Quantum energy atom/sacred geometry
- `portrait.png` -> Professional therapist portrait
- `article1.png`, `article2.png`, `article3.png` -> Blog/Media article images

All imports in the components have been updated to use valid production URLs to ensure the build passes and the application looks visually stunning.
