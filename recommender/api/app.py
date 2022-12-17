from flask import Flask, request
from flask_cors import CORS
from model import Model
import json
import os

app = Flask(__name__)

# load models
models = [Model(f'models/{name}.hdf5')
          for name in ['model-5-20-0.591', 'model-10-20-0.537', 'model-20-20-0.478']]

# cors
try:
    origin = os.environ['ORIGIN']
except:
    origin = "http://localhost:3000"
cors = CORS(app, resources={r"*": {"origins": origin}})


@app.route('/')
def hello():
    return 'Hello there!'


# movie routes
@app.route('/similar/<int:movie_id>')
def similar(movie_id):
    model = models[request.args.get('model', default=1, type=int)]
    similar_movies = model.similar(movie_id)
    return similar_movies


@app.route('/latent_features/<int:movie_id>')
def latent_features(movie_id):
    model = models[request.args.get('model', default=1, type=int)]
    return model.embeddings[movie_id].tolist()


@app.route('/bias/<int:movie_id>')
def bias(movie_id):
    model = models[request.args.get('model', default=1, type=int)]
    return str(model.bias(movie_id))


# sort
@app.route('/sort/<int:latent_feature>')
def sortByLatentFeature(latent_feature):
    model = models[request.args.get('model', default=1, type=int)]
    page = request.args.get("page", default=1, type=int)
    limit = request.args.get("limit", default=10, type=int)
    start = (page - 1) * limit
    end = start + limit
    return model.sortByColumn(latent_feature)[start:end]


# info
@app.route('/info')
def info():
    model = models[request.args.get('model', default=1, type=int)]
    return {'numMovies': len(model.embeddings)}


@app.route('/info/genres')
def genres_info():
    model = request.args.get('model', default=1, type=int)
    with open(f'info/genres-{model}.json') as f:
        genres = json.load(f)
    return genres


@app.route('/info/features')
def features_info():
    model = request.args.get('model', default=1, type=int)
    with open(f'info/features-{model}.json') as f:
        genres = json.load(f)
    return genres
