#!/bin/bash

if [[ $1 == "dev" ]]; then
    ./pocketbase serve --http="172.21.232.123:80" --dev
else
    ./pocketbase serve --http="172.21.232.123:80"
fi