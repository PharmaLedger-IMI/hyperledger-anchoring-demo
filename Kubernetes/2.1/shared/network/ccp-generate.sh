#!/bin/bash

function one_line_pem {
    echo "`awk 'NF {sub(/\\n/, ""); printf "%s\\\\\\\n",$0;}' $1`"
}

function json_ccp {
    local PP=$(one_line_pem $1)
    local CP=$(one_line_pem $2)
    sed -e "s#\${PEERPEM}#$PP#" \
        -e "s#\${CAPEM}#$CP#" \
        ccp-template.json
}




PEERPEM=crypto-config/peerOrganizations/org1/tlsca/tlsca.org1-cert.pem
CAPEM=crypto-config/peerOrganizations/org1/ca/ca.org1-cert.pem

echo "$(json_ccp $PEERPEM $CAPEM)" > connection.json

