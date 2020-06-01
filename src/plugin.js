var forge = require('node-forge');

module.exports.templateTags = [{
    name: 'RsaEncrypt',
    displayName: 'RSA encrypt',
    description: 'Encrypt value with RSA OAEP',
    args: [
        {
            displayName: 'Public RSA key',
            type: 'string',
            defaultValue: '',
        },
        {
            displayName: 'Value',
            type: 'string',
            defaultValue: '',
        },
        {
            displayName: 'Function',
            type: 'enum',
            options: [
                {
                    displayName: 'Encrypt',
                    value: 'ENCRYPT'
                },
                {
                    displayName: 'Decrypt',
                    value: 'DECRYPT'
                }

            ]
        }

    ],
    async run(context, key, value, fn) {
        var val;
        if (fn === "ENCRYPT") {
            console.log(`Encrypting value ${value}`);

            var publicKey = forge.pki.publicKeyFromPem(key);
            var buf = forge.util.createBuffer(value, 'utf8');

            var encrypted = publicKey.encrypt(buf.bytes(), 'RSAES-OAEP');
            var b64 = forge.util.encode64(encrypted);

            console.log(`Base64 encrypted value - ${b64}`);
            val = String(b64);
        } else if (fn === "DECRYPT") {
            var raw_val = forge.util.decode64(value);
            var privateKey = forge.pki.privateKeyFromPem(key);
            var decrypted = privateKey.decrypt(raw_val, 'RSA-OAEP');

            val = decrypted;
        }
        return String(val);
    },
}]
