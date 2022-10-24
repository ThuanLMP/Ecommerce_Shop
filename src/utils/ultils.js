export const b64EncodeUnicode = (str) =>
    window.btoa(
        encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) =>
            String.fromCharCode(parseInt(p1, 16))
        )
    );



// Decoding base64 ⇢ UTF8

export const b64DecodeUnicode = (str) =>
    decodeURIComponent(
        Array.prototype.map
            .call(
                window.atob(str),
                (c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`
            )
            .join("")
    );

export const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;