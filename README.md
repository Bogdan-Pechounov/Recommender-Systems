Visualizing Matrix Factorization on the [MovieLens dataset](https://grouplens.org/datasets/movielens/latest/).

[Demo](https://movie-recommender-app.onrender.com/) deployed on [Render](https://render.com/) and [MongoDB Atlas](https://www.mongodb.com/atlas/database). (It takes at least a minute for the apis to start up)

|        Home Page         |        Movie Page         |
| :----------------------: | :-----------------------: |
| ![](screenshot_home.png) | ![](screenshot_movie.png) |

I wanted to see how the bias correlates with average rating, how the latent features map to the 20 genres in the dataset and whether the calculated similarity between movies made sense.

## References

[TMDB](https://developers.themoviedb.org/3/) for movie details such as image paths

UI inspired by [Tuat Tran Anh](https://www.youtube.com/watch?v=ntYXj9W1Ez8)

[Recommender Systems and Deep Learning in Python](https://www.udemy.com/course/recommender-systems/)

[Logo](https://icon-icons.com/icon/Clip-film-movie-multimedia-play-short-video/81330)

## Notes

Similiratity between movies is calculated using cosine similarity on the feature vectors of the movies.

The scripts used to precompute fields such as trending score and best score can be found in recommender/\_prepopulate. "\_edited.csv" indicates that there are additional rows mapping the user and movie ids to the ids used by the model. These files can be produced with "preprocess.py" on the original MovieLens data.
