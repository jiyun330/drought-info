class Model:

    def __init__(self, stnId, date):
        self.stnId = stnId
        self.date = date

    def select(self):
        import json
        import joblib
        import numpy as np
        import requests

        model = joblib.load(open('./model/model.pkl','rb'))

        url = "http://apis.data.go.kr/1360000/AsosDalyInfoService/getWthrDataList"
        serviceKey = "drigi%2Bft%2BkKmJ%2Bcg7Ooh79TfrsU3ivt0XnGid%2Bw%2FlGT30jh9RsRm%2Fn2PV9RY2gypYMKjCWxdU84oOh%2FPwffURg%3D%3D"
        dataType = "JSON"
        dataCd = "ASOS"
        dateCd = "DAY"
        startDt = self.date.replace('-', '')
        endDt = self.date.replace('-', '')
        stnIds = self.stnId

        f_url = url+"?ServiceKey="+serviceKey+"&dataType="+dataType+"&dataCd="+dataCd+"&dateCd="+dateCd+"&startDt="+startDt+"&endDt="+endDt+"&stnIds="+stnIds
        result = requests.get(f_url)
        js = json.loads(result.content)
        data = js['response']['body']['items']['item']

        stnId = data[0]['stnId']
        avgTa = data[0]['avgTa']
        minTa = data[0]['minTa']
        maxTa = data[0]['maxTa']
        sumRn = data[0]['sumRn']
        avgWs = data[0]['avgWs']
        avgTd = data[0]['avgTd']
        avgRhm = data[0]['avgRhm']
        avgPa = data[0]['avgPa']
        avgTs = data[0]['avgTs']

        if sumRn =='':
            sumRn = 0.0
        arr = np.array([[stnId, avgTa, minTa, maxTa, sumRn, avgWs, avgTd, avgRhm, avgPa, avgTs]])    

        y_pred = model.predict(arr)    
        return y_pred
                        