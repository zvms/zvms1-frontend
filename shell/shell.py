def _print(s):
    if s:
        print(s)
        print()

class App:
    def __init__(self, name, doc = '', **config):
        self.name = name
        self.__doc__ = doc
        self.__routes = []
        self.__children = []
        self.config = {'prompt': '> ', 'help': ('help', ), 'exit': ('exit', )}
        self.config.update(config)

    def route(self, rule):
        def deco(view):
            self.__routes.append((Rule(rule), view))
            return view
        return deco

    def register(self, child):
        self.__children.append(child)

    def help(self, args):
        def help_route():
            for rule, view in self.__routes:
                rule.help()
                _print(view.__doc__)
        if not args:
            _print(self.__doc__)
            help_route()
            for child in self.__children:
                child.help(())
        else:
            for child in self.__children:
                if args[0] == '-i':
                    print(child.name)
                elif args[0] == child.name:
                    child.help(args[1:])

    def run(self, cmd):
        for rule, view in self.__routes:
            r = rule.interpret(cmd)
            if r:
                view(*r[0], **r[1])
                return True
        for child in self.__children:
            if child.run(cmd):
                return True
        return False

    def run_shell(self, **config):
        config |= self.config
        App.config = config
        _print(config.get('title'))
        while True:
            cmd = split(input(config['prompt']))
            if not cmd:
                continue
            if cmd[0] in config['exit']:
                return
            if cmd[0] in config['help']:
                self.help(cmd[1:])
            else:
                if not self.run(cmd):
                    print('未找到命令')

class Ident:
    def __init__(self, name):
        self.name = name
    def match(self, cmd):
        return cmd == self.name

class Param:
    def __init__(self, name, master):
        self.name = name
        self.__master = master

    def match(self, cmd):
        if 'int:' in self.name:
            try:
                self.__master.args.append(int(cmd))
                return True
            except ValueError:
                return False
        self.__master.args.append(cmd)
        return True

class Option:
    def __init__(self, name, master):
        self.name = name
        self.__master = master
        self.anno = ''
        self.args = []
        self.__params = []

    def match(self, cmd_iter):
        self.args.clear()
        param_iter = iter(self.__params)
        while True:
            try:
                p = next(param_iter)
            except StopIteration:
                self.__master.kwargs[self.name[1:]] = self.args.copy()
                return True
            try:
                if not p.match(next(cmd_iter)):
                    return False
            except StopAsyncIteration:
                return False

    def add_param(self, param):
        self.__params.append(Param(param, self))

    def help(self):
        print(self.name, end=' ')
        for param in self.__params:
            print(param.name, end=' ')
        if self.anno:
            print(':', self.anno)
        print()

class Rule:
    def __init__(self, rule):
        self.args = []
        self.kwargs = {}
        self.__elems = []
        self.__options = {}
        option = ''
        for s in split(rule):
            if s[0] == '-':
                self.__options[s] = Option(s, self)
                option = s
            elif option:
                if option[-1] == ':' and not self.__options[option].anno:
                    self.__options[option].anno = s
                elif s[0] == '<' and s[-1] == '>':
                    self.__options[option].add_param(s)
                else:
                    option = ''
                    self.__elems.append(Ident(s))
            elif s[0] == '<' and s[-1] == '>':
                self.__elems.append(Param(s, self))
            else:
                self.__elems.append(Ident(s))

    def help(self):
        for elem in self.__elems:
            print(elem.name, end=' ')
        print('\n可选的参数')
        for option in self.__options.values():
            option.help()
        print()

    def interpret(self, cmd):
        self.args.clear()
        self.kwargs.clear()
        elem_iter = iter(self.__elems)
        cmd_iter = iter(cmd)
        while True:
            try:
                c = next(cmd_iter)
            except StopIteration:
                try:
                    next(elem_iter)
                    return None
                except StopIteration:
                    return self.args.copy(), self.kwargs.copy()
            if c in self.__options:
                if not self.__options[c].match(cmd_iter):
                    return None
                continue
            try:
                if not next(elem_iter).match(c):
                    return None
            except StopIteration:
                return None

def split(raw: str):
    literal = False
    s = ''
    ret = []
    def append():
        nonlocal s
        ret.append(s[1:-1] if s[0] == '|' and s[-1] == '|' else s)
        s = ''
    for c in raw:
        if c == '|':
            literal = not literal
        if c.isspace() and not literal:
            if s:
                append()
            s = ''
        else:
            s += c
    if s:
        append()
    return ret