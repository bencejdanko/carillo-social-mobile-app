#!/bin/bash

if [[ $1 == "dev" ]]; then
    ./pocketbase serve --http="172.21.232.123:8090" --dev
else
    ./pocketbase serve --http="172.21.232.123:8090"
fi