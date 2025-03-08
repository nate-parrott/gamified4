# Dev

`npm install`

`gatsby develop` (or `npx gatsby develop`)

Then visit `localhost:8000`

# All those fucking typescript import warnings in vscode

Delete the `.tsx` from the end. Pain in the ass so I haven't finished doing it... not sure when this changes. Gotta love JS!

# Deploy

`npx gatsby build`

Then copy `public` dir into the root of the `public` branch (use a worktree to make it easier?)

(If it's cloned in `../gamified4-public`, you can use `rsync -av --delete --exclude .git --exclude CNAME public/ ../gamified4-public/`)

# Codebase Architecture

## Core Components and Concepts

### Points and Currency System

- **Coins**: Primary currency earned by viewing content or winning at mini-games
- **ActivityStore** (`src/components/activityStore.tsx`): Central data store that tracks:
  - User's coin balance
  - Unlocked awards/trophies
  - Messages/activity history
  - Unlocked incentives (premium features)
  - User-provided data (like email)

### Rewards and Progression

- **Awards** (`activityStore.tsx`): Achievements with coin rewards
  - ID, name, coin amount, activity text, notification type, category
  - Awarded for viewing content, clicking milestones, etc.

- **Trophies** (`src/components/trophy.tsx`, `src/components/trophyLogic.ts`): Special achievements
  - Visible badges with emoji, name, and description
  - Examples: Reading Rainbow (read 5 pieces of content), Clicker Clique (click 20 times)
  - Some can be self-claimed (social media follows)

- **Incentives** (`src/components/incentives.tsx`): Purchasable upgrades
  - Cost coins to unlock
  - Examples: premium cursor (20 coins), 2x coin multiplier (24 coins), Gold Mode (56 coins)

### Interactive Elements

- **Slot Machine** (`src/components/slots.tsx`): 
  - Mini-game costing 1 coin per spin
  - Rewards 3 coins for 2 matching icons, 50 coins for 3 matches
  - Custom icons created in Blender

- **Content Engagement** (`src/components/awardUtils.tsx`):
  - `playlistWithAward()` function handles awarding coins for viewing content
  - Default is 5 coins per content item viewed

- **Modal System** (`src/components/modalPlayer.tsx`):
  - Handles displaying interactive content, rewards, and unlocks

### Data Persistence

All user progress is stored in the browser's localStorage under the key "activity", including:
- Coin balance
- Unlocked awards/trophies
- Unlocked purchasable incentives
- Message history

### File Structure

- `src/pages/index.tsx`: Main homepage with content tiles and interactive elements
- `src/components/`: Core functionality components
  - `activityStore.tsx`: Central data and state management
  - `trophy.jsx` & `trophyLogic.ts`: Trophy display and achievement logic
  - `incentives.tsx`: Purchasable upgrades
  - `slots.tsx`: Slot machine mini-game
  - `awardUtils.tsx`: Handles content rewards
  - `modalPlayer.tsx`: Modal display system
- `src/images/`: Assets including icons, tiles, and UI elements
- `static/`: Content pages and assets for portfolio projects
