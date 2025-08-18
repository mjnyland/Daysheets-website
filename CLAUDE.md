# Project Guidelines for Daysheets Website

## Animation Standards

### GSAP Implementation
This project uses GSAP (GreenSock Animation Platform) with ScrollTrigger for all scroll-based animations. Follow these best practices:

#### Setup and Registration
```javascript
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Always register plugins at the top
gsap.registerPlugin(ScrollTrigger);
```

#### Best Practices

1. **Use GSAP Context for Cleanup**
   - Always wrap GSAP animations in `gsap.context()` for proper cleanup
   - Call `ctx.revert()` in cleanup function to prevent memory leaks

2. **ScrollTrigger Configuration**
   - Use `pin: true` for sections that should stick during scroll
   - Set `scrub: 1` for smooth scroll-linked animations
   - Use `anticipatePin: 1` to prevent jumping on fast scrolls

3. **Performance Optimization**
   - Use `gsap.set()` for immediate property changes without animation
   - Batch related animations in timelines
   - Use function-based values for responsive calculations: `x: () => window.innerWidth * 0.5`

4. **Timeline Management**
   - Create single timeline with ScrollTrigger for complex sequences
   - Use position parameter (third argument) to control timing
   - Example: `tl.to(element, {...}, 0.5)` starts at 0.5 seconds

5. **Common Patterns**
   ```javascript
   useEffect(() => {
     const ctx = gsap.context(() => {
       const tl = gsap.timeline({
         scrollTrigger: {
           trigger: section,
           start: "top top",
           end: "+=200%",
           pin: true,
           scrub: 1,
         }
       });
       
       // Add animations to timeline
       tl.to(element, { opacity: 0, scale: 0.8 }, 0);
     }, containerRef);
     
     return () => ctx.revert();
   }, []);
   ```

#### Animation Types Used

1. **Pin & Reveal**: Sections that stick while content animates (PhoneScrollSection, SummaryCards)
2. **Scroll-linked Progress**: Elements that transform based on scroll position
3. **Stagger Animations**: Multiple elements animating in sequence (FlightGrid)

#### Consistency Rules

- All scroll animations should use GSAP, not CSS transitions or React state
- Maintain consistent easing: `power2.out` for entrances, `power2.inOut` for transforms
- Standard durations: 0.3s for quick fades, 0.5s for reveals, 2s for long scrolls
- Always include proper cleanup to prevent memory leaks

## Code Style

- Use TypeScript for all components
- Follow existing component structure and naming conventions
- Keep animations performant - avoid animating properties that trigger layout reflow

## Testing Commands

Run these commands after making changes:
```bash
npm run lint      # Check code style
npm run typecheck # Verify TypeScript types
npm run build     # Ensure production build works
```