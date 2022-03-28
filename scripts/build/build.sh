#! /bin/bash

rm -rf dist/ && prettier --write src/ && yarn build:src && yarn build:types