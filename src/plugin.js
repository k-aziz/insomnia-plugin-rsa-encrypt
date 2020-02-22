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

  ],
  async run(context, key, value) {
        console.log(`Encrypting value ${value}`)

        var publicKey = forge.pki.publicKeyFromPem(key);
        var buf = forge.util.createBuffer(value, 'utf8');

        var encrypted = publicKey.encrypt(buf.bytes(), 'RSAES-OAEP');
        var b64 = forge.util.encode64(encrypted);

        console.log(`Base64 encrypted value - ${b64}`)

        return JSON.stringify(b64)
    ;
  },
}];
