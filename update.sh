npx gatsby build && rsync -av --delete --exclude .git --exclude CNAME public/ ../gamified4-public/ && cd ../gamified4-public/ && git add . && git commit -m "update" && git push

