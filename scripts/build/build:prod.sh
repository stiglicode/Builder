#! /bin/bash

rm -rf dist/ && prettier --write bin/ && webpack --mode=production --node-env=production