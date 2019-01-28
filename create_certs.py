import os
import datetime
from cryptography import x509
from cryptography.x509.oid import NameOID
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import serialization, hashes
from cryptography.hazmat.primitives.asymmetric import rsa


NGINX_BASE_DIR = "./nginx"
NGINX_SSL_DIR = NGINX_BASE_DIR + "/ssl"
NGINX_SSL_CERT_DIR = NGINX_SSL_DIR + "/certs"
NGINX_SSL_PRIVATE_DIR = NGINX_SSL_DIR + "/private"

NGINX_SSL_DIR_EXISTS = os.path.isdir(NGINX_SSL_DIR)
NGINX_SSL_CERT_DIR_EXISTS = os.path.isdir(NGINX_SSL_CERT_DIR)
NGINX_SSL_PRIVATE_DIR_EXISTS = os.path.isdir(NGINX_SSL_PRIVATE_DIR)

if not NGINX_SSL_DIR_EXISTS:
    try:
        os.mkdir(NGINX_SSL_DIR)
    except OSError:
        print("Creation of the directory %s failed" % NGINX_SSL_DIR)
    else:
        print("Successfully created the directory %s " % NGINX_SSL_DIR)

if not NGINX_SSL_CERT_DIR_EXISTS:
    try:
        os.mkdir(NGINX_SSL_CERT_DIR)
    except OSError:
        print("Creation of the directory %s failed" % NGINX_SSL_CERT_DIR)
    else:
        print("Successfully created the directory %s " % NGINX_SSL_CERT_DIR)

if not NGINX_SSL_PRIVATE_DIR_EXISTS:
    try:
        os.mkdir(NGINX_SSL_PRIVATE_DIR)
    except OSError:
        print("Creation of the directory %s failed" % NGINX_SSL_PRIVATE_DIR)
    else:
        print("Successfully created the directory %s " % NGINX_SSL_PRIVATE_DIR)

path_to_cert = NGINX_SSL_CERT_DIR + "/nginx-selfsigned.crt"
path_to_key = NGINX_SSL_PRIVATE_DIR + "/nginx-selfsigned.key"
server_fqdn = "test-api.open5e.com"
# Generate our Key
key = rsa.generate_private_key(
    public_exponent=65537,
    key_size=2048,
    backend=default_backend()
)

# Write our key to disk for safe keeping

with open(path_to_key, "wb") as f:
    f.write(key.private_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PrivateFormat.PKCS8,
        encryption_algorithm=serialization.NoEncryption(),
    ))

# Various details about who we are. For a self-signed certificate the
# subject and issuer are always the same.
subject = issuer = x509.Name([
    x509.NameAttribute(NameOID.COUNTRY_NAME, "US"),
    x509.NameAttribute(NameOID.STATE_OR_PROVINCE_NAME, "MA"),
    x509.NameAttribute(NameOID.LOCALITY_NAME, "Boston"),
    x509.NameAttribute(NameOID.ORGANIZATION_NAME, "open5e"),
    x509.NameAttribute(NameOID.COMMON_NAME, server_fqdn),
])
cert = x509.CertificateBuilder().subject_name(
    subject
).issuer_name(
    issuer
).public_key(
    key.public_key()
).serial_number(
    x509.random_serial_number()
).not_valid_before(
    datetime.datetime.utcnow()
).not_valid_after(
    # Our certificate will be valid for 10 days
    datetime.datetime.utcnow() + datetime.timedelta(days=10)
).add_extension(
    x509.SubjectAlternativeName([x509.DNSName(u"localhost")]),
    critical=False,
    # Sign our certificate with our private key
).sign(key, hashes.SHA256(), default_backend())
# Write our certificate out to disk.
with open(path_to_cert, "wb") as f:
    f.write(cert.public_bytes(serialization.Encoding.PEM))
