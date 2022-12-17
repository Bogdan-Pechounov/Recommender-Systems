from operator import le
from keras.models import load_model
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

# TODO sort by latent features


class Model:
    def __init__(self, model_path):
        self.model = load_model(model_path)
        self.avg_rating = 0  # TODO
        # movie embeddings/feature vectors
        self.embeddings = self.model.layers[3].get_weights()[0]

    def similariy(self, i, j):
        return cosine_similarity([self.embeddings[i]], [self.embeddings[j]])[0][0]

    def similar(self, movie, reverse=True):
        similarities = cosine_similarity(
            [self.embeddings[movie]], self.embeddings)[0].tolist()
        return sorted([(i, v) for i, v in enumerate(similarities) if i != movie], key=lambda x: x[1], reverse=reverse)

    def bias(self, movie):
        return self.model.layers[6].get_weights()[0][movie][0]

    def sortByColumn(self, column):
        features = self.embeddings.tolist()
        return sorted([(i, f) for i, f in enumerate(features)], key=lambda x: x[1][column], reverse=True)
