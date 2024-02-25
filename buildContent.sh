#! /usr/bin/env bash

set -e

source .env

echo "Clearing old files..."
if [ -d temp ]
then
  rm -rf temp
fi
if [ -d app/chapters ]
then
  rm -rf app/chapters
fi
if [ -d dist/unpublished ]
then
  rm -rf dist/unpublished
fi

echo "Initializing directories..."
mkdir -p temp/public
touch temp/public/index.ts
mkdir -p temp/unpublished
mkdir -p dist

echo "Converting public chapters..."
publicChapters=()
for file in content/public/*.md
do 
  if [ -f "$file" ]
  then
    chapterMarkdownFile=$(basename $file)
    chapter="${chapterMarkdownFile%.*}"
    ./node_modules/.bin/showdown makehtml -i $file -o temp/public/$chapter.html
    echo "import ${chapter} from './${chapter}.html';" >> temp/public/index.ts
    publicChapters+=( $chapter )
  fi
done

echo "export default {" >> temp/public/index.ts
for chapter in "${publicChapters[@]}"
do
  echo "  ${chapter}," >> temp/public/index.ts
done
echo "};" >> temp/public/index.ts

echo "Converting and encrypting unpublished content..."
for file in content/unpublished/*.md
do 
  if [ -f "$file" ]
  then
    chapterMarkdownFile=$(basename $file)
    chapter="${chapterMarkdownFile%.*}"
    ./node_modules/.bin/showdown makehtml -i $file -o temp/unpublished/$chapter.html
  fi
done
./node_modules/.bin/staticrypt -r temp/unpublished

echo "Cleaning up..."
mv encrypted/unpublished dist/unpublished
mv temp/public app/chapters

rm -rf temp
rm -rf encrypted