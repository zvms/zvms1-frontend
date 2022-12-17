import sys

from zvms import app, db, migrate
from zvms.util import debug_mode

if __name__ == '__main__':
    port = 5000
    for i in sys.argv[1:]:
        if i == 'debug':
            debug_mode(True)
        else:
            try:
                port = int(i)
            except ValueError:
                pass
    app.run(host='0.0.0.0', port=port)