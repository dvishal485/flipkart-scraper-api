/* Copyright 2023 Vishal Das

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
*/

const header = (req_headers) => {
    return {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Max-Age": "86400",
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Your-IP": req_headers.get("cf-connecting-ip"),
        "Your-Country": req_headers.get("CF-IPCountry"),
        "Host": req_headers.get("host"),
        "Made-By": atob('VmlzaGFsIERhcyBodHRwczovL2dpdGh1Yi5jb20vZHZpc2hhbDQ4NQ==')
    }
}

export default header
