REPORTER = "dot"

test:
	./node_modules/.bin/mocha --recursive --reporter ${REPORTER} --ignore-leaks

.PHONY: test