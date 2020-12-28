exports.getCookies = (req, name) => {
  var Cookies = {};
  if (req.headers.cookie != null) {
    req.headers.cookie.split(';').forEach(l => {
      var parts = l.split('=');
      Cookies[parts[0].trim()] = (parts[1] || '').trim();
    });
  }
  return Cookies[name];
}