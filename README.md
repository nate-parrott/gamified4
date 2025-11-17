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

# Updating the archive