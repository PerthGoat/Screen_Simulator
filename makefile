build: main.js
	mv main.js js

main.js: ts/main.ts
	tsc -t ES2020 ts/main.ts --outFile main.js