resource_manifest_version "44febabe-d386-4d18-afbe-5e627f4af937"

client_script {
  '@vrp/lib/utils.lua',
  'function/client.lua',
}

server_script {
  '@vrp/lib/utils.lua',
  'function/server.lua'
}


ui_page "function/html/index.html"

files {
    'function/html/index.html',
    'function/html/*',
    'function/html/**',
    'function/html/index.js',
    'function/html/index.css',
    'function/html/reset.css'
}


