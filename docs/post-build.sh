#!/bin/bash
# post-build: 复制 README.html → index.html，让 Cloudflare Pages 支持 clean URL

DIST_DIR="$(cd "$(dirname "$0")" && pwd)/.vitepress/dist"

find "$DIST_DIR" -name "README.html" | while read file; do
    dir=$(dirname "$file")
    cp "$file" "$dir/index.html"
    echo "✅ $dir/index.html"
done

echo ""
echo "✅ post-build 完成：所有 README.html → index.html"
