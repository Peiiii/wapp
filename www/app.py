import logging;logging.basicConfig(level=logging.INFO)
import asyncio, hashlib, os
from aiohttp import web
from framework import Application, templates_dir
from jinja2 import Template, Environment, PackageLoader
from tool import  initTools,log,Path,T,loadText
from models import CloudAppLoader
from  config import config


env = Environment(loader=PackageLoader('templates',''))
loop = asyncio.get_event_loop()
app = Application(loop=loop)
app_loader=CloudAppLoader('templates/app')
def getAppList():
    return app_loader.listApp()
@app.get2('/home/{link}')
async def do_home(link):
    return app.htmlResponse(__template__='home.html',apps=getAppList())

@app.get2('/test.html')
async def home():
   return  app.wrapAsResponse({
       '__template__':'test.html'
   })




###############################################################
############################File &  Dir###################################

@app.get2('/file/edit/{filename}')
async def do_file_edit(filename):
    log(filename)
    filename=decodePath(filename)
    content=loadText(filename)
    name=os.path.basename(filename)
    return  app.wrapAsResponse({
        '__template__':'file.html',
        'file':{
            'name':name,
            'content':content,
            'url':filename
        }
    })
@app.post4('/file/read/{filename}')
async def do_file_read(filename):
    #filename=json['filename']
    content=loadText(filename)
    return app.jsonResponse(data=content)
@app.post4('/file/write/{filename}',json=True)
async def do_file_write(filename,content):
    log('filename',filename)
    writeFile(filename,content)
    return app.jsonResponse(message='successfully write into file '+filename)
def writeFile(fn,content):
    import chardet
    f=open(fn,'wb')
    content1=bytes(content,encoding='utf-8')
    log(chardet.detect(content1))
    f.write(content1)
    f.close()
    return True

@app.get2('/path/{path}')
async def do_path_get(path):
    print('path'+path)
    #path=decodePath(path)
    ##print(path)
    p=Path(path)

    return app.wrapAsResponse({
        '__template__':"file.html",
        'path':p
    })
def fileAndDir(path,list):
    file_list,dir_list=[],[]
    for i in list:
        if os.path.isdir(path+r'/'+i):
            dir={
                'name':i,
                'url':encodePath(path+'/'+i)
            }
            dir_list.append(dir)
        else:
            file = {
                'name': i,
                'url': encodePath(path+'/'+i)
            }
            file_list.append(file)
    return {'name':os.path.basename(path),'files':file_list,'dirs':dir_list,'url':path}
def encodePath(path):
    return path.replace('/','%2F')
def decodePath(path):
    return path.replace('+','/')
#--------------API---------------#
@app.get2('/api/file/get/{filename}')
async def do_api_file_get(filename):
    log(filename)
    #filename=decodePath(filename)
    f=Path(filename)
    f.addContent()
    return app.jsonResponse(f.toJson())
@app.get2('/api/path/get/{path}')
async def do_api_path_get(path):
    p=Path(path,add_children=True)
    # log(p.children)
    return app.jsonResponse(p.toJson())

##############################################
#############################################
@app.get2('/cloud_app/get/{app_name}')  ## 已重建
async def do_cloud_app_get(app_name):
    capp=app_loader.getApp(app_name)
    capp.addHtml()
    return app.jsonResponse(data=capp.toJson())
@app.get2('/module/get/{module_name}')
async def do_mudule_get(module_name):
    module_dir='js'
    file_name=module_dir+'/'+module_name+'.js'
    js=getEasyTemplate(file_name)
    return app.jsonResponse(data=js)


































##############################################
#############################################
def getEasyTemplate(file_name):
    tem=env.get_template(file_name)
    return tem.render({})
def getTemplate(dic):
    found=dic.get('__template__')
    if found:
        file=dic.pop('__template__')
        tem=env.get_template(file)
        return tem.render(dic)
##############################################
#############################################


ip=config['ip']
port=config['port']
addr=config['addr']
async def init(loop):
    server = await loop.create_server(app.make_handler(), ip, port)
    logging.info('server started at http://%s:%s....'%(ip,port))
    return server

print('current dir:',os.getcwd())
app.router.add_static('/', 'static', show_index=True)
print('http://%s'%(addr))
loop.run_until_complete(init(loop))
import webbrowser
print('open in a minute:')
#webbrowser.open('http://127.0.0.1:80/test.html')
#webbrowser.open('http://127.0.0.1:80/home/top')
loop.run_forever()


