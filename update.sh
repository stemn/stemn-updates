#!/bin/bash
echo "---------------------- Bump the updates.json file ----------------------"
node update.js
echo "------------------------- Pushing to the repo --------------------------"
git add .
git commit -m 'release'
git push
echo "---------------------------- Push complete -----------------------------"
