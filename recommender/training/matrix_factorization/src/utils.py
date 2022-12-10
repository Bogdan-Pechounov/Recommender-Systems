import time

class Checkpoint:
    def __init__(self):
        self.start = time.time()

    def print(self, msg):
        elapsed = time.time() - self.start
        print(elapsed)
        print(msg)
        self.start = time.time()
        

def print_summary(df):
    print(f'{len(df)} ratings | {len(set(df.userId.values))} users | {len(set(df.movieId.values))} movies')