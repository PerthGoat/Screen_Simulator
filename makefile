build: main.js
	mv main.js js

main.js: ts/main.ts
	tsc ts/main.ts --outFile main.js