#!/bin/sh

cd ../backend/minitwit_api
eslint ./
exitcode=$?
echo "Static analysis completed."
exit $exitcode