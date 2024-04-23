all: run

run:
	@tsc *.ts -outDir dist/ && node dist/index.js