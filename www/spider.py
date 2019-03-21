import requests,json,bs4
from matplotlib import pyplot as plt
from bs4 import BeautifulSoup
def log(*text,str='*',length=20):
    print(str*length,end='')
    print(*text,end='')
    print(str*length)
def deepLog(obj):
    for i in dir(obj):
        print(i,':',getattr(obj,i))
def getWeather(city_code='101220101',i=0):
    url_list=[['http://www.weather.com.cn/data/cityinfo/','.html'],['http://www.weather.com.cn/data/sk/','.html']]
    r=requests.get(city_code.join(url_list[i]))
    log(dir(r))
    deepLog(r)
    log(json.loads(r.text))
def getDayWeather(li):
    day={}
    day['time']=getDayNum(getSpan(li,'time'))
    day['wea']=getSpan(li,'wea')
    day['tem']=getNum(getSpan(li,'tem'))
    day['wind']=getSpan(li,'wind')
    day['wind1']=getSpan(li,'wind1')
    return day
def getSpan(li,class_):
    return li.find('span',class_=class_).get_text()
def getNum(tem):
    list=tem.split('/')
    top=list[0].strip('℃')
    bot=list[1].strip('℃')
    return {'high':int(top),'low':int(bot)}
def getDayNum(day):
    return int(day.split('（')[1].strip('日）'))
def getDayAndTem(li):
    days=[]
    tem_highs=[]
    tem_lows=[]
    for i in li:
        # print(i)
        days.append(i['time'])
        tem_highs.append(i['tem']['high'])
        tem_lows.append(i['tem']['low'])
    return [days,tem_highs,tem_lows]
def test():
    url='http://www.weather.com.cn/weather15d/101220101.shtml#input'
    r=requests.get(url)
    log(r.apparent_encoding)
    r.encoding='utf-8'
    b=BeautifulSoup(r.text)
    d1=b.find(id='15d')
    ul=d1.find('ul',class_='t')
    lis=ul.findAll('li')
    days=[]
    for li in lis:
        day=getDayWeather(li)
        days.append(day)
    # log(ul)
    # log(days)
    [days,highs,lows]=getDayAndTem(days)
    log(days,highs)
    plt.plot(days,highs,'b--')
    plt.plot(days,lows,'r--')
    plt.show()
def test2():
    url='http://207.148.94.195'
    r=requests.get(url)
    print(r.text)
if __name__=='__main__':
    test()
