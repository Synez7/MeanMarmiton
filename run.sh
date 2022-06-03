#!/bin/bash

gnome-terminal -- /bin/sh -c 'cd ./MARMITON_SERVEUR; npm i;  ./script.sh'

gnome-terminal -- /bin/sh -c 'cd ./MARMITON_CLIENT/; npm i; cd ./src/app; ng serve -o'

