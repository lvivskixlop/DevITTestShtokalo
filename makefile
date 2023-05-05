build:
	npm i
	cd src
	npx sequelize-cli db:migrate

run:
	ng serve
	node src/server.js