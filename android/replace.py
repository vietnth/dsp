import sys
import os
replace = sys.argv[1]
replacement = sys.argv[2]

for dname, dirs, files in os.walk("./"):
    for fname in files:
        fpath = os.path.join(dname, fname)
        with open(fpath) as f:
            s = f.read()
        s = s.replace(replace, replacement)
        with open(fpath, "w") as f:
            f.write(s)
