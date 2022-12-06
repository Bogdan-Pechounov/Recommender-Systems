import random

# utility class to hold dictionaries


class Holder:
    def __init__(self) -> None:
        # user rated which movies
        self.user2movie = {}
        # movie rated by which users
        self.movie2user = {}
        # lookup ratings
        self.ratings = {}

    def add_rating(self, user, movie, rating):
        if user not in self.user2movie:
            self.user2movie[user] = [movie]
        else:
            self.user2movie[user].append(movie)

        if movie not in self.movie2user:
            self.movie2user[movie] = [user]
        else:
            self.movie2user[movie].append(user)

        self.ratings[(user, movie)] = rating

    def print_summary(self):
        print(
            f'users: {len(self.user2movie)} movies: {len(self.movie2user)} ratings: {len(self.ratings)}')

    # Split into train and test set
    def split(self, p):
        train = Holder()
        test = Holder()
        for (user, movie), rating in self.ratings.items():
            if random.random() < p:
                train.add_rating(user, movie, rating)
            else:
                test.add_rating(user, movie, rating)
        return train, test


def print_progress(msg, i, max, step=1):
    if i == max - 1:
        print(f'\r{msg}{round((i+1)/max * 100, 2)}%')
    elif i % step == 0:
        print(f'\r{msg}{round((i+1)/max * 100, 2)}%', end='')


# map to 0..N-1
def map(values):
    mapping = {}
    count = 0
    for value in set(values):
        mapping[value] = count
        count += 1
    return mapping
