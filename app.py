rom flask import Flask

app = Flask(name)

@app.route('/')

def hello_world():
  
  return 'tharumin'

if name == "main":
  
  app.run()
