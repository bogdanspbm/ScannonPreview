import requests

file = open('tasks.csv', "r")
lines = file.readlines()

sequences = []
sequencesArr = []

for line in lines:
    arr = line.replace("\n", "").replace("п»ї","").split(";")

    if len(arr) == 2:
        if arr[1] == "new":
            sequences.append({"id": -1, "sequence": sequencesArr})
            sequencesArr = []

        type = arr[1].replace("new", "")
        if type == "":
            scoreForHit = -50
            scoreForNotHit = 30
            typeArr = []
        else:
            scoreForHit = 30
            scoreForNotHit = -50
            typeArr = [type]

        sequence = {"unicode": arr[0], "types": typeArr, "scoreForHit": scoreForHit, "scoreForSkip": scoreForNotHit}
        sequencesArr.append(sequence)

sequences.pop(0)
for seq in sequences:
    body = str(seq).replace("'", '"')
    print(body)
    response = requests.post('http://217.25.88.166:8081/sequence', data=body)
    print(response)

