from flask import Flask, request
from flask_cors import CORS
from model import Model
import os

app = Flask(__name__)

# load model
model = Model('model-10-20-0.537.hdf5')

# cors
try:
    origin = os.environ['ORIGIN']
except:
    origin = "http://localhost:3000"
print(origin)
print(type(origin))
cors = CORS(app, resources={r"*": {"origins": origin}})


@app.route('/')
def hello():
    return 'Hello there!'


# movie routes
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


# sort
@app.route('/sort/<int:latent_feature>')
def sortByLatentFeature(latent_feature):
    page = request.args.get("page", default=1, type=int)
    limit = request.args.get("limit", default=10, type=int)
    start = (page - 1) * limit
    end = start + limit
    return model.sortByColumn(latent_feature)[start:end]

# info


@app.route('/info')
def info():
    return {'numMovies': len(model.embeddings)}
