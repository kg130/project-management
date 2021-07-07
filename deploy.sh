#!/usr/bin/env bash

git checkout main
git pull origin main
npm i
ng build --prod
