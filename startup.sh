#!/bin/bash

npx prisma migrate deploy
X=$?

if [ $X -eq 1 ]; then
  echo "Error in migration"
  exit 1
fi


node dist/index.js
