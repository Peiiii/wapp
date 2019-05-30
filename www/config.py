
class Config(dict):
    def __getattr__(self, item):
        try:
            r=self.__getitem__(item)
            return r
        except:
            raise AttributeError('No attribute %s'%item)
config=Config(
    ip='0.0.0.0',
    port=80,
    addr='localhost'
)
quik_links=[
    'http://127.0.0.1/home/top'
]
