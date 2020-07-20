import numpy as np
import math
import json
import sys

A = np.array(json.loads(sys.argv[1]))
b = np.array(json.loads(sys.argv[2]))
x0 = np.zeros(b.shape)
tol = float(sys.argv[4])
max_iter = int(sys.argv[3])
w = 1.5


def SOR(A, b, x0, tol, max_iter, w):
    if (w <= 1 or w > 2):
        print('w should be inside [1, 2)')
        step = -1
        x = float('nan')
        return
    n = b.shape
    x = x0

    for step in range(1, max_iter):
        for i in range(n[0]):
            new_values_sum = np.dot(A[i, :i], x[:i])
            old_values_sum = np.dot(A[i, i+1:], x0[i+1:])
            x[i] = (b[i] - (old_values_sum + new_values_sum)) / A[i, i]
            x[i] = np.dot(x[i], w) + np.dot(x0[i], (1 - w))
        # if (np.linalg.norm(x - x0) < tol):
        if (np.linalg.norm(np.dot(A, x)-b) < tol):
            print(step)
            break
        x0 = x
    return x


x = SOR(A, b, x0, tol, max_iter, w)
print(json.dumps(np.dot(A, x).tolist()))
