install:
		npm ci

gendiff:
		node bin/gendiff.js

publish:
		npm publish --dry-run

lint:
		npx eslint .

test:
		npm run test

watch:
		npm run test-watch

cover:
		npm run test-cover
