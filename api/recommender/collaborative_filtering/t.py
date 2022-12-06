import multiprocessing as mp


def f(obj):
    print(obj, mp.current_process())
    # obj['count'] += 1


if __name__ == '__main__':
    pool = mp.Pool(mp.cpu_count())
    obj = {'count': 0}
    print(obj)
    # obj['count'] += 1
    # print(type(obj['count']))
    pool.starmap(f, [(obj) for i in range(10)])
    print(obj)
