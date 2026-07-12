---
name: Titan Infrastructure
colors:
  surface: '#f9f9ff'
  surface-dim: '#cfdaf1'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eeff'
  surface-container-high: '#dee8ff'
  surface-container-highest: '#d8e3fa'
  on-surface: '#111c2c'
  on-surface-variant: '#44464e'
  inverse-surface: '#263142'
  inverse-on-surface: '#ebf1ff'
  outline: '#75777f'
  outline-variant: '#c5c6cf'
  surface-tint: '#4c5e86'
  primary: '#00081e'
  on-primary: '#ffffff'
  primary-container: '#0a1f44'
  on-primary-container: '#7687b2'
  inverse-primary: '#b4c6f4'
  secondary: '#795900'
  on-secondary: '#ffffff'
  secondary-container: '#ffc641'
  on-secondary-container: '#715300'
  tertiary: '#070a0a'
  on-tertiary: '#ffffff'
  tertiary-container: '#1e2122'
  on-tertiary-container: '#868889'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d9e2ff'
  primary-fixed-dim: '#b4c6f4'
  on-primary-fixed: '#041a3f'
  on-primary-fixed-variant: '#34466d'
  secondary-fixed: '#ffdfa0'
  secondary-fixed-dim: '#f6be39'
  on-secondary-fixed: '#261a00'
  on-secondary-fixed-variant: '#5c4300'
  tertiary-fixed: '#e1e3e4'
  tertiary-fixed-dim: '#c5c7c8'
  on-tertiary-fixed: '#191c1d'
  on-tertiary-fixed-variant: '#454748'
  background: '#f9f9ff'
  on-background: '#111c2c'
  surface-variant: '#d8e3fa'
typography:
  display-lg:
    fontFamily: Montserrat
    fontSize: 56px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Montserrat
    fontSize: 28px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Work Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Work Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Work Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
---

## Brand & Style

The brand personality for the design system is anchored in reliability, structural integrity, and executive professionalism. It is designed for "Major Engineering Construction (MEC)" to project an image of an established industry leader capable of handling massive infrastructure projects with precision and grace. 

The visual style is **Corporate / Modern** with a high-end editorial finish. It avoids the grit typically associated with construction, instead focusing on the "Engineering" aspect—clean, mathematical, and premium. While the overall layout utilizes a rigid, straight-edged grid to symbolize stability, individual UI components feature soft rounding to convey a sophisticated, modern user experience. The aesthetic balances the heavy, industrial nature of the primary navy blue with the prestige of gold/amber accents.

## Colors

The palette is rooted in a high-contrast relationship between deep industrial tones and prestigious accents. 

- **Primary (Deep Navy):** Represents authority, depth, and institutional trust. It should be used for headers, primary buttons, and heavy structural elements.
- **Secondary (Gold/Amber):** A nod to construction safety equipment and high-value metalwork. Use this sparingly for key CTAs, active states, and highlights.
- **Tertiary (Off-White/Snow):** Used for background surfaces to keep the interface feeling airy and premium, preventing the navy from becoming overbearing.
- **Neutrals:** A range of slate grays are used for secondary text and borders to maintain legibility without the harshness of pure black.

## Typography

This design system utilizes a tiered typographic approach to emphasize structural hierarchy. 

**Headlines** use **Montserrat**, chosen for its geometric purity and bold presence. High-level headers should utilize tight letter spacing and heavy weights to mimic the "solid" feel of steel beams. 

**Body text** uses **Work Sans**, providing a highly legible, professional contrast to the headlines. It maintains a neutral tone that ensures project data and technical descriptions are easy to digest. Label styles are frequently uppercased with increased letter spacing to serve as clear organizational markers across data-heavy layouts.

## Layout & Spacing

The layout philosophy is built on a **Fixed Grid** system to reflect the calculated nature of engineering. On desktop, content is contained within a 1280px wide 12-column grid. 

- **Symmetry:** Layouts should prioritize architectural balance. If a 2-column split is used, both sides should feel equal in visual "weight."
- **Rhythm:** An 8px base unit governs all padding and margins. 
- **Adaptation:** On tablet, the grid shifts to 8 columns with 24px gutters. On mobile, it moves to a single column with 16px side margins.
- **Sectioning:** Use full-width background color blocks (Off-White or Navy) to separate content sections, maintaining strictly horizontal divisions—no slants or organic shapes are permitted.

## Elevation & Depth

To achieve a "Premium Corporate" feel, this design system uses **Ambient Shadows** to create a sense of physical layering without appearing cluttered.

- **Soft Depth:** Shadows should be highly diffused and low-opacity (typically 8-12% opacity using the Primary Navy color as the shadow tint).
- **Surface-Container Tiering:** Most content sits on white "cards" elevated slightly above the off-white background.
- **Interactive States:** Upon hover, cards should lift slightly (increasing shadow spread) to provide tactile feedback.
- **Separation:** Thin, 1px borders in a light gray (#E2E8F0) may be used in conjunction with shadows for complex data tables to maintain strict alignment.

## Shapes

The shape language is a strategic blend of hard and soft. 

While the **layout containers** (sections, headers, footers) use 0px sharp edges to represent the "Industrial" and "Corporate" strength of the company, **UI components** (buttons, cards, input fields, and images) use a **Rounded** (0.5rem) radius. This softening of the internal elements creates a "Premium" and user-friendly interface that distinguishes the digital product from the ruggedness of a construction site. Pill-shaped buttons are reserved exclusively for secondary "tag" or "chip" elements.

## Components

### Buttons
- **Primary:** Solid Primary Navy background, white text, 0.5rem corner radius. Subtle gold border on hover.
- **Secondary:** Transparent background, Primary Navy border (2px), 0.5rem corner radius.
- **Action:** Gold/Amber background used only for the most critical conversion points (e.g., "Request Quote").

### Cards
- White background, 0.5rem corner radius, soft ambient shadow. 
- Headlines within cards should be Montserrat Bold, 20px.

### Input Fields
- Structured and clean. 1px border (#CBD5E0), 0.5rem radius. 
- Focus state: Border color changes to Gold/Amber with a soft outer glow.

### Lists & Data
- Professional list items with 1px bottom dividers.
- Icons should be monochromatic (Primary Navy or Gold) and utilize a "Line Art" style to maintain a technical, blue-print feel.

### Images
- All project photography must feature 0.5rem rounded corners. 
- Use high-quality, high-contrast imagery that emphasizes the scale of the construction projects.