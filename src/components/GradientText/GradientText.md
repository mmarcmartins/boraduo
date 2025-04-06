# GradientText Component (Astro)

A component that displays text with an animated gradient effect.

## Usage

```astro
---
import { GradientText } from '../components/GradientText/GradientText.astro';
---

<GradientText>Hello World</GradientText>

<!-- With custom colors -->
<GradientText 
  colors={["#ff0000", "#00ff00", "#0000ff", "#ff0000"]}
  animationSpeed={5}
>
  Colorful Text
</GradientText>

<!-- With border -->
<GradientText showBorder={true}>Text with gradient border</GradientText>

<!-- With custom class -->
<GradientText className="large-text">Large gradient text</GradientText>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | string | `""` | Additional CSS classes |
| `colors` | string[] | `["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]` | Array of colors for the gradient |
| `animationSpeed` | number | `8` | Animation duration in seconds |
| `showBorder` | boolean | `false` | Whether to show a gradient border around the text |

## Notes

- This is the Astro version of the component, replacing the React implementation
- The component includes its own scoped CSS for the animation
- Uses Astro's slot system instead of React children 