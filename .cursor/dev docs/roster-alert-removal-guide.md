# Roster Alert Removal Guide

## When to Remove
Remove the roster alert when you've filled the **1 Outside Hitter**, **2 Middle Hitters**, **1 Setter**, and **1 Opposite Hitter** positions.

## How to Remove (2 simple steps)

### Step 1: Remove from BaseLayout
In `src/components/layout/BaseLayout.astro`:

**Remove these lines (around line 214-217):**
```astro
<!-- Temporary Roster Alert - Remove when positions are filled -->
<div class="pt-[72px]">
  <RosterAlert />
</div>
```

**And remove the import (around line 3):**
```astro
import RosterAlert from '../ui/RosterAlert.astro';
```

**Then restore the original main tag:**
```astro
<main id="main-content" class="flex-1 w-full pt-[72px]">
  <slot />
</main>
```

### Step 2: Delete the Component File
Delete the file: `src/components/ui/RosterAlert.astro`

## That's it!
The alert will be completely removed from your site with no trace left behind.

## Alternative: Temporarily Hide
If you want to temporarily hide it without deleting:
- In `BaseLayout.astro`, add `style="display: none;"` to the roster alert div
- Comment out the `<RosterAlert />` line with `<!-- <RosterAlert /> -->` 