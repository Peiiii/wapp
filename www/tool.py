import os, time


def initTools():
    pass
def makeAppFiles(app_name,nick_name):
    app_path='templates/app/'+app_name
    h=app_path+'/'+app_name+'.html'
    j=app_path+'/'+app_name+'.js'
    c=app_path+'/'+app_name+'.css'
    n=app_path+'/'+'name.txt'
    makeDirs(app_path)
    createFiles(h,j,c)
    f=open(n,'w',encoding='utf-8')
    f.write(nick_name)
    f.close()
def createFiles(*path):
    for p in path:
        f=open(p,'a')
        f.close()
def makeDirs(*dirs):
    for d in dirs:
        if not os.path.exists(d):
            os.makedirs(d)


makeAppFiles('test','测试页面')
def log(*args, num=20, str='*'):
    print(str * num, end='')
    print(*args, end='')
    print(str * num)


def writeFile(fn, s, encoding='utf-8'):
    f = open(fn, 'wb')
    a = f.write(bytes(s, encoding=encoding))
    f.close()
    return a


def loadText(file):
    import chardet
    f = open(file, 'rb')
    text = f.read()
    f.close()
    encoding = chardet.detect(text)['encoding']
    if text:
        text = text.decode(encoding=encoding)
    else:
        text = ''
    return text


def formatTime( t):
    t = time.localtime(t)
    return time.strftime('%Y/%m/%d  %H:%M:%S', t)


class PathType:
    def __init__(self):
        self.F = 'FILE'
        self.D = 'DIR'
        self.L = 'LINK'
        self.M = 'MOUNT'


T = PathType()


class Path:
    def __init__(self, path,add_children=False):
        self.path = path
        self.epath = self.encodePath()
        self.name = os.path.basename(path)
        self.size = os.path.getsize(path)
        self.atime = formatTime(os.path.getatime(path))
        self.ctime = formatTime(os.path.getctime(path))
        self.mtime = formatTime(os.path.getmtime(path))
        self.type = self.getType()
        if add_children:
            self.addChildren()
    def getType(self):
        if os.path.isdir(self.path):
            return T.D
        if os.path.isfile(self.path):
            return T.F
        if os.path.islink(self.path):
            return T.L
        if os.path.ismount(self.path):
            return T.M

    def encodePath(self):
        return self.path.replace('/', '%2F')

    def getChildren(self):
        if self.type == T.D:
            list = self.listdir()
            return [Path(i) for i in list]

    def getContent(self):
        if self.type == T.F:
            return loadText(self.path)

    def listdir(self):
        if self.type == T.D:
            l = os.listdir(self.path)
            return [self.path + '/' + i for i in l]

    def getFileChildren(self):
        list = self.getChildren()
        return [i for i in list if i.type == T.F]

    def getDirChildren(self):
        list = self.getChildren()
        return [i for i in list if i.type == T.D]

    def getLinkChildren(self):
        list = self.getChildren()
        return [i for i in list if i.type == T.L]

    def getMountChildren(self):
        list = self.getChildren()
        return [i for i in list if i.type == T.M]
    def toJson(self):
        # log(self.__dict__)
        return self.__dict__
    def addContent(self):
        self.content=self.getContent()
    def addChildren(self):
        self.children=self.getChildren()
        self.fileChildren=self.getFileChildren()
        self.dirChildren=self.getDirChildren()
        self.linkChildren=self.getLinkChildren()
        self.mountChildren=self.getMountChildren()
        self.children=self.groupToJson(self.children)
        self.fileChildren=self.groupToJson(self.fileChildren)
        self.linkChildren=self.groupToJson(self.linkChildren)
        self.dirChildren=self.groupToJson(self.dirChildren)
        self.mountChildren=self.groupToJson(self.mountChildren)
    def groupToJson(self,list):
        return [i.toJson() for i in list]


# p=Path('e:/webapp/www/templates')
# print(p.__dict__)
