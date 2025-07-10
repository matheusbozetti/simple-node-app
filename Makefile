.PHONY: build-and-publish

build-and-publish:
	@read -p "Informe a versão (ex: 1.0.0): " VERSION; \
	echo "🔧 Buildando imagem com tag $$VERSION..."; \
	docker build -t simple-node-app:$$VERSION . && \
	docker tag simple-node-app:$$VERSION matheusbozetti/simple-node-app:$$VERSION && \
	docker push matheusbozetti/simple-node-app:$$VERSION
