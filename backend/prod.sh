#!/bin/bash

if [[ $1 == "dev" ]]; then
    ./pocketbase serve --dev
else
    ./pocketbase serve
fi