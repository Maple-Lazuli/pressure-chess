from flask import Flask, request, Response
from flask_cors import CORS
import pandas as pd
import chess as chess
from scipy import stats
import numpy as np
import json

app = Flask(__name__)
CORS(app)
app.config["DEBUG"] = True


@app.route("/", methods=["GET"])
def root():
    # get positions from the web app
    message = request.args.get('positions')
    message = message.split(',')
    for i in range(len(message)):
        message[i] = int(message[i])
    positions = np.array(message).reshape((8, 8))
    print(positions)
    base, val = chess.boardEval(positions)
    return_json = {
        "base_relative": chess.calculateRelativeColorPercentiles(base).reshape((1, 64)).tolist(),
        "base_individual": chess.calculateIndividualColorPercentiles(base).reshape((1, 64)).tolist(),
        "val_relative": chess.calculateRelativeColorPercentiles(val).reshape((1, 64)).tolist(),
        "val_individual": chess.calculateIndividualColorPercentiles(val).reshape((1, 64)).tolist(),
        "base": base.reshape((1, 64)).tolist(),
        "val": val.reshape((1, 64)).tolist(),

    }

    return Response(json.dumps(return_json), status=200, mimetype='application/json')


def main():
    app.run(host='0.0.0.0', port=3001)


if __name__ == "__main__":
    main()
