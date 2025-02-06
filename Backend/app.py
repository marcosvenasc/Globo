from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://tvglobo:tvglobo123@db:5432/youtube_crud'
db = SQLAlchemy(app)

class URL(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(200), nullable=False)

    def __repr__(self):
        return '<URL %r>' % self.url

@app.route('/urls', methods=['GET'])
def get_urls():
    urls = URL.query.all()
    output = []
    for url in urls:
        url_data = {}
        url_data['id'] = url.id
        url_data['url'] = url.url
        output.append(url_data)
    return jsonify({'urls': output})

@app.route('/urls', methods=['POST'])
def add_url():
    url = request.json['url']
    new_url = URL(url=url)
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

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, host='0.0.0.0')
