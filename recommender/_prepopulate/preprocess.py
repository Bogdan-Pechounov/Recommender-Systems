import pandas as pd

# make sure the database and the model use the same ids

# preprocess
df = pd.read_csv('data/full/ratings.csv')

# make user id go from 0 to N-1
df.userId = df.userId - 1

# make movie id go from 0 to M-1
movie2idx = {}
count = 0
movie_ids = set(df.movieId.values)
print(len(movie_ids))
for movie_id in movie_ids:
    movie2idx[movie_id] = count
    count += 1

df['movie_idx'] = df.movieId.map(movie2idx)

df.to_csv('data/full/ratings_edited.csv', index=False)

# repeat
print('links')
df = pd.read_csv('data/full/links.csv')
print(len(set(df.movieId.values)))
df['movie_idx'] = df.movieId.map(movie2idx)
print(len(set(df.movie_idx.values)))
df.to_csv('data/full/links_edited.csv', index=False)
