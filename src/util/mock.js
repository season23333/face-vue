import Mock from 'mockjs';

Mock.mock('/next', 'get', {
    data: '123'
})

Mock.mock('/list', 'get', {
    tableData: [{
        id: '100',
        time: '无',
        location: '1',
        size: '1',
        equipment: '1',
        // date:'',
        // startTime: '',
        // endTime:'',
        // time0000: 1,


        // time2330:1,

    }, {
        id: '101',
        time: '无',
        time0815: 1,

    }, {
        id: '102',
        time: '08:00-08:45',
        time0800: 1,
    }, {
        id: '103',
        time: '无'
    }, {
        id: '104',
        time: '无'
    }, {
        id: '105',
        time: '无'
    }, {
        id: '106',
        time: '无'
    }, {
        id: '107',
        time: '无'
    }]
})

