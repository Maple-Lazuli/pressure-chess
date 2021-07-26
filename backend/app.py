from flask import Flask, request
from flask_cors import CORS
import pandas as pd
import numpy as np

app = Flask(__name__)
CORS(app)
app.config["DEBUG"] = True


@app.route("/", methods=["GET"])
def root():
    message = request.args.get('positions')
    message = message.split(',')
    for i in range(len(message)):
        message[i] = int(message[i])
    positions = np.array(message)
    np.save('positions', positions)
    print("hadd a messaage")
    print(message)
    return "Thank you"


def main():
    app.run(host='0.0.0.0', port=3001)


if __name__ == "__main__":
    main()