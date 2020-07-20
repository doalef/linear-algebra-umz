import numpy as np
import sys
import json


def column_convertor(x):
    """
    Converts 1d array to column vector
    """
    x.shape = (1, x.shape[0])
    return x


def get_norm(x):
    """
    Returns Norm of vector x
    """
    return np.sqrt(np.sum(np.square(x)))


def hh_reflection(v):
    """
    Returns Householder matrix for vector v
    """
    size_of_v = v.shape[1]
    e1 = np.zeros_like(v)
    e1[0, 0] = 1
    vector = get_norm(v) * e1
    if v[0, 0] < 0:
        vector = - vector
    u = (v + vector).astype(np.float32)
    H = np.identity(size_of_v) - ((2 * np.matmul(np.transpose(u), u)
                                   ) / np.matmul(u, np.transpose(u)))
    return H


def qr_decomposition(q, r, iter, n):
    """
    Return Q and R matrices for iter number of iterations.
    """
    v = column_convertor(r[iter:, iter])
    Hbar = hh_reflection(v)
    H = np.identity(n)
    H[iter:, iter:] = Hbar
    r = np.matmul(H, r)
    q = np.matmul(q, H)
    return q, r


# HANDLING THE EXECUTION

n = int(sys.argv[1])
m = int(sys.argv[2])

A = np.random.rand(n, m)
Q = np.identity(n)
R = A.astype(np.float32)
for i in range(min(n, m)):
    # For each i, H matrix is calculated for (i+1)th row
    Q, R = qr_decomposition(Q, R, i, n)
min_dim = min(m, n)
R = np.around(R, decimals=6)
R = R[:min_dim, :min_dim]
Q = np.around(Q, decimals=6)

result = {
    "n": n,
    "m": m,
    "R": R.tolist(),
    "Q": Q.tolist(),
    "A": A.tolist()
}
print(json.dumps(result))
sys.stdout.flush()
