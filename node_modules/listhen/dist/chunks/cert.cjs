'use strict';

const node_util = require('node:util');
const forge = require('node-forge');
const ipRegex = require('ip-regex');

async function generateSSLCert(options) {
  const attributes = [
    // Use the first address as common name if no common name is provided
    { name: "commonName", value: options.commonName || options.domains[0] }
  ];
  const extensions = [
    { name: "basicConstraints", cA: false, critical: true },
    {
      name: "keyUsage",
      digitalSignature: true,
      keyEncipherment: true,
      critical: true
    },
    { name: "extKeyUsage", serverAuth: true, clientAuth: true },
    {
      name: "subjectAltName",
      altNames: options.domains.map((domain) => {
        const types = { domain: 2, ip: 7 };
        const isIp = ipRegex({ exact: true }).test(domain);
        if (isIp) {
          return { type: types.ip, ip: domain };
        }
        return { type: types.domain, value: domain };
      })
    }
  ];
  const ca = forge.pki.certificateFromPem(options.caCert);
  return await generateCert({
    subject: attributes,
    issuer: ca.subject.attributes,
    extensions,
    validityDays: options.validityDays,
    signWith: options.caKey
  });
}
async function generateCA(options = {}) {
  const attributes = [
    options.commonName && { name: "commonName", value: options.commonName },
    options.countryCode && { name: "countryName", value: options.countryCode },
    options.state && { name: "stateOrProvinceName", value: options.state },
    options.locality && { name: "localityName", value: options.locality },
    options.organization && {
      name: "organizationName",
      value: options.organization
    }
  ].filter(Boolean);
  const extensions = [
    { name: "basicConstraints", cA: true, critical: true },
    { name: "keyUsage", keyCertSign: true, critical: true }
  ];
  return await generateCert({
    subject: attributes,
    issuer: attributes,
    extensions,
    validityDays: options.validityDays || 365
  });
}
async function generateCert(options) {
  const serial = Math.floor(Math.random() * 95e3 + 5e4).toString();
  const generateKeyPair = node_util.promisify(
    forge.pki.rsa.generateKeyPair.bind(forge.pki.rsa)
  );
  const keyPair = await generateKeyPair({ bits: 2048, workers: 4 });
  const cert = forge.pki.createCertificate();
  cert.publicKey = keyPair.publicKey;
  cert.serialNumber = Buffer.from(serial).toString("hex");
  cert.validity.notBefore = new Date();
  cert.validity.notAfter = new Date();
  cert.validity.notAfter.setDate(
    cert.validity.notAfter.getDate() + options.validityDays
  );
  cert.setSubject(options.subject);
  cert.setIssuer(options.issuer);
  cert.setExtensions(options.extensions);
  const signWith = options.signWith ? forge.pki.privateKeyFromPem(options.signWith) : keyPair.privateKey;
  cert.sign(signWith, forge.md.sha256.create());
  return {
    key: forge.pki.privateKeyToPem(keyPair.privateKey),
    cert: forge.pki.certificateToPem(cert)
  };
}

exports.generateCA = generateCA;
exports.generateCert = generateCert;
exports.generateSSLCert = generateSSLCert;
