import Mock from 'mockjs';

Mock.mock('/next', 'get', {
    data: '123'
})

Mock.mock('/list', 'get', {
    tableData: [
        {
            id: '综合楼A412',
            location: '',
            size:'20~100人',
            equipment: '投影仪,白板',
            time0800: 1,
            time0830: 1,
            time1000: 1,
            time1030: 1,
        },
        {
            id: '综合楼A417',
            location: '',
            size:'20~100人',
            equipment: '投影仪,白板',
            time0900: 1,
            time0930: 1,
            time1000: 1,
            time1330: 1,
        },
        {
            id: '南教218',
            location: '',
            size:'20~100人',
            equipment: '投影仪,黑板',
            time0800: 1,
            time0830: 1,
            time0900: 1,
            time0930: 1,
            time1000: 1,
            time1030: 1,
            time1100: 1,
            time1130: 1,
        },
        {
            id: '南堂412',
            location: '',
            size:'20~100人',
            equipment: '投影仪,黑板',
            time0800: 1,
            time0830: 1,
            time1000: 1,
            time1030: 1,
        },
        {
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

Mock.mock('/list1', 'get', {
    tableData: [

        {
            id: '综合楼A417',
            location: '',
            size:'20~100人',
            equipment: '投影仪,白板',
            time0900: 1,
            time0930: 1,
            time1000: 1,
            time1330: 1,
        },

        {
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

