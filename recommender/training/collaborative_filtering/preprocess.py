import pandas as pd
import pickle

from utils import Holder, print_progress, map

# paths
data_path = '../../data/small/ratings.csv'
holder_path = 'preprocessed/holder.pickle'

# load
df = pd.read_csv(data_path)


# update dictionaries
holder = Holder()

user_mapping = map(df.userId.values)
movie_mapping = map(df.movieId.values)


def update_dicts(row):
    print_progress('Updating:', row.name, len(df), 10000)
    holder.add_rating(user_mapping[row.userId],
                      movie_mapping[row.movieId], row.rating)


df.apply(update_dicts, axis=1)
holder.print_summary()

# save
with open(holder_path, 'wb') as f:
    pickle.dump(holder, f)
