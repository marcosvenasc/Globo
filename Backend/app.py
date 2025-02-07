from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import requests

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://tvglobo:tvglobo123@db:5432/youtube_crud'
db = SQLAlchemy(app)

class URL(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(200), nullable=False)
    title = db.Column(db.String(200), nullable=False)

    def __repr__(self):
        return '<URL %r>' % self.url

class APIKey(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    key = db.Column(db.String(200), nullable=False)

    def __repr__(self):
        return '<APIKey %r>' % self.key

@app.route('/urls', methods=['GET'])
def get_urls():
    urls = URL.query.all()
    output = []
    for url in urls:
        url_data = {}
        url_data['id'] = url.id
        url_data['url'] = url.url
        url_data['title'] = url.title
        output.append(url_data)
    return jsonify({'urls': output})

@app.route('/urls', methods=['POST'])
def add_url():
    url = request.json['url']
    video_id = url.split('v=')[-1]
    title = fetch_video_title(video_id)
    new_url = URL(url=url, title=title)
    db.session.add(new_url)
    db.session.commit()
    return jsonify({'message': 'URL added!'})

@app.route('/urls/<int:id>', methods=['DELETE'])
def delete_url(id):
    url = URL.query.get(id)
    if url:
        db.session.delete(url)
        db.session.commit()
        return jsonify({'message': 'URL deleted!'})
    return jsonify({'message': 'URL not found!'})

@app.route('/apikey', methods=['POST'])
def add_apikey():
    key = request.json['key']
    existing_key = APIKey.query.first()
    if existing_key:
        existing_key.key = key
    else:
        new_key = APIKey(key=key)
        db.session.add(new_key)
    db.session.commit()
    return jsonify({'message': 'API key added or updated!'})

@app.route('/apikey', methods=['GET'])
def get_apikey():
    key = APIKey.query.first()
    if key:
        return jsonify({'key': key.key})
    return jsonify({'key': None})

def fetch_video_title(video_id):
    key = APIKey.query.first().key 
    response = requests.get(f'https://www.googleapis.com/youtube/v3/videos?id={video_id}&key={key}&part=snippet')
    return response.json()['items'][0]['snippet']['title']

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        
        existing_key = APIKey.query.first()
        if not existing_key:
            new_key = APIKey(key='AIzaSyBPAdLXU5as0RhbAmKxhzOIsfpAHvCcSDE')
            db.session.add(new_key)
            db.session.commit()

    app.run(debug=True, host='0.0.0.0')
