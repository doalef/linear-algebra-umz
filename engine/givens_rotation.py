
from math import hypot
import numpy as np
import json
import sys

def givens_rotation(A):
    """Perform QR decomposition of matrix A using Givens rotation."""
    (num_rows, num_cols) = np.shape(A)

    # Initialize orthogonal matrix Q and upper triangular matrix R.
    Q = np.identity(num_rows)
    R = np.copy(A)

    # Iterate over lower triangular matrix.
    (rows, cols) = np.tril_indices(num_rows, -1, num_cols)
    for (row, col) in zip(rows, cols):

        # Compute Givens rotation matrix and
        # zero-out lower triangular matrix entries.
        if R[row, col] != 0:
            (c, s) = _givens_rotation_matrix_entries(R[col, col], R[row, col])

            G = np.identity(num_rows)
            G[[col, row], [col, row]] = c
            G[row, col] = s
            G[col, row] = -s

            R = np.dot(G, R)
            Q = np.dot(Q, G.T)

    return (Q, R)


def _givens_rotation_matrix_entries(a, b):
    """Compute matrix entries for Givens rotation."""
    r = hypot(a, b)
    c = a/r
    s = -b/r

    return (c, s)

n = int(sys.argv[1])
A = np.random.rand(n, n);
Q,R = givens_rotation(A)
result = {
    "A": A.tolist(),
    "R": R.tolist(),
    "Q": Q.tolist()
}
# print(result)
print(json.dumps(result))
sys.stdout.flush()