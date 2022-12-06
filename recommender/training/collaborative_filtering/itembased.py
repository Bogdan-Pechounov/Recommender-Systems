import pickle
from utils import Holder, print_progress
import numpy as np
from sortedcontainers import SortedList
import multiprocessing as mp

# settings
min_common_users = 5
max_neighbors = None
split = 0.8


def train_movie(movie, data: Holder):
    users = data.movie2user[movie]
    ratings = {user: data.ratings[(user, movie)] for user in users}
    avg = np.mean(list(ratings.values()))
    dev = {user: (rating - avg)
           for user, rating in ratings.items()}
    dev_values = np.array(list(dev.values()))
    sigma = np.sqrt(dev_values.dot(dev_values))

    # find related movies
    sl = SortedList()
    for movie2, users2 in data.movie2user.items():
        if movie != movie2:
            common_users = set(users) & set(users2)
            if len(common_users) > min_common_users:
                ratings2 = {user: data.ratings[(user, movie2)]
                            for user in users2}
                avg2 = np.mean(list(ratings2.values()))
                dev2 = {user: (rating - avg2)
                        for user, rating in ratings2.items()}
                dev2_values = np.array(list(dev2))
                sigma2 = np.sqrt(dev2_values.dot(dev2_values))

                print(type(sum(dev[user]*dev2[user] for user in common_users)))

                w = sum(dev[user]*dev2[user] for user in common_users)
                print(dev)
                w = w / (sigma * sigma2)
                sl.add((-w, movie2))
                if max_neighbors is not None and len(sl) > max_neighbors:
                    del sl[-1]
                break

    return movie, avg, dev, sl


def predict(movie, user):
    numerator = 0
    denominator = 0
    for neg_w, movie2 in neighbors[movie]:
        try:
            numerator += -neg_w * deviations[movie2][user]
            denominator += abs(neg_w)
        except KeyError:
            pass
    if denominator == 0:
        prediction = averages[movie]
    else:
        prediction = numerator / denominator + averages[movie]
    return prediction


def mse(p, t):
    return np.mean((np.array(p) - np.array(t))**2)


def result_callback(result):
    global count
    movie, avg, dev, sl = result
    averages[movie] = avg
    deviations[movie] = dev
    neighbors[movie] = sl
    count += 1
    print_progress('Training ', count, len(train.movie2user))


if __name__ == '__main__':
    # load data
    with open('preprocessed/holder.pickle', 'rb') as f:
        data: Holder = pickle.load(f)

    data.print_summary()
    train, test = data.split(split)
    train.print_summary()
    test.print_summary()

    # train
    neighbors = {}
    averages = {}
    deviations = {}

    count = 0
    train_movie(2508, data)
    # run in parallel
    # pool = mp.Pool()
    # for movie in train.movie2user:
    #     pool.apply_async(train_movie, args=(
    #         movie, train), callback=result_callback)

    # pool.close()
    # pool.join()

    # # predictions
    # train_predictions = []
    # train_targets = []
    # for (user, movie), target in train.ratings.items():
    #     prediction = predict(movie, user)
    #     train_predictions.append(prediction)
    #     train_targets.append(target)
    # test_predictions = []
    # test_targets = []
    # for (u, m), target in test.ratings.items():
    #     prediction = predict(movie, user)
    #     test_predictions.append(prediction)
    #     test_targets.append(target)

    # print('train mse:', mse(train_predictions, train_targets))
    # print('test mse:', mse(test_predictions, test_targets))
