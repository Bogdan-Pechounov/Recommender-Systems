from flask import Flask
from flask_cors import CORS
from model import Model
import os

app = Flask(__name__)

model = Model('model-10-20-0.537.hdf5')
cors = CORS(app, resources={r"*": {"origins": "http://localhost:3000"}})

for i in os.environ.items():
    print(i)


@app.route("/movie/<int:movie_id>")
def movie(movie_id):
    print(movie_id)
    return f'test {movie_id}'


@app.route('/similar/<int:movie_id>')
def similar(movie_id):
    similar_movies = model.similar(movie_id)
    return similar_movies


@app.route('/latent_features/<int:movie_id>')
def latent_features(movie_id):
    return model.embeddings[movie_id].tolist()


@app.route('/bias/<int:movie_id>')
def bias(movie_id):
    return str(model.bias(movie_id))
