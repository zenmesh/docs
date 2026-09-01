window.onload = function() {
  window.ui = SwaggerUIBundle({
    url: "/docs/api/openapi.yaml",
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout",
    persistAuthorization: false,
    tryItOutEnabled: false
  });
};
