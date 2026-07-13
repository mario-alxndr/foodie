# Theming

`ThemeProvider` is the entry point for applying any Asphalt theme to
your app. Themes are plain JS objects that map CSS custom properties to concrete values.
Asphalt themes control all color tokens used by every component.
Avoid using custom theming or token overrides.

> ⚠️ `ThemeProvider` only works in
> [secure contexts](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts)
> (i.e. served over HTTPS or `localhost`).

## Step 0 — Choose detection mode

Use one of these flows based on tool availability:

- **Preferred:** Figma MCP available → follow Steps 1–3 using `get_libraries`, `get_metadata`, and `get_variable_defs`.
- **Fallback:** Figma MCP not found/unavailable → use the manual capture flow in **Step 0A**, then continue from Step 4.

## Step 0A — Manual capture fallback (no Figma MCP)

If MCP tools are unavailable, extract two signals directly from the design:

1. **Brand primary color** from an interactive surface (Button primary, primary CTA, or active Textfield state).
2. **Typography font family** from a representative body or heading text.

Use Figma Inspect mode, Dev Mode, or a screenshot + color picker/font inspector to capture these values.

Then map them with the same rules used in the MCP flow:

### Manual color mapping

Match the captured primary brand color to this table:

| Captured brand primary color | Theme |
|-----------------------------|-------|
| `#00aa13` | **Lyra** |
| `#00880D` | **Aloha** or **Vela** |
| `#0256a7` | **Carina** |
| `#bd1913` | **Draco** |
| `linear-gradient(180deg, #5EB466 0%, #169222 100%)` | **Lynx** |

### Manual typography mapping

Use the captured font family to confirm (or disambiguate):

| Captured font family | Theme |
|----------------------|-------|
| **Maison Neue** / Maison Neue Extended | **Aloha**, **Lyra**, **Vela** |
| **Roboto** | **Carina** |
| **Poppins** | **Draco** |
| **Rupa** | **Lynx** |

If color is `#00880D` and font is Maison Neue, use corner style to resolve:

- Rounded corners on buttons/cards → **Aloha**
- Square/minimal corners → **Vela**

When both color and font match a single theme, continue to Step 4.


## Step 1 — Detect the token library from Figma

Call `get_libraries` with the Figma `fileKey` to retrieve the libraries connected to the file:

```
figma:get_libraries { fileKey: "<fileKey>" }
```

Scan the `libraries_added_to_file` array for library names that contain a color/token theme name. Ignore typography, icon, spacing, component, and shadow libraries.

**Look for these keywords in library names:**

| Keyword in library name | Asphalt theme | npm package |
|-------------------------|---------------|-------------|
| `Lyra` | Lyra (default) | *(built-in — no install needed)* |
| `Aloha` | Aloha | `@gojek/theme-asphalt-web-aloha` |
| `Carina` | Carina | `@gojek/theme-asphalt-web-carina` |
| `Draco` | Draco | `@gojek/theme-asphalt-web-draco` |
| `Lynx` | Lynx | `@gojek/theme-asphalt-web-lynx` |
| `Vela` | Vela | `@gojek/theme-asphalt-web-vela` |

**Real examples from Figma:**

| Figma library name | Detected theme |
|--------------------|----------------|
| `Web v2.0 Color Lyra [Dark]`, `Web v2.0 Color Lyra [Light]` | **Lyra** (default) |
| `Web v2.0 Component-Enterprise` | **Lyra** (default) |
| `Web v2.0 Typo Maison-Neue` | **Lyra** (default) |
| `Asphalt Aloha` | **Aloha** |
| `Web v2.0 Color Aloha [Dark]`, `Web v2.0 Color Aloha [Light]` | **Aloha** |
| `Web v2.0 Gopay Merchant Asphalt Web` | **Lynx** |
| `Web v2.0 Typo Rupa` | **Lynx** |

> If a single theme keyword is unambiguously found, you can skip to Step 3. If multiple theme libraries are detected, proceed to Step 2.

---

## Step 2 — Narrow by component token usage (multiple libraries only, MCP flow)

When Step 1 returns more than one candidate theme library, call `get_metadata` on the target node to walk its component tree, then call `get_variable_defs` on any interactive component (Button, Textfield, etc.) found as an `instance` inside the node or its children.

```
figma:get_metadata  { fileKey: "<fileKey>", nodeId: "<frame-node-id>" }
figma:get_variable_defs { fileKey: "<fileKey>", nodeId: "<instance-node-id>" }
```

Look for the token named **`interactive/surface/brand/primary`** (Figma variable notation) — this maps to the CSS custom property `--interactive-surface-brand-primary-default` in code. Its hardcoded fallback color is the most reliable theme indicator:

| `interactive/surface/brand/primary` fallback | Theme |
|----------------------------------------------|-------|
| `#00aa13` | **Lyra** |
| `#00880D` | **Aloha** |
| `#0256a7` | **Carina** |
| `#bd1913` | **Draco** |
| `linear-gradient(180deg, #5EB466 0%, #169222 100%)` | **Lynx** |
| `#00880D` | **Vela** |

> **Aloha vs Vela disambiguation:** Both share `#00880D`. Proceed to Step 3 (typography) to tell them apart.

---

## Step 3 — Confirm via typography font family (MCP flow)

When the brand color alone is ambiguous (Aloha vs Vela), or as a general confirmation step, inspect the typography used in the design. Call `get_variable_defs` on any text node, or read the font family from the `get_metadata` output.

Each Asphalt theme uses a distinct font family:

| Font family in design | Theme |
|-----------------------|-------|
| **Maison Neue** / Maison Neue Extended | **Aloha**, **Lyra**, **Vela** |
| **Roboto** | **Carina** |
| **Poppins** | **Draco** |
| **Rupa** | **Lynx** |

When Maison Neue is found alongside `#00880D`, cross-reference component roundness:
- Rounded corners on buttons/cards → **Aloha**
- Square/minimal corners → **Vela**

If the Figma typography library name contains `Aloha`, `Rupa`, `Poppins`, or `Roboto`, that alone is sufficient confirmation.

---

## Step 4 — Install the theme package

Skip this step if the detected theme is **Lyra** (it is built into every Asphalt component and requires no extra install).

For all other themes, install the corresponding package **before writing any code**:

```bash
npm install @gojek/theme-asphalt-web-<theme-name>
# Example:
npm install @gojek/theme-asphalt-web-aloha
```

---

## Step 5 — Apply ThemeProvider

Import `ThemeProvider` from `@asphalt-react/theme-provider` and wrap the page (or the section where the theme should apply).

### Lyra (default — no theme import needed)

```tsx
import { ThemeProvider } from "@asphalt-react/theme-provider";

// Lyra is the default; passing no theme prop is equivalent to the Lyra theme.
// Only wrap with ThemeProvider if you need to scope or override tokens.
export const App = () => (
  <ThemeProvider>
    <UserPage />
  </ThemeProvider>
);
```

### Any named theme (Aloha, Carina, Draco, Lynx, Vela)

Import theme from respective package, see package mapping in Step 1.
Package name imported as a single word of the theme name, such as `aloha`, `lynx`, `draco`.

```tsx
import { ThemeProvider } from "@asphalt-react/theme-provider";
import { aloha } from "@gojek/theme-asphalt-web-aloha"; // swap package name as needed

export const App = () => (
  <ThemeProvider theme={aloha}>
    <UserPage />
  </ThemeProvider>
);
```

### Scoped theming (only one section uses a different theme)

```tsx
<Page>
  <Page.Main>
    {/* default Lyra theme */}
    <HeroSection />

    {/* override to Aloha for a promotional block */}
    <ThemeProvider theme={aloha}>
      <PromoCard />
    </ThemeProvider>
  </Page.Main>
</Page>
```

### Responsive theming

Use when the Figma design has distinct Mobile / Desktop token overrides:

```tsx
<ThemeProvider theme={aloha} responsive>
  <Page />
</ThemeProvider>
```


## Dark mode

Switch the theme object based on the user's preference. Each
pre-built theme also ships a dark variant alongside its default.

```tsx
import React, { useState, useEffect } from "react"
import { ThemeProvider } from "@asphalt-react/theme-provider"

function useColorScheme() {
  const [scheme, setScheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)")
    setScheme(media.matches ? "dark" : "light")
    const handler = (e: MediaQueryListEvent) =>
      setScheme(e.matches ? "dark" : "light")
    media.addEventListener("change", handler)
    return () => media.removeEventListener("change", handler)
  }, [])

  return scheme
}

const lightTheme = { /* tokens for light */ }
const darkTheme = { /* tokens for dark */ }

export function App() {
  const scheme = useColorScheme()
  return (
    <ThemeProvider theme={scheme === "dark" ? darkTheme : lightTheme}>
      <Button primary>Auto-themed</Button>
    </ThemeProvider>
  )
}
```

---

## Step 6 — Placement rules

| Where to add ThemeProvider | When |
|----------------------------|------|
| Root of the app (`App.tsx` / `index.tsx`) | One theme applies to the entire product |
| Route component (`<UserPage>`) | Theme is page-specific |
| Inside `Page.Main` / `Page.Aside` | Theme is section-specific only |

**Never** add ThemeProvider inside a `Layout` or `Card` just to change one component's color. Prefer semantic intent props (`primary`, `brand`, `danger`) for per-component color variance.

---

## Checklist

- [ ] Chose a detection mode: MCP flow (Steps 1–3) or manual fallback (Step 0A)
- [ ] MCP flow: called `get_libraries` on the Figma file to scan for active theme libraries (Step 1)
- [ ] MCP flow (multiple candidates): called `get_metadata` on the target node, then `get_variable_defs` on an interactive instance to read the `interactive/surface/brand/primary` fallback color (Step 2)
- [ ] MCP flow (ambiguous brand color): checked typography font family from metadata or variable defs (Step 3)
- [ ] Manual fallback: captured brand primary color from design and mapped it using the existing color mapping table (Step 0A)
- [ ] Manual fallback: captured typography font family and used it to confirm/disambiguate the theme (Step 0A)
- [ ] Installed the theme package (Step 4, skip if Lyra)
- [ ] Imported `ThemeProvider` from `@asphalt-react/theme-provider`
- [ ] Imported the named theme object from `@gojek/theme-asphalt-web-<name>` (if not Lyra)
- [ ] Wrapped the correct scope (app / page / section) with `ThemeProvider` (Step 5)
- [ ] Did NOT put ThemeProvider inside a `Layout` or `Card` just to change one color

## See also

- [icons.md](./icons.md) — Icontuner pairs nicely with brand tokens
  for branded icons.
