import Mock from 'mockjs';

Mock.mock('/next', 'get', {
    data: '123'
});

Mock.mock('/list', 'get', {
    tableData: [
        {
            id: '综合楼A412',
            location: '',
            size: '20~100人',
            equipment: '投影仪,白板',
            time0800: 1,
            time0830: 1,
            time1000: 1,
            time1030: 1,
        },
        {
            id: '综合楼A417',
            location: '',
            size: '20~100人',
            equipment: '投影仪,白板',
            time0900: 1,
            time0930: 1,
            time1000: 1,
            time1330: 1,
        },
        {
            id: '南教218',
            location: '',
            size: '20~100人',
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
            size: '20~100人',
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
});

Mock.mock('/list1', 'get', {
    tableData: [

        {
            id: '综合楼A417',
            location: '',
            size: '20~100人',
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
});

Mock.mock('/place', 'get', {
    options: [
        {
            value: '南教楼',
            label: '南教楼'
        },
        {
            value: '讲堂群',
            label: '讲堂群'
        },
        {
            value: '六层',
            label: '六层'
        }
    ]
});

Mock.mock('/details', 'get', {
    tableData: [{
        date: '2019-05-02',
        name: '项目构思',
        building: '综合楼A',
        room: '417',
        startTime: '2019-05-02 11:00',
        endTime: '2019-05-02 12:00',
        people: {
            pname:['小王','小白']
        },
        tag: 1,
        flag: 0,
    }, {
        date: '2019-03-04',
        name: '项目愿景',
        building: '综合楼A',
        room: '412',
        startTime: '2019-03-04 11:00',
        endTime: '2019-03-04 12:00',
        people: {
            pname:['小王','小白']
        },
        tag: 0
    }, {
        date: '2019-03-01',
        name: '质量属性',
        building: '南教',
        room: '218',
        startTime: '2019-03-01 11:00',
        endTime: '2019-03-01 12:00',
        people: {
            pname:['小王','小白']
        },
        tag: 1
    }, {
        date: '2019-03-03',
        name: '需求分析',
        building: '南堂',
        room: '412',
        startTime: '2019-03-03 11:00',
        endTime: '2019-03-03 12:00',
        people: {
            pname:['小王','小白']
        },
        tag: 1
    },
        {
        date: '2019-05-02',
        name: '项目构思',
        building: '综合楼A',
        room: '417',
        startTime: '2019-05-02 11:00',
        endTime: '2019-05-02 12:00',
        people: {
            pname:['小王','小白']
        },
        tag: 1,
        flag: 0,
    }, {
        date: '2019-03-04',
        name: '项目愿景',
        building: '综合楼A',
        room: '412',
        startTime: '2019-03-04 11:00',
        endTime: '2019-03-04 12:00',
        people: {
            pname:['小王','小白']
        },
        tag: 0
    }, {
        date: '2019-03-01',
        name: '质量属性',
        building: '南教',
        room: '218',
        startTime: '2019-03-01 11:00',
        endTime: '2019-03-01 12:00',
        people: {
            pname:['小王','小白']
        },
        tag: 1
    }, {
        date: '2019-03-03',
        name: '需求分析',
        building: '南堂',
        room: '412',
        startTime: '2019-03-03 11:00',
        endTime: '2019-03-03 12:00',
        people: {
            pname:['小王','小白']
        },
        tag: 1
    },
        {
        date: '2019-05-02',
        name: '项目构思',
        building: '综合楼A',
        room: '417',
        startTime: '2019-05-02 11:00',
        endTime: '2019-05-02 12:00',
        people: {
            pname:['小王','小白']
        },
        tag: 1,
        flag: 0,
    }, {
        date: '2019-03-04',
        name: '项目愿景',
        building: '综合楼A',
        room: '412',
        startTime: '2019-03-04 11:00',
        endTime: '2019-03-04 12:00',
        people: {
            pname:['小王','小白']
        },
        tag: 0
    },
    //     {
    //     date: '2019-03-01',
    //     name: '质量属性',
    //     building: '南教',
    //     room: '218',
    //     startTime: '2019-03-01 11:00',
    //     endTime: '2019-03-01 12:00',
    //     people: {
    //         pname:['小王','小白']
    //     },
    //     tag: 1
    // }, {
    //     date: '2019-03-03',
    //     name: '需求分析',
    //     building: '南堂',
    //     room: '412',
    //     startTime: '2019-03-03 11:00',
    //     endTime: '2019-03-03 12:00',
    //     people: {
    //         pname:['小王','小白']
    //     },
    //     tag: 1
    // },{
    //     date: '2019-05-02',
    //     name: '项目构思',
    //     building: '综合楼A',
    //     room: '417',
    //     startTime: '2019-05-02 11:00',
    //     endTime: '2019-05-02 12:00',
    //     people: {
    //         pname:['小王','小白']
    //     },
    //     tag: 1,
    //     flag: 0,
    // }, {
    //     date: '2019-03-04',
    //     name: '项目愿景',
    //     building: '综合楼A',
    //     room: '412',
    //     startTime: '2019-03-04 11:00',
    //     endTime: '2019-03-04 12:00',
    //     people: {
    //         pname:['小王','小白']
    //     },
    //     tag: 0
    // }, {
    //     date: '2019-03-01',
    //     name: '质量属性',
    //     building: '南教',
    //     room: '218',
    //     startTime: '2019-03-01 11:00',
    //     endTime: '2019-03-01 12:00',
    //     people: {
    //         pname:['小王','小白']
    //     },
    //     tag: 1
    // }, {
    //     date: '2019-03-03',
    //     name: '需求分析',
    //     building: '南堂',
    //     room: '412',
    //     startTime: '2019-03-03 11:00',
    //     endTime: '2019-03-03 12:00',
    //     people: {
    //         pname:['小王','小白']
    //     },
    //     tag: 1
    // }
    ],
});
