all: run

run:
	sudo docker run -d -p 3000:3000 --restart always --name autobumper autobumper

stop:
	sudo docker stop autobumper