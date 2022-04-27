#! /bin/bash

rm -rf dist/ && prettier --write bin/ && webpack --mode=development