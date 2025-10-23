

pm2-setup:
	pm2 start pm2.config.cjs

build:
	@echo "running git pull....."
	git pull
	@echo "running go build....."
	NODE_OPTIONS="--max-old-space-size=1536" bun run build
	@echo "restarting service"
	pm2 restart safarana
