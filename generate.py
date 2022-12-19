import random

import requests


def getRandSequence():
    response = requests.get('http://217.25.88.166:8081/groups').json()
    arr = response["array"]
    levels = random.choice(arr)["levels"].replace("{", "").replace("}", "").split(",")
    level = random.choice(levels)

    response = requests.get('http://217.25.88.166:8081/levels/' + level).json()
    sequences = response["sequences"].replace("{", "").replace("}", "").split(",")
    sequence = random.choice(sequences)

    response = requests.get('http://217.25.88.166:8081/sequences/' + sequence).json()
    return response


getRandSequence()
