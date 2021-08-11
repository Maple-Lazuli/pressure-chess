from scipy import stats
import numpy as np

pieces = {
    '0': {
        'name': 'Space'
    },
    '1': {
        'name': 'Rook',
        'base': -1,
        'value': 5
    },
    '2': {
        'name': 'Knight',
        'base': -1,
        'value': 3
    },
    '3': {
        'name': 'Bishop',
        'base': -1,
        'value': 3
    },
    '4': {
        'name': 'Queen',
        'base': -1,
        'value': 9
    },
    '5': {
        'name': 'King',
        'base': -1,
        'value': 10
    },
    '6': {
        'name': 'Bishop',
        'base': -1,
        'value': 3
    },
    '9': {
        'name': 'BPawn',
        'base': -1,
        'value': 1
    },
    '11': {
        'name': 'Rook',
        'base': 1,
        'value': 5
    },
    '12': {
        'name': 'Knight',
        'base': 1,
        'value': 3
    },
    '13': {
        'name': 'Bishop',
        'base': 1,
        'value': 3
    },
    '14': {
        'name': 'Queen',
        'base': 1,
        'value': 9
    },
    '15': {
        'name': 'King',
        'base': 1,
        'value': 10
    },
    '16': {
        'name': 'Bishop',
        'base': 1,
        'value': 3
    },
    '10': {
        'name': 'WPawn',
        'base': 1,
        'value': 1
    },
}


##Create Helper Functions for visualizations
def printMatrix(arr):
    # translates piece numbers in input string
    string = ""
    for i in range(1, 65):
        string += translation(arr[i - 1]) + ' '
        if (i % 8 == 0):
            print(string)
            string = ""


def translation(intval):
    #mapping for the pieces
    intval = int(intval)
    if intval == 0:
        return '_'
    elif intval == 1:
        return 'r'
    elif intval == 2:
        return 'n'
    elif intval == 3:
        return 'b'
    elif intval ==4:
        return 'q'
    elif intval == 5:
        return 'k'
    elif intval == 6:
        return 'b'
    elif intval == 9:
        return 'p'
    elif intval == 10:
        return 'P'
    elif intval == 11:
        return 'R'
    elif intval == 12:
        return 'N'
    elif intval == 13:
        return 'B'
    elif intval == 14:
        return 'Q'
    elif intval == 15:
        return 'K'
    elif intval == 16:
        return 'B'


def rook(index, weight=1, currentBoard=np.zeros((8, 8), dtype=np.float)):
    baseline = np.zeros((8, 8), dtype=np.float)
    y = index[0]
    x = index[1]
    # left row
    for i in range(x - 1, -1, -1):
        baseline[y, i] = weight
        if currentBoard[y, i] != 0:
            break
    # right row
    for i in range(x + 1, 8):
        baseline[y, i] = weight
        if currentBoard[y, i] != 0:
            break
    # top column
    for i in range(y - 1, -1, -1):
        baseline[i, x] = weight
        if currentBoard[i, x] != 0:
            break
    # bottom column
    for i in range(y + 1, 8):
        baseline[i, x] = weight
        if currentBoard[i, x] != 0:
            break
    baseline[y, x] = 0
    return baseline


def bishop(index, weight=1, currentBoard=np.zeros((8, 8), dtype=np.float)):
    baseline = np.zeros((8, 8), dtype=np.float)
    y = index[0]
    x = index[1]
    # upper left
    for i in range(0, 8):
        try:
            x1 = x - i
            y1 = y - i
            if (x1 == x) and (y1 == y):
                continue
            if (x1 >= 0) and (y1 >= 0):
                baseline[y1, x1] = weight
                # print(baseline)
                if currentBoard[y1, x1] != 0:
                    break
        except:
            pass
    # lower left
    for i in range(0, 8):
        try:
            x1 = x - i
            y1 = y + i
            if (x1 == x) and (y1 == y):
                continue
            if (x1 >= 0) and (y1 >= 0):
                baseline[y1, x1] = weight
                # print(baseline)
                if currentBoard[y1, x1] != 0:
                    break
        except:
            pass
    # lower right
    for i in range(0, 8):
        try:
            x1 = x + i
            y1 = y + i
            if (x1 == x) and (y1 == y):
                continue
            if (x1 >= 0) and (y1 >= 0):
                baseline[y1, x1] = weight
                # print(baseline)
                if currentBoard[y1, x1] != 0:
                    break
        except:
            pass
    # upper right
    for i in range(0, 8):
        try:
            x1 = x + i
            y1 = y - i
            if (x1 == x) and (y1 == y):
                continue
            if (x1 >= 0) and (y1 >= 0):
                baseline[y1, x1] = weight
                # print(baseline)
                if currentBoard[y1, x1] != 0:
                    break
        except:
            pass
    baseline[y, x] = 0
    return baseline


def queen(index, weight=1, currentBoard=np.zeros((8, 8), dtype=np.float)):
    baseline = bishop(index, weight, currentBoard)
    baseline += rook(index, weight, currentBoard)
    return baseline


def king(index, weight=1):
    baseline = np.zeros((8, 8), dtype=np.float)
    y = index[0]
    x = index[1]
    try:
        x1 = x + 1
        y1 = y
        if (x1 >= 0) and (y1 >= 0):
            baseline[y1, x1] = weight
    except:
        pass
    try:
        x1 = x + 1
        y1 = y + 1
        if (x1 >= 0) and (y1 >= 0):
            baseline[y1, x1] = weight
    except:
        pass
    try:
        x1 = x
        y1 = y + 1
        if (x1 >= 0) and (y1 >= 0):
            baseline[y1, x1] = weight
    except:
        pass
    try:
        x1 = x + 1
        y1 = y + 1
        if (x1 >= 0) and (y1 >= 0):
            baseline[y1, x1] = weight
    except:
        pass
    try:
        x1 = x - 1
        y1 = y - 1
        if (x1 >= 0) and (y1 >= 0):
            baseline[y1, x1] = weight
    except:
        pass
    try:
        x1 = x
        y1 = y - 1
        if (x1 >= 0) and (y1 >= 0):
            baseline[y1, x1] = weight
    except:
        pass
    try:
        x1 = x - 1
        y1 = y
        if (x1 >= 0) and (y1 >= 0):
            baseline[y1, x1] = weight
    except:
        pass
    try:
        x1 = x - 1
        y1 = y + 1
        if (x1 >= 0) and (y1 >= 0):
            baseline[y1, x1] = weight
    except:
        pass
    try:
        x1 = x + 1
        y1 = y - 1
        if (x1 >= 0) and (y1 >= 0):
            baseline[y1, x1] = weight
    except:
        pass
    baseline[y, x] = 0
    return baseline


def pawn(index, weight=1, color='WPawn'):
    baseline = np.zeros((8, 8), dtype=np.float)
    x = index[0]
    y = index[1]
    if color == "WPawn":
        try:
            x1 = x - 1
            y1 = y + 1
            if (x1 >= 0) and (y1 >= 0):
                baseline[x1, y1] = weight
        except:
            pass
        try:
            x1 = x - 1
            y1 = y - 1
            if (x1 >= 0) and (y1 >= 0):
                baseline[x1, y1] = weight
        except:
            pass
    else:
        try:
            x1 = x + 1
            y1 = y - 1
            if (x1 >= 0) and (y1 >= 0):
                baseline[x1, y1] = weight
        except:
            pass
        try:
            x1 = x + 1
            y1 = y + 1
            if (x1 >= 0) and (y1 >= 0):
                baseline[x1, y1] = weight
        except:
            pass
    baseline[y, x] = 0
    return baseline


def knight(index, weight=1):
    baseline = np.zeros((8, 8), dtype=np.float)
    y = index[0]
    x = index[1]
    try:
        # bottom right
        x1 = x + 1
        y1 = y + 2
        if (x1 >= 0) and (y1 >= 0):
            baseline[y1, x1] = weight
    except:
        pass
    try:
        # bottom left
        x1 = x - 1
        y1 = y + 2
        if (x1 >= 0) and (y1 >= 0):
            baseline[y1, x1] = weight
    except:
        pass

    try:
        # upper right
        x1 = x + 1
        y1 = y - 2
        if (x1 >= 0) and (y1 >= 0):
            baseline[y1, x1] = weight
    except:
        pass
    try:
        # upper left
        x1 = x - 1
        y1 = y - 2
        if (x1 >= 0) and (y1 >= 0):
            baseline[y1, x1] = weight
    except:
        pass
    # right top
    try:
        x1 = x + 2
        y1 = y - 1
        if (x1 >= 0) and (y1 >= 0):
            baseline[y1, x1] = weight
    except:
        pass
    # right bottom
    try:
        x1 = x + 2
        y1 = y + 1
        if (x1 >= 0) and (y1 >= 0):
            baseline[y1, x1] = weight
    except:
        pass

    # left top
    try:
        x1 = x - 2
        y1 = y - 1
        if (x1 >= 0) and (y1 >= 0):
            baseline[y1, x1] = weight
    except:
        pass
    # left bottom
    try:
        x1 = x - 2
        y1 = y + 1
        if (x1 >= 0) and (y1 >= 0):
            baseline[y1, x1] = weight
    except:
        pass
    baseline[y, x] = 0
    return baseline


def boardEval(currentBoard=np.zeros((8, 8), dtype=np.float)):
    baseResult = np.zeros((8, 8), dtype=np.float)
    valuedResult = np.zeros((8, 8), dtype=np.float)

    for i in range(0, 8):
        for j in range(0, 8):
            index = (i, j)
            piece = str(currentBoard[i, j])
            if piece == '0':
                continue
            name = pieces[piece]['name']
            base = pieces[piece]['base']
            value = 1 / (pieces[piece]['value'] * base)
            if piece in ['1', '11']:
                baseResult += rook(index, weight=base, currentBoard=currentBoard)
                valuedResult += rook(index, weight=value, currentBoard=currentBoard)
            elif piece in ['2', '12']:
                baseResult += knight(index, weight=base)
                valuedResult += knight(index, weight=value)
            elif piece in ['3', '6', '13', '16']:
                baseResult += bishop(index, weight=base, currentBoard=currentBoard)
                valuedResult += bishop(index, weight=value, currentBoard=currentBoard)
            elif piece in ['4', '14']:
                baseResult += queen(index, weight=base, currentBoard=currentBoard)
                valuedResult += queen(index, weight=value, currentBoard=currentBoard)
            elif piece in ['5', '15']:
                baseResult += king(index, weight=base)
                valuedResult += king(index, weight=value)
            elif piece in ['9', '10']:
                baseResult += pawn(index, weight=base, color=name)
                valuedResult += pawn(index, weight=value, color=name)
    return (baseResult, valuedResult)


def calculateRelativeColorPercentiles(board):
    color = np.zeros((8, 8), dtype=np.float)
    boardVals = board.reshape(1, 64)
    boardVals = np.abs(boardVals)
    boardVals = boardVals[boardVals != 0]
    for r in range(0, 8):
        for c in range(0, 8):
            boardVal = board[r, c]
            if boardVal == 0:
                continue
            else:
                color[r, c] = stats.percentileofscore(boardVals, abs(boardVal)) / 100

    return color


def calculateIndividualColorPercentiles(board):
    color = np.zeros((8, 8), dtype=np.float)
    boardVals = board.reshape(1, 64)
    blackVals = np.abs(boardVals[boardVals < 0])
    whiteVals = np.abs(boardVals[boardVals > 0])
    for r in range(0, 8):
        for c in range(0, 8):
            boardVal = board[r, c]
            if boardVal == 0:
                continue
            elif boardVal < 0:
                color[r, c] = stats.percentileofscore(blackVals, abs(boardVal)) / 100
            elif boardVal > 0:
                color[r, c] = stats.percentileofscore(whiteVals, abs(boardVal)) / 100
    return color