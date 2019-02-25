import uuid,os
from  jinja2 import  Template,Environment, PackageLoader
# env = Environment(loader=PackageLoader('templates',''))


def next_id():
    return uuid.uuid4().hex

class CloudAppDescriptor:
    def __init__(self,path):
        self.path=path
        self.name = os.path.basename(path)
        self.module_path='templates'
        self.hpath = self.path + '/' + self.name + '.html'
        self.id=next_id()
        self.nickName=self.getNickName()
    def getNickName(self):
        return self.loadText(self.path+'/'+'name.txt')
    def addHtml(self):
        self.html=self.getHtml()
    def getHtml(self):
        return self.getTemplate({'app':self})
    def toJson(self):
        json=self.__dict__
        json.pop('env')
        return json
    def loadText(self,file):
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

    def getTemplate(self,dic):
        self.env=Environment(loader=PackageLoader(self.module_path,'app'+'/'+self.name))
        tem = self.env.get_template(self.name+'.html')
        return tem.render(dic)
class CloudAppLoader:
    def __init__(self,path):
        self.path=path
    def join(self,fn):
        return self.path+'/'+fn
    def listApp(self):
        list=os.listdir(self.path)
        list=[self.join(i) for i in list if os.path.isdir(self.join(i))]
        return [CloudAppDescriptor(i) for i in list]
    def getApp(self,app_name):
        return CloudAppDescriptor(self.join(app_name))
